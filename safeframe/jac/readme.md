# Safeframe's SSO integration docs

Before start reading this integration doc, please make sure whether you are using the safeframe JAC's implementation.

FYI - When rendering OW products in a Safeframe most of the UX features should be integrate with the host.
This integration code is long and exhaustive due to limitations of the Safeframe.

## Prerequisites

- It is recommended to set the Safeframe as wide as possible and insert an inline style to Conversation's wrapper for setting it's desirable width.
  That way, the Modals as User Profile can take up the whole screen if needed.
- The publisher is using SSO login flow.

- Safeframe configurations:

  The host (aka the publisher) must define a set of configuration which allows OpenWeb products to resize the frame and have the ability to send messages between the frame and the host.

1. Position Configurations:

   The host must allow the support of **exp-ovr, resize-to**, **cmsg** for the specific frame and on the host config, to do so the host should set the posConfig as follows:

```javascript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);
const widgetWidth = isMobile ? document.documentElement.clientWidth - 20 : 750;
const widgetHeight = 750;
window.JAC_CONFIG = {
  client: {
    positions: {
      OpenWebWidget: {
        targetElement: "commentsWidget",
        features: {
          safeFrame: {
              enabled: true,
              features: {
                resize: {
                  enabled: true,
                },
                expandOver: {
                  enabled: true,
                },
              },
          },
        },
        content: {
          /**
          * - The value of the markup field should be the markup for the Spot.IM widget.
          * - Any references have to be remote, as the content will be loaded in a cross domain iframe.
          * - 'data-is-full-screen' set to "true" when in mobile, the conversation is loading inside a modal i.e. safeframe, takes the whole user's device screen.
          */
          markup:
            `<style>
              #fc_align {
                width: 100%;
              }
            </style>
            <script
              async
              data-spotim-module="spotim-launcher"
              src="https://launcher.spot.im/spot/SPOT_ID"
              data-post-id="POST_ID"
              data-safeframe-height=${widgetHeight}
              data-safeframe-width=${widgetWidth}
              data-post-url="<article-url>"
              data-is-full-screen="<boolean-as-string>"
            ></script>`
          size: {
            // Initial size of the widget, as defined by the publisher
            width: widgetWidth,
            height: widgetHeight,
          },
        },
        meta: {
          OpenWeb: {
            // A meta data with the host url should be sent to the frame.
            hostUrl: location.href,
            // The OW_STORAGE key, more details below
            localStorage: openWebLocalStorage,
          },
        },
      },
    },
    onReady: jacReadyHandler,
  },
};
```

- Since OpenWeb can't manipulate the publisher's DOM, the publisher should listen to the following query params and scroll to comments if one of the is visible:
  ```javascript
  const immediateKeys = [
    "spot_reset_password",
    "spot_ticket",
    "spot_im_verify",
    "spot_im_comment_id",
    "spot_im_reply_id",
    "spot_im_highlight_immediate",
    "spot_im_scroll_to_comments",
    "spot_im_expand_reply",
    "spot_im_load_app_immediately",
    "spot_im_open_profile_followers",
    "ow_immediate",
  ];
  ```
  The publisher can use this snippet for scrolling to the comments widget:

```javascript
function scrollToCommentsIfNeeded() {
  const immediateKeys = [
    "spot_reset_password",
    "spot_ticket",
    "spot_im_verify",
    "spot_im_comment_id",
    "spot_im_reply_id",
    "spot_im_highlight_immediate",
    "spot_im_scroll_to_comments",
    "spot_im_expand_reply",
    "spot_im_load_app_immediately",
    "spot_im_open_profile_followers",
    "ow_immediate",
  ];
  const urlParams = Array.from(
    new URLSearchParams(window.location.search).keys()
  );

  const isOpenWebParam = immediateKeys.some((key) => urlParams.includes(key));
  if (isOpenWebParam) {
    const commentsWidget = document.getElementById("commentsWidget");
    // smooth scroll to element and align it at the bottom
    commentsWidget.scrollIntoView({ behavior: "smooth" });
  }
}
```

