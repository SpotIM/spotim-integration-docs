# Community Spotlight
The Community Spotlight feature will help you showcase and motivate your community while creating additional revenue opportunities. With fresh insights and a call-to-action, your community will be prominently prompted to participate in the conversation or join the community as registered users. Overall, choosing to use this feature will boost your number of returning power users. Enabling this feature will drive more user participation and more revenue. In order to enable Community Spotlight, please speak to your account manager.

## Common Questions
*Can I implement both Popular-in-the-Community and Community Spotlight on my page?*<br>
Yes! While your visitors will enjoy navigating between different articles using Popular-in-the-Community, they will learn about your community and potentially become registered users with the Community Spotlight.

*What are the display and video ad unit dimensions within Community Spotlight?*<br>
Display unit dimensions are 400x300, Ad dimensions are 300x250.

*Does Community Spotlight feature offer native advertising?*<br>
Yes. Community Spotlight is able to present native ads instead of the recommended default configuration that includes both display and video ads. In case you prefer using only native, please contact your AM.

*Is Community Spotlight rev share different from other Spot.IM monetization opportunities?*<br>
No. The same conditions apply.

*Is Community Spotlight customizable?*<br>
Yes! Currently, there are two types of Commmunity Spotlights offered, email capture and comment driver. Email capture enables you to collect email addresses of users. Comment driver allows a site to drive awareness of our conversation widget by automaticaly scrolling to the conversation widget when a user clicks on the Community Spotlight widget. You can also customize Community Spotlight logo, text, and color. 

### Implementation
Community Spotlight is extremely easy to implement. Implementation is dependent on whether you have our conversation widget already active on the page. Please place the appropriate code into where you would like Community Spotlight to load.

*If Conversation Widget is NOT on page*
```html
<script async data-spotim-module="spotim-launcher" src="https://launcher.spot.im/spot/INSERT SPOT_ID HERE"></script>
```
<br>

*If Conversation Widget is on page*

```html
<div data-conversation-spotlight></div>
```

#### Siderail Implementation
We offer a siderail implementation of spotlight as long as your siderail is 300px or less. Place the following line of code where you would like spotlight to load in your siderail. Please note, we currently do not support having regular spotlight and siderail spotlight on the same article.

```
<script async data-spotim-module="spotim-launcher" src="https://launcher.spot.im/spot/INSERT SPOT_ID HERE"></script>
<div data-conversation-spotlight data-spotlight-sidebar></div>
```
