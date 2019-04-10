# Go Back To Comments

We define going-back-to-comments as the flow that occurs once a User navigates to an article's page with the intention of seeing the comments (i.e by clicking on a Notification/Shared Link...).

In those cases, once the page gets loaded and the conversation adheres, the page will scroll automatically to the conversation section and the shared comment will be highlighted.

This won't work when the the conversation is hidden "behind" a button.

## Conversation behind a button

In some cases, partners implement Spot.IM's Conversation behind a button. In these cases, this flow will not work since the Conversation is hidden when the page loads.

To overcome this, Partners can do one of the following:

### Method 1 - Add a function to the Conversation window (recommended)

In this method, the Publisher should add a function named `showSpotimConversation` to the conversation's window, that method should load the conversation (pretty much do whatever the button is doing).

### Method 2 - Set Button ID to `spotimCommentsButton`

In this method, the Publisher should set the ID of the button used to open the conversation to `spotimCommentsButton`. For example:

```
<button id="spotimCommentsButton" onclick="openSpotIM()">
```

When a user goes back to the comments section, the conversation will look for that button and initiate its `click` event.