---

## SSO Integration

Saframe’s SSO integration is the same as our [general SSO integration](https://github.com/SpotIM/spotim-integration-docs/tree/master/api/single-sign-on) with changes on the client side due to the message passing mechanism of the safeframe.

## Relevant Spotim Events:

```javascript
// Sign up to post button clicked
const SPOT_IM_LOGIN_START = "spot-im-login-start";
// Safeframe's SSO api is ready
const SSO_API_READY = "sso_api_ready";
// Safeframe resized
const SAFEFRAME_RESIZE = "safeframe-resize";
// General OpenWeb failure
const LAUNCHER_FAILED_EVENT = "spot-im-launcher-failed";
// Conversation failure
const CONVERSATION_FAILED = "spot-im-conversation-failed";
```

## Technical implementation

- Code samples and implementation proposals attached.

### **Set up the message handlers:**

- **Incoming messages (frame to host):**

  Create a messageHandler:

  ```javascript
  function incomingMessageHandler(msg, posId) {
    var parsedValue = JSON.parse(msg);
    var type = parsedValue.type;
    if (type && type === "spotim") {
      var messages = parsedValue.messages;
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          var action = msg.action;
          var args = msg.args;
          if (
            action &&
            window.SPOTIM.safeframe.messageHandlers[action] instanceof
              Function
          ) {
            window.SPOTIM.safeframe.messageHandlers[action](args, posId);
          }
        });
      }
    }
  }

  function subscribeToMessage(args) {
    var action = args.action;
    var callback = args.callback;

    window.SPOTIM.safeframe.messageHandlers[action] = callback;
  }

  if (!window.SPOTIM) {
    window.SPOTIM = {};
  }

  window.SPOTIM.safeframe = {
    messageHandlers: {},
    subscribeToMessage: subscribeToMessage,
    incomingMessageHandler incomingMessageHandler,
  };
  ```

  Now we need to set the JAC position to listen for incoming message:

  ```javascript
  JAC.on("AD_MESSAGE", function ({ meta }) {
    const { positionName, message } = meta;
    window.SPOTIM &&
      window.SPOTIM.safeframe &&
      window.SPOTIM.safeframe.incomingMessageHandler(message, positionName);
  });
  ```

- **Outgoing message (host to frame):**
  Each message should have it's own unique id, feel free to use any unique id generator.

  ```javascript
  function uuid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  function sendMessageToFrame(msg) {
    JAC.updateMeta(
      ["OpenWebWidget"],
      "openWeb",
      JSON.stringify(Object.assign({ type: "SPOTIM", id: uuid() }, msg))
    );
  }

  window.SPOTIM.safeframe = {
    messageHandlers: {},
    subscribeToMessage: subscribeToMessage,
    incomingMessageHandler: incomingMessageHandler,
    sendMessageToFrame: sendMessageToFrame,
  };
  ```

- **Scroll Lock integration:**
  When modal dialogs are opened a scroll lock should occur for a better UX, one should integrate a scroll locking mechanism for it:

  ```javascript
  function subscribeToScrollLock() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "scroll-lock",
      callback: function callback(args) {
        // lock body scroll.
      },
    });
  }

  function subscribeToScrollRelease() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "scroll-release",
      callback: function callback(args) {
        // release body scroll.
      },
    });
  }
  ```

- **Navigate to url (frame to host):**

  ```javascript
  function subscribeToNavigate() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "navigate",
      callback: function callback(args) {
        window.location.href = args.url;
      },
    });
  }
  ```

### **SSO login flow:**

---

_SSO integration’s flow scheme as seen at the git integration docs:_

![SSO Flow](https://github.com/SpotIM/spotim-integration-docs/raw/master/api/single-sign-on/flow.webp)

1. [Spot.IM](http://Spot.IM) lets the Partner know that it has been loaded and is now ready

2. The partner asks [Spot.IM](http://Spot.IM) to start an SSO session

3. [Spot.IM](http://Spot.IM) gives the SSO session a unique identifier called codeA

4. Partner passes the codeA to his backend

5. The partner passes the codeA to [Spot.IM](http://Spot.IM) backend, alongside the user details

6. [Spot.IM](http://Spot.IM) logs the user in (registers it too if needed)

7. [Spot.IM](http://Spot.IM) acknowledges the success by providing the success codeB

8. Partner passes the success codeB to his Front End

9. The partner passes the success codeB to [Spot.IM](http://Spot.IM) FED

10. [Spot.IM](http://Spot.IM) FED logs in the user and displays his avatar as logged in

---

Actual implementation:

1. Listen to the API ready event, start the SSO flow only after this event is fired.

   ```javascript
   function subscribeToApiReady() {
     window.SPOTIM.safeframe.subscribeToMessage({
       action: "sso_api_ready",
       callback: function () {
         // maybe change some state that indicates spotim-api is ready
         console.log("spot_im_api_ready");
       },
     });
   }
   ```

2. On user login, start SSO login flow:
   <br>Note: in some integrations the publisher has to pass a user id to the login method. `args: { userId }` is <b>optional</b>.

   ```javascript
   function onLogin(userId) {
     window.SPOTIM.safeframe.sendMessageToFrame({
       action: "startSafeframeSso",
       args: { userId },
     });
   }
   ```

3. (Stages 3 - 9 client-side) Subscribe to codeA, and pass codeB from the publisher's BED to Spot.IM:

   ```javascript
   function subscribeToCodeA() {
     window.SPOTIM.safeframe.subscribeToMessage({
       action: "sso_code_a",
       callback: function callback(args) {
         var code_a = args.code_a;
         fetch("/api/spotim-sso", {
           method: "POST",
           mode: "cors",
           headers: {
             "Content-Type": "application/json",
             Origin: "https://safeframe-server-shaybs.spotim1.now.sh",
             Accept: "application/json",
           },
           body: JSON.stringify({
             code_a: code_a,
             username: "test",
           }),
         })
           .then(function (res) {
             return res.text();
           })
           .then(function (codeB) {
             if (codeB) {
               window.SPOTIM.safeframe.sendMessageToFrame({
                 action: "completeSSOCallback",
                 args: codeB,
               });
             }
           });
       },
     });
   }
   ```

4. Subscribe to ‘Login Success/Error’ events:

   ```javascript
   function onLoginSuccess() {
     window.SPOTIM.safeframe.subscribeToMessage({
       action: "sso_login_success",
       callback: function callback(args) {
         console.log("sso_login_success", "userData: ", args);
       },
     });
   }

   function onLoginError() {
     window.SPOTIM.safeframe.subscribeToMessage({
       action: "sso_login_error",
       callback: function callback(args) {
         console.log("sso_login_error", args);
       },
     });
   }
   ```

### BED Integration:

Please see the [integration docs](https://github.com/SpotIM/spotim-integration-docs/tree/master/api/single-sign-on#backend-sso-handshake-integration).

### Logout:

To logout, send a logout message to frame:

```javascript
function spotimLogout() {
  window.SPOTIM.safeframe.sendMessageToFrame({
    action: "logout",
  });
}
```

---

## Integration for "Require Login" moderation policy:

Spot IM events are bubbled up as a message to host under the action: `spotim_event`.

That is, the publisher can listen for the `spotim_event` from type: `'spot-im-login-start'` to invoke the sign up/login process.

For more information [Click Here](https://github.com/SpotIM/spotim-integration-docs/tree/master/api/single-sign-on#integration-for-require-login-moderation-policy).

---

## Listen to errors

Spot IM errors are bubbled up as a message to host under the action: `spotim_error`.

```javascript
// Creating the event listener:

function subscribeToSpotimErrors() {
  window.SPOTIM.safeframe.subscribeToMessage({
    action: "spotim_error",
    callback: function callback(args, posId) {
      console.log(
        "ERROR IN:",
        "posId:",
        posId,
        "event-type:",
        args.type,
        "error:",
        args.error
      );
    },
  });
}
```

---

## Local Storage Integration

Since Safeframe used to serve ads, it's served within a different domain from the publisher one.
This causes a loss of `localStorage` data between sessions; Therefore, we need to store frame's storage as 1'st party data.

1. Store the `localStorage` image on `storage_update` event.

```javascript
// Creating the event listener:

function subscribeToStorageUpdates() {
  window.SPOTIM.safeframe.subscribeToMessage({
    action: "storage_update",
    callback: function callback(args, posId) {
      try {
        localStorage.setItem("OW_STORAGE", JSON.stringify(args.storage));
      } catch (err) {
        console.log("storage_update - fail:", err);
      }
    },
  });
}
```

2. On position creation the publisher must pass the storage image to the frame.

```javascript
let openWebLocalStorage = undefined;

try {
  // Safeframe cannot parse a config with a value of 'null'
  openWebLocalStorage = localStorage.getItem("OW_STORAGE") || undefined;
} catch (err) {
  console.error("openWebLocalStorage", err);
}
...

window.JAC_CONFIG = {
...
    meta: {
      OpenWeb: {
        hostUrl: location.href,
        localStorage: openWebLocalStorage,
      },
    },
...
}
```

---

## Messages Count Implementation

1. Subscribe to `messages-count`, the result will be an integer stored in `args`.

```javascript
function subscribeToMessagesCount() {
  window.SPOTIM.safeframe.subscribeToMessage({
    action: "messages-count",
    callback: function callback(args) {
      console.log('Messages count is:', args);
    },
  });
}
```

2. Invoke `getMessagesCount` function. Pass an object that includes the publisher's Spot ID and the post ID of the Conversation.

```javascript
function getMessagesCount({ spotId, postId }) {
  window.SPOTIM.safeframe.sendMessageToFrame({
    action: "getMessagesCount",
    args: { 
      spotId, 
      postId,
    },
  });
}
```
---

## Preselect comment label API

1. Subscribe to `comment-labels` action
```javascript
function subscribeToCommentLabels() {
  window.SPOTIM.safeframe.subscribeToMessage({
    action: "comment-labels",
    callback: function callback(args) {
      console.log('Labels', args);
    },
  });
}
```
The result in `args` will be an array with configured labels if any of type
```typescript
{
    id: string;
    text: string;
}
```
Where `id` is an expected value to be used for `setSelectedCommentLabels` action and `text` is a 
a descriptive name of the label.

2. Invoke `getCommentLabels` action.

```javascript
function getCommentLabels() {
  window.SPOTIM.safeframe.sendMessageToFrame({
    action: "getCommentLabels",
  });
}
```

3. Invoke `setSelectedCommentLabels` action, with an array of preselected label ids.
```javascript
function setSelectedCommentLabels(arrayOfIds) {
  window.SPOTIM.safeframe.sendMessageToFrame({
    action: "setSelectedCommentLabels",
    args: arrayOfIds,
  });
}
```
---

## Implementation proposal

```javascript
function uuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function onLogin(userId) {
  if (window.SPOTIM.safeframe.isApiReady) {
    window.SPOTIM.safeframe.sendMessageToFrame({
      action: "startSafeframeSso",
      args: { userId },
    });
  } else {
    window.SPOTIM.safeframe.loginCalled = true;
  }
}

function initSpotimMessageHandlers() {
  if (!window.SPOTIM) {
    window.SPOTIM = {};
  }

  function incomingMessageHandler(msg, posId, value) {
    if (msg !== "cmsg") {
      return;
    }

    var parsedValue = JSON.parse(value);
    var type = parsedValue.type;
    var action = parsedValue.action;
    var args = parsedValue.args;

    if (type && type === "spotim") {
      if (
        action &&
        window.SPOTIM.safeframe.messageHandlers[action] instanceof Function
      ) {
        window.SPOTIM.safeframe.messageHandlers[action](args, posId);
      }
    }
  }

  function subscribeToMessage(args) {
    var action = args.action;
    var callback = args.callback;

    window.SPOTIM.safeframe.messageHandlers[action] = callback;
  }

  function sendMessageToFrame(msg) {
    // For multiple instances of OpenWebWidgets update meta to all widgets
    function sendMessageToFrame(msg) {
      const positions = JAC.getConfig().client.positions;
      const owPositionNames = Object.keys(positions).filter((key) =>
        key.startsWith("ow-")
      );

      JAC.updateMeta(
        owPositionNames,
        "openWeb",
        JSON.stringify(Object.assign({ type: "SPOTIM", id: uuid() }, msg))
      );
    }
  }

  function onLoginError() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso_login_error",
      callback: function callback(args) {
        console.log("sso_login_error", args);
      },
    });
  }

  function onLoginSuccess() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso_login_success",
      callback: function callback(args) {
        console.log("sso_login_success", "userData: ", args);
      },
    });
  }

  function subscribeToCodeA() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso_code_a",
      callback: function callback(args) {
        var code_a = args.code_a;
        fetch(
          \`https://safeframe-server-shaybs.spotim1.now.sh/api/spotim-sso`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://safeframe-server-shaybs.spotim1.now.sh",
              Accept: "application/json",
            },
            body: JSON.stringify({
              code_a: code_a,
              username: "test",
            }),
          }
        )
          .then(function (res) {
            return res.json();
          })
          .then(function (res) {
            var codeB = res && res.code_b;
            if (codeB) {
              window.SPOTIM.safeframe.sendMessageToFrame({
                action: "completeSSOCallback",
                args: codeB,
              });
            }
          });
      },
    });
  }

  function subscribeToApiReady() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso_api_ready",
      callback: function callback() {
        window.SPOTIM.safeframe.isApiReady = true;
        if (window.SPOTIM.safeframe.loginCalled) {
          onLogin();
        }
      },
    });
  }

  function subscribeToSpotimEvents() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "spotim_event",
      callback: function callback(args, posId) {
        // handle Events: {type: 'event-type', params: {attached params}}
        console.log(
          "posId:",
          posId,
          "event-type:",
          args.type,
          "params:",
          args.params
        );
      },
    });
  }

  function spotimLogout() {
    window.SPOTIM.safeframe.sendMessageToFrame({
      action: "logout",
    });
  }

  function subscribeToClipboardWrite() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "clipboard_write",
      callback: function callback(args) {
        clipboardCopy(args.text);
      },
    });
  }

  function clipboardCopy(text) {
    var span = document.createElement("span");
    span.textContent = text;
    document.body.appendChild(span);

    var selection = window.getSelection();
    var range = window.document.createRange();
    selection?.removeAllRanges();
    range.selectNode(span);
    selection?.addRange(range);

    try {
      window.document.execCommand("copy");
    } catch (err) {}

    selection?.removeAllRanges();
    window.document.body.removeChild(span);
  }

  function subscribeToNavigate() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "navigate",
      callback: function callback(args) {
        window.location.href = args.url;
      },
    });
  }

  function subscribeToScrollLock() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "scroll-lock",
      callback: function callback(args) {
        const commentsWidget = document.getElementById("commentsWidget");
        bodyScrollLock.disableBodyScroll(commentsWidget);
      },
    });
  }

  function subscribeToScrollRelease() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "scroll-release",
      callback: function callback(args) {
        const commentsWidget = document.getElementById("commentsWidget");
        bodyScrollLock.enableBodyScroll(commentsWidget);
      },
    });
  }

  window.SPOTIM.safeframe = {
    subscribeToMessage: subscribeToMessage,
    sendMessageToFrame: sendMessageToFrame,
    messageHandlers: {},
    incomingMessageHandler: incomingMessageHandler,
    logout: spotimLogout,
    isApiReady: false,
    loginCalled: false,
  };
  subscribeToApiReady();
  subscribeToCodeA();
  onLoginSuccess();
  onLoginError();
  subscribeToSpotimEvents();
  subscribeToNavigate();
  subscribeToScrollLock();
  subscribeToScrollRelease();
}

initSpotimMessageHandlers();
```
