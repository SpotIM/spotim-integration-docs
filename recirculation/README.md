# Popular-in-the-Community
Popular-in-the-Community, or Recirculation, promotes the most popular content from your site by showcasing user-generated content (UGC). This unit drives users to more of your content and features a monetization component so you can generate meaningful revenue via revshare. You can find implementation instructions for Popular in the Community packaged with our other widgets [here](https://github.com/SpotIM/spotim-integration-docs/tree/master/social-kit)

## Standalone Popular in the Community Implementation 

To implement the Popular in the Community Widget without Conversation inject the following block of code where you would like the product to render. Be sure to replace SPOT_ID with your site's spot id. Be sure to only include one launcher in your code as the product will not load properly with more than one. 

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"></script>
```

## Popular in the Community Options
Please note all versions of Popular in the Community require a launcher script such as the one listed above. 

#### Vertical Layout (siderail)
In order to load a vertical layout version of Popular in the Community, insert this line of code where you want Popular in the Community to load
<br>
```<div data-spotim-module="pitc" data-vertical-view="true"></div>```
<br>

#### Infinite Scroll
To load multiple instances of Popular in the Community, insert the following div where you would Popular in the Community to load. Do NOT add multiple instances of the launcher, only the div. 
<br>
```<div data-spotim-module="pitc"></div>```

#### Double Decker
Popular in the Community has an option to support two rows (one above conversation and one below). Please contact your PSM if you would like to enable this option. 









