# Client-Side events

For different events occurring in our products we allow the publishers to add event listeners on client side.

### Event Listener Registration
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


### Events Reference
| Event Name 	| `event.detail` 	| Description 	|
|----------------------------------	|--------------	|-----------------------------------------------------------------	|
| `spot-im-user-up-vote-click` 	| - 	| The user has clicked to up vote a comment. 	|
| `spot-im-user-down-vote-click` 	| - 	| The user has clicked to down vote a comment. 	|
| `spot-im-user-notifications-click` 	| - 	| The user has clicked on the notifications icon (the bell icon). 	|
|  `spot-im-current-user-typing-start`	| - 	|  The user has started typing a comment.
	|
| `spot-im-current-user-typing-end`	| - 	| The user has finished typing a comment.
 	|
| spot-im-current-user-sent-message 	| - 	| The user has clicked on the "Post" button.
 	|
| spot-im-post-login 	|  ```{ currentUser: { email, socialNetworks: [], username }}```	| The user has logged in to the system.
 	|
| spot-im-login-start 	| - 	| The user initialized a log in process.
 	|
| spot-im-frame-entity-load 	| - 	| The user has clicked on a Twitter or Instagram "Show" button in a comment (this occurs on mobile layout).
 	|
| spot-im-frame-resize 	| `{ height, iframe, type, width }` 	| The iframe, which holds Spot.IM Conversation, was resized, 	|
| `spot-im-modals-height` 	| { height } 	| A user had triggered a modal opening. This event includes the height of the modal. 	|
| `spot-im-user-click` 	| `{ elementTop, spotImClass }` 	| The user has clicked on any object on the page with the a "spot-im-class" attribute. 	|
| spot-im-api-ready 	| - 	| Notifies that the public API, such as SSO, is ready. 	|
| spot-im-open-user-profile 	| `{ userId }` 	| The user opened the user profile screen. 	|
| `spot-im-conversation-loaded` 	| - 	| The Conversation is loaded on the page. |


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
