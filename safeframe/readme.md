
Safeframe's SSO integration docs
==============================================

Prerequisites
--------------

* The publisher is using SSO login flow.

* Safeframe configurations:

    The host (aka the publisher) must define a set of configuration which allows OpenWeb products to resize the frame and have the ability to send messages between the frame and the host.

1. Position Configurations:

    The host must allow the support of **exp-ovr, resize-to**, **cmsg** for the specific frame and on the host config, to do so the host should set the posConfig as follows:

    ```javascript
    // Giving permissions to the position (the frame)
    $sf.host.PosConfig({
        id: posID,
        ...
        supports: {
          "exp-ovr": 1,
          "resize-to": 1,
          "cmsg": 1,
          ...
        },
    });
    ```

    In addition, the publisher must allow these functionalities on the host side:

    ```javascript
    // Host configuration:
    $sf.host.Config({
      ...
       positions: {
                DEFAULT: {
                  supports: {
                    "exp-push": 1,
                    "resize-to": 1,
                    "cmsg": 1,
                    ...
                  },
                },
              },
      ...
    })
    ```

    2\. The host must store the ‘posId’ of the frame:

    ```javascript
    // posID which passed to $sf.host.posConfig under the id property     (implemntation proposal)
    window.SPOTIM = window.SPOTIM || {};
    window.SPOTIM.spotimPosId = posID;
    ```

    3\. Render the frame with width set as you wish on desktop / wide screens and with full-screen width on mobile (implementation proposal):

    ```javascript
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile| Opera Mini/i.test(
        navigator.userAgent
      );

      startRender(
        markup,
        isMobile ? document.documentElement.clientWidth - 20 : 700,
        1000
      );
    ```

* * *

Markup
------

The markup for the safeframe is the same as your regular implementation with additional style tag that ensures the conversation will take safeframe’s full width:

```html
<style>#fc_align { width: 100%; }</style>
<script
  async
  data-spotim-module="spotim-launcher"
  src="https://launcher.spot.im/spot/SPOT\_ID"
  data-post-id="POST\_ID"
></script>
```

* * *

SSO Integration
---------------

