# Displaying Number of Posts in a Conversation

You can display the number of posts in a Conversation anywhere on your site.

Place the following script on your page, replacing `SPOT_ID` with your Spot ID:

```html
<script async
    src="https://launcher.spot.im/spot/SPOT_ID"
    data-spot-id="SPOT_ID"
    data-spotim-module="spotim-launcher"></script>
```

The above script is necessary for presenting the comment count. It must be included with either variation of <div> elements below.

Then, place a `<div>` element where you want the count to appear and replace `POST_ID` with the Post ID of the page you wish to display the count for. This should match the Post ID used in the page's Conversation.
Note: The `<div>` elements can be substituted with another, such as `<span>`.

## Number of Posts on Any Page

```html
<div data-spotim-module="messages-count" data-post-id="POST_ID"></div>
```
Pay attention that the script element should appear only once on the page, and the div element should be duplicated per every count you want to present on your page. This counter will not be updated in real time; it is typically used for home pages. Remember to include a launcher script.  

## Number of Posts on the Article's Page
If you wish to display the number of comments in a conversation, updated real time, add the attribute real-time="true". This will only work on pages where the same conversation is rendered. Remember to include a launcher script. 

```html
<div class="spot-im-replies-count" data-post-id="POST_ID" real-time="true"></div>
```
