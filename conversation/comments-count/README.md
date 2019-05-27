# Displaying the Number of Messages in a Conversation

You can display the number of messages in a Conversation anywhere on your site.

Place the following script on your page, replacing `SPOT_ID` with your Spot ID:

```html
<script async
    src="https://launcher.spot.im/spot/SPOT_ID"
    data-spot-id="SPOT_ID"
    data-spotim-module="spotim-launcher"></script>
```

Then, place a `<div>` element where you want the count to appear and replace `POST_ID` with the Post ID of the page you wish to display the count for. This should match the Post ID used in the page's Conversation:

```html
<div data-spotim-module="messages-count" data-post-id="POST_ID"></div>
```
Pay attention that the script element should appear only once on the page, and the div element should be duplicated per every count you want to present on your page.

## Number of Messages on the Article's page
If you wish to display the number of messages in a conversation on the same page as the conversation, the counter can get updated real time, by adding the attribute real-time="true".

```html
<div class="spot-im-replies-count" data-post-id="POST_ID" real-time="true"></div>
```
