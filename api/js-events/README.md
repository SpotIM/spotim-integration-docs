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

##### `spot-im-profile-drop-down`
The user has clicked on the profile dropDown menu. Event details include the details of the user.

##### `spot-im-clicked-settings`
The user has clicked on the "Settings" button in the profile context menu. Event details include the details of the user.

##### `spot-im-clicked-privacy`
The user has clicked on the "Privacy" button. in the profile context menu.

##### `spot-im-clicked-article-link-profile`
The user has clicked on an article from a user's history view. Event details include the article's URL.

##### `spot-im-sort-by-drop-down`
The user has clicked on the sort dropdown.

##### `spot-im-sort-by-select`
The user has changed the sorting of the conversation.

##### `spot-im-notification-drop-down-link`
The user has opened the notification inbox.

##### `spot-im-user-clicked-reply`
The user has started to reply a comment on the conversation.

##### `spot-im-clicked-like-thumbs-up`
The user has clicked the "Like" button.

##### `spot-im-clicked-like-thumbs-down`
The user has clicked the "Disike" button.

##### `spot-im-clicked-like-details`
The user has opened the list of likers. Event details include the comment's ID.

##### `spot-im-share-drop-down`
The user has clicked on the "Share" button

##### `spot-im-share-type`
The user has chosen to share the comment on a specific option. Event details include which share option was chosen.

##### `spot-im-clicked-flag`
The user has clicked on the "Report" option.

##### `spot-im-show-more-comments-clicked`
The user has clicked on the "Show More Comments" button.

##### `spot-im-show-more-replies-clicked`
The user has clicked on the "Show More Replies" button. Event details include the parent ID of the replies.

##### `spot-im-open-user-profile`
The user has clicked on the "View Profile" button of a specific user. Event details include the User ID.

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
