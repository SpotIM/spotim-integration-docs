# Client-Side events
Publishers can add event listeners (on client side) to aid in tracking engagement or for other functionality. Spot.IM has event listeners for multiple widgets. 

## Event Listener Registration
Example: `spot-im-current-user-sent-message` can be added to a script tag to trigger an event when a user sends a comment they have written. In this example below, event.detail will be logged to the console after the event is fired. 

```javascript
document.addEventListener('spot-im-current-user-sent-message', function(event) {
    // event.detail includes information relevant to this event
    console.log(event.detail);
});
```

**Please note:** It is advised that the <script> element is kept within the header. Any events that occurr before the listener registration will be lost. Make sure events are registered as early as possible, and before Spot.IM loads. 
    Multiple events can be used within a single script tag. 


## Conversation Events References
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
}
```

##### `spot-im-user-logout`
The user initialized a log out process.

##### `spot-im-user-up-vote-click`
The user has clicked to up vote a comment.

##### `spot-im-user-down-vote-click`
The user has clicked to down vote a comment.

##### `spot-im-user-notifications-click`
The user has clicked on the notifications icon (the bell icon).

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

## Conversation and Live Blog Events References
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

##### `spot-im-user-click`
The user has clicked on any object on the page with the a "spot-im-class" attribute.
`event.detail`:
```javascript
{
  elementTop,
  spotImClass
}
```


## Popular-in-the-Community
Spot.IM has added Javascript listeners to the Popular-in-the-Community Widget.

##### `spot-im-recirculation-item-clicked`
Recirculation item click

##### `spot-im-recirculation-left-clicked`
Left navigation arrow click

##### `spot-im-recirculation-right-clicked`
Right navigation arrow click

##### `spot-im-recirculation-loaded`
Recirculation loaded

##### `spot-im-recirculation-viewed`
Recirculation viewed 


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
