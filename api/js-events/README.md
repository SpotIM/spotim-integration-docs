# Client-Side events

For different events occurring in our products we allow the publishers to add event listeners on client side.

## Event Listener Registration
For example, `spot-im-current-user-sent-message` event will trigger when a user sends a comment we has written.

Registration is done the following way:

```javascript
document.addEventListener('spot-im-current-user-sent-message', function(event) {
    // event.detail includes information relevant to this event
    console.log(event.detail);
});
```

**Please note:** any events occurred before the listener registration will be lost.
Make sure you register for the events as early as possible, before Spot.IM loads on your page.


## Events Reference

##### `spot-im-api-ready`
Notifies that the public API, such as SSO, is ready.

##### `spot-im-conversation-loaded`
The Conversation is loaded on the page.

##### `spot-im-current-user-typing-start`
The user has started typing a comment.

##### `spot-im-current-user-typing-end`
The user has finished typing a comment.

##### `spot-im-current-user-sent-message`
The user has clicked on the "Post" button.


##### `spot-im-realtime-new-message`
A new message appeared in the Conversation or the Live Blog in real-time.
`event.detail`:
```javascript
{
  source: 'live-blog' [or:] 'conversation',

  // eventCode and postId are mutually exclusive  
  // if source="live-blog":
  eventCode: '...live blog eventCode...',
  // if source="conversation":
  postId: '...conversation postId...',

  fromUser: {
    // common to live-blog and conversation
    id: '...Spot.IM user ID',
    username: '...username...',
    displayName: '...display name (can be null)...',

    // only for source="live-blog":
   isReporter: true [or:] false
  },
  message: {
    type: 'comment' [or] 'reply',
    time: 'JS timestamp...'
  }
}
```


##### `spot-im-login-start`
The user initialized a log in process.

##### `spot-im-post-login`
The user has logged in to the system.
`event.detail`:
```javascript
{
  currentUser: {
    email,
    socialNetworks: [],
    username
  }
}```

##### `spot-im-user-up-vote-click`
The user has clicked to up vote a comment.

##### `spot-im-user-down-vote-click`
The user has clicked to down vote a comment.

##### `spot-im-user-notifications-click`
The user has clicked on the notifications icon (the bell icon).

##### `spot-im-user-click`
The user has clicked on any object on the page with the a "spot-im-class" attribute.
`event.detail`:
```javascript
{
  elementTop,
  spotImClass
}
```

##### `spot-im-frame-entity-load`
The user has clicked on a Twitter or Instagram "Show" button in a comment (this occurs on mobile layout).

##### `spot-im-frame-resize`
The iframe, which holds Spot.IM Conversation, was resized.
`event.detail`:
```javascript
{
  height,
  iframe,
  type,
  width
}
```

##### `spot-im-modals-height`
A user had triggered a modal opening. This event includes the height of the modal.
`event.detail`:
```javascript
{
  height
}
```
##### `spot-im-open-user-profile`
The user opened the user profile screen.
`event.detail`:
```javascript
{
  userId
}
```

## Recipes

### Get user emails upon login

```javascript
<script>
document.addEventListener('spot-im-post-login', function(event) {
    var currentUser = event.detail.currentUser; // currentUser contains details about logged in user
    console.log(currentUser.username + ', ' + currentUser.email + ', ' + currentUser.socialNetworks.join(' | '));
});
</script>
```
