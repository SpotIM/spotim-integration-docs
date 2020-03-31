# Real-Time Conversation 
The Conversation widget not only transports your users to witness live non-toxic discourse between a plethora of passionate contributers but it allows them to be a part of the Conversation which encourages users to feel part of something bigger than your website. If you would like additional information about how to implement conversation along with any of our other widgets, please [click here](https://github.com/SpotIM/spotim-integration-docs/blob/master/social-kit/README.md).

## Specific Conversation use Case Implementations

#### Implementing Conversation Behind a Button
There are certain situations where you may need a place your launcher script in front of a button, but need to have conversation load behind a button. A popular use case would be loading our Popular in the Community in front of a button, but having our conversation load behind it. Follow the steps below to implement conversation for this use case:

1. First, add our launcher code in front of the button. Usually, our conversation widget loads where the launcher is placed, so an additional data attribute **data-spotim-autorun="false"** needs to be added. This attribute delays the launch of the conversation widget. An example launcher script would look like this: 

```html
<script
   async
   src="https://launcher.spot.im/spot/YOUR_SPOT_ID"
   data-post-id="POST_ID"
   data-spotim-module="spotim-launcher"
   data-spotim-autorun="false">
 </script>
```
2. Inject the conversation container below after the user clicks on the button
```html
<div data-spotim-module="conversation" data-post-id="POST_ID"></div>
```

#### Displaying the Number of Messages in a Conversation
You can display a separate widget showing the number of messages in a Conversation. For more information, see the [Message Count](../conversation/comments-count/README.md) documentation page.

#### Importing Comments from Other Platforms
Our conversation widget offers the ability to import comments from other platforms. For more information, see the [Import](../imports/readme.md) documentation page.
