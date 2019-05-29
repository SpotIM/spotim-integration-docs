# Spot.IM LiveBlog
Spot.IM support a special type of Conversation called LiveBlog. 
It allows pre-defined users to report live on an event, with a pre-defined time frame.
During the live reporting phase, Reporters' newest messeges will appear on top.
Once live coverage timeframe is expired, order of messeges will turn to oldest appear first.
To allow implementation of liveBlog in WP, you need to create a liveBlog event in the admin console.

## Create LiveBlog Event
1. Go to Features-> Live Blog and click "Create New Event".
2. Enter Title, Location, and the time frame you want the liveBlog to be on.
3. Once created, go to your LiveBlog and click "Manage". 
   In Settings tab you can see the embed code, and set the reporters for the event.
   
If you prefer to disable the ability to reply to Reporters' comments, please contact support, to enable such configuration.

## Implement LiveBlog Event in your WP site
You can copy the embed code with all related data from the settings tab of the liveBlog itself.
Structure is as follows:
<script src="https://launcher.spot.im/spot/SPOT_ID"

    data-spotim-module="spotim-launcher"

    data-live-blog="true"

    data-live-event-code="EVENT_CODE"></script>


Parameters are:

SPOT_ID - Your Spot.ID.

EVENT_CODE - This is your Live Blog event code from previous step.

Copy and paste this code in the post you want to have LiveBlog on.
It is possible to disable Spot.IM comments widget in this post, to allow the social interaction to be around the liveBlog.
