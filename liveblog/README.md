# Live Blog Implementation Steps

Cover any event with our live blog feature allowing assigned reporters to post live updates and view real-time replies in the middle of the action. 

1. Access your Live Blog settings in your admin panel by clicking on Features > Live Blog 
2. Create a new event and save changes <br/>
          *Your event will not render on the page unless it is within the date and time you set*
3. Once the event is created, head to the Settings tab and copy and paste the presented event code (example below) where you      want the product to appear on your page. Replace the marked parameters as indicated. 
4. The only way you can post updates, re-post visitors replies as updates and reject published replies is if you make yourself    a reporter on this page, granted you are already a user in the network. 

<br/>
 
 
```
  <script src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-live-blog="true"
    data-live-event-code="EVENT_CODE"></script>
```
    
 
Replace marked parameters:  
SPOT_ID - Your Spot.ID.   
EVENT_CODE - This is your Live Blog event code. 
