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

Then, place a `<div>` element where you want the count to appear and replace `POST_ID` with the Post ID of the page you wish to display the count for. This should match the Post ID used in the page's Conversation:

## Number of Posts on Any Page

```html
<div data-spotim-module="messages-count" data-post-id="POST_ID"></div>
```
Pay attention that the script element should appear only once on the page, and the div element should be duplicated per every count you want to present on your page. This counter will not be updated in real time; it is typically used for home pages. 

## Number of Posts on the Article's Page
If you wish to display the number of posts in a conversation *on the same page as the conversation,* the counter can get updated real time, by adding the attribute real-time="true".

```html
<div class="spot-im-replies-count" data-post-id="POST_ID" real-time="true"></div>
```