Saframe’s SSO integration is the same as our [general SSO integration](https://github.com/SpotIM/spotim-integration-docs/tree/master/api/single-sign-on) with changes on the client side due to the message passing mechanism of the safeframe.

Technical implementation
-------------------------

* Code samples and implementation proposals attached.

### **Set up the message handlers:**

* **Incoming messages (frame to host):**

    Create a messageHandler:

    ```javascript
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
          window.SPOTIM.safeframe.messageHandlers\[action\] instanceof Function
        ) {
          window.SPOTIM.safeframe.messageHandlers\[action\](args);
        }
      }
    }

    function subscribeToMessage(args) {
      var action = args.action;
      var callback = args.callback;

      window.SPOTIM.safeframe.messageHandlers\[action\] = callback;
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

    On the `config` object passed to `$sf.host.Config(config)`add the property `onPosMsg` with the incoming messages handler:

    ```javascript
    config = {
          ...
            onPosMsg: function onPosMsg(msg, posId, value) {
                if (msg === "cmsg") {
                  window.SPOTIM &&
                    window.SPOTIM.safeframe &&
                    window.SPOTIM.safeframe.incomingMessageHandler(
                      msg,
                      posId,
                      value
                    );
                }
              },
          ...
    }
    ```

* **Outgoing message (host to frame):**

    ```javascript
    function sendMessageToFrame(msg) {
      $sf.host.msg(
        window.SPOTIM.spotimPosId,
        JSON.stringify(Object.assign({ type: "SPOTIM" }, msg))
      );
    }

    window.SPOTIM.safeframe = {
      messageHandlers: {},
      subscribeToMessage: subscribeToMessage,
      incomingMessageHandler: incomingMessageHandler,
      sendMessageToFrame: sendMessageToFrame
    };
    ```

### **SSO login flow:**

* * *

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

* * *
Actual implementation:
  
1. Listen to the API ready event, start the SSO flow only after this event is fired.

    ```javascript
      function subscribeToApiReady() {
        window.SPOTIM.safeframe.subscribeToMessage({
          action: "sso\_api\_ready",
          callback: function () {
            // maybe change some state that indicates spotim-api is ready
            console.log("spot\_im\_api\_ready");
          },
        });
      }
    ```

2. On user login, start SSO login flow:

    ```javascript
    function onLogin() {
      window.SPOTIM.safeframe.sendMessageToFrame({
        action: "startSafeframeSso",
      });
    }
    ```

3. (Stages 3 - 9 client-side) Subscribe to codeA, and pass codeB from the publisher's BED to Spot.IM:

    ```javascript
    function subscribeToCodeA() {
      window.SPOTIM.safeframe.subscribeToMessage({
        action: "sso\_code\_a",
        callback: function callback(args) {
          var code\_a = args.code\_a;
          fetch(\`/api/spotim-sso`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://safeframe-server-shaybs.spotim1.now.sh",
              Accept: "application/json",
            },
            body: JSON.stringify({
              code\_a: code\_a,
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
        action: "sso\_login\_success",
        callback: function callback(args) {
          console.log("sso\_login\_success", "userData: ", args);
        },
      });
    }

    function onLoginError() {
      window.SPOTIM.safeframe.subscribeToMessage({
        action: "sso\_login\_error",
        callback: function callback(args) {
          console.log("sso\_login\_error", args);
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

* * *

Integration for "Require Login" moderation policy:  
-----------------------------------------------------

Spot IM events are bubbled up as a message to host under the action: ‘spotim\_event’.  
  
That is, the publisher can listen for the ‘spotim\_event’ from type: `'spot-im-login-start'` to invoke the sign up/login process.

For more information [Click Here](https://github.com/SpotIM/spotim-integration-docs/tree/master/api/single-sign-on#integration-for-require-login-moderation-policy).

```javascript
// Creating the event listener:

  function subscribeToSpotimEvents() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "spotim\_event",
      callback: function callback(args) {
        // handle Events: {type: 'event-type', params: {attached params}}
        console.log("event-type:", args.type, "params:", args.params);
      },
    });
  }
```

* * *

Implementation proposal
------------------------

```javascript
function onLogin() {
  if (window.SPOTIM.safeframe.isApiReady) {
    window.SPOTIM.safeframe.sendMessageToFrame({
      action: "startSafeframeSso",
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
        window.SPOTIM.safeframe.messageHandlers\[action\] instanceof Function
      ) {
        window.SPOTIM.safeframe.messageHandlers\[action\](args);
      }
    }
  }

  function subscribeToMessage(args) {
    var action = args.action;
    var callback = args.callback;

    window.SPOTIM.safeframe.messageHandlers\[action\] = callback;
  }

  function sendMessageToFrame(msg) {
    $sf.host.msg(
      window.SPOTIM.spotimPosId,
      JSON.stringify(Object.assign({ type: "SPOTIM" }, msg))
    );
  }

  function onLoginError() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso\_login\_error",
      callback: function callback(args) {
        console.log("sso\_login\_error", args);
      },
    });
  }

  function onLoginSuccess() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso\_login\_success",
      callback: function callback(args) {
        console.log("sso\_login\_success", "userData: ", args);
      },
    });
  }

  function subscribeToCodeA() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso\_code\_a",
      callback: function callback(args) {
        var code\_a = args.code\_a;
        fetch(\`https://safeframe-server-shaybs.spotim1.now.sh/api/spotim-sso`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://safeframe-server-shaybs.spotim1.now.sh",
            Accept: "application/json",
          },
          body: JSON.stringify({
            code\_a: code\_a,
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

  function subscribeToApiReady() {
    window.SPOTIM.safeframe.subscribeToMessage({
      action: "sso\_api\_ready",
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
      action: "spotim\_event",
      callback: function callback(args) {
        // handle Events: {type: 'event-type', params: {attached params}}
        console.log("event-type:", args.type, "params:", args.params);
      },
    });
  }

  function spotimLogout() {
    window.SPOTIM.safeframe.sendMessageToFrame({
      action: "logout",
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
}

initSpotimMessageHandlers();
```
