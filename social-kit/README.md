# Spot.IM Social Kit

The Spot.IM Social Kit allows users to actively engage within your site giving them the platform to seamlessly integrate into your community. Through our unique real-time commenting feature, our social kit offers users the ability to view the most popular content while producing a captivating discussion directly on the page. The Spot.IM Social Kit is composed of three widgets: 

1. Conversation: a lightweight and customizable module designed to motivate your audience to interact. Complete with automatic moderation for illicit or toxic chatter,  our real-time Conversation widget will help boost page views and SEO rankings.
2. Popular in the Community: this unit promotes the most popular articles from your site by showcasing user-generated content (UGC) above Conversation. Popular in the Community drives your visitors to a range of material your website promotes and features a monetization component so you can generate meaningful revenue via rev-share.
3. Community Spotlight: our customizeable Community Spotlight widget creates a call to action for registered users to instantly dive into the Conversation and encourages first time users to evolve into power users through an email sign up form.

If you are using WordPress, please see the [WordPress documentation page](https://github.com/SpotIM/spotim-integration-docs/blob/master/wordpress/README.md).

## Contents
  - [Before You Begin](#before-you-begin)
    - [Best Practices for Creating Post IDs](#best-practices-for-creating-post-ids)
  - [Standard Implementation](#standard-implementation-via-launcher)
    - [Conversation Widget](#Conversation)
    - [Popular in the Community Widget](#popular-in-the-community)
    - [Community Spotlight](#community-spotlight)

## Before You Begin
Before using the Spot.IM Social Kit, you will need your Spot.IM `Spot ID`. You will also need to create a `Post ID` for each article or page that you want to display the Social Kit on. You can use any alphanumeric value as a `Post ID`, but it must be unique to each page. See the following section for [best practices for creating Post IDs](#best-practices-for-creating-post-ids).

Additionally, your article pages should contain [OG Tags](https://blog.kissmetrics.com/open-graph-meta-tags/) tags. OG tags are meta tags that define the title, type, preview image, and other attributes of each article on your website. Each page must contain these tags in order for the Popular in the Community to generate previews of the article.

### Best Practices for Creating Post IDs
A Post ID can be any alphanumeric value that uniquely identifies a page. Post IDs can contain the following characters:
- Letters
- Numbers
- Underscores
- Dashes

Post IDs should be short. A common approach is to use the page's title or content. For example:
- `article_1`
- `article-title`
- `article-short-link`

## Standard Implementation via Launcher
To add these widgets to your site insert the following block of code where you would like the product to render on each page. 
The default location is at the end of your article to ensure your users are encouraged to particpate in that article's 
Conversation. It is imperative to implement this launcher within your code to enable any of our products. Once live, you have the ability to alter the styling and placement of the widget through our internal tool or directly with our team. Please note that our Popular in the Community and Community Spotlight widget's can only be turned on by contacting your partner success manager.

You will need to replace the following placeholders:
- `SPOT_ID` - Your Spot ID.
- `ARTICLE_URL` in `data-post-url` attribute (optional) - The full URL address for the page. This attribute is used only if page's URL reference in the page's head section is erroneous.
- `ARTICLE_TOPIC` in `data-article-tags` attribute (optional)- Main topics of the article. Can include several topics, separated by ",".  
- `POST_ID` in `data-post-id` attribute - A unique identifier for this particular article.


```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-article-tags="ARTICLE_TOPIC1, ARTICLE_TOPIC2"    
    data-post-id="POST_ID"></script>
```
Examples of Conversation and Popular in the Community: 

![image](https://s3.amazonaws.com/www.spotim.name/danielle+/IMG.png)

### Conversation 
To display a conversation widget by itself, place the launcher `<script>` element in the location on the page where you want the widget to appear. If you need specific use case implementation instructions, please click [here](https://github.com/SpotIM/spotim-integration-docs/blob/master/conversation/README.md)

### Popular in the Community 
Popular in the Community promotes the most popular content from your site by showcasing user-generated content (USG). This unit drives users to more of your content and features a monetization component so you can generate meaningful revenue via revenue share. To implement a standalone Popular in the Community widget please [click here](https://github.com/SpotIM/spotim-integration-docs/edit/master/recirculation/README.md).

### Community Spotlight
The Community Spotlight feature improves site engagement by allowing users to build a community directly on your page. Community Spotlight prompts users to enter their email address or instantly join the conversation as registered users. The default location for this feature is above the Popular in the Community widget however, you can seamlessly inject Community Spotlight to the siderail or the middle of your page, for example. This widget will boost your number of returning power users and intrigue new users to be a part of your website's community. 

Community Spotlight implementation is dependent on whether you have our conversation widget active on your page. To activate Spotlight first contact your Publisher Success Manager to have it set up in our backend. Next, place the appropriate code where you would like Community Spotlight to load. 

For more Community Spotlight implementation information please view our [FAQ page](https://github.com/SpotIM/spotim-integration-docs/tree/master/spotlight).

### Custom Placement of Widgets
By default, all of our widgets load where the launcher script is placed. It is possible to move popular in the community and our spotlight widget to another place on the page by adding a custom div. Note the launcher script still needs to be inserted on page and conversation will load there. Certain use cases where this can be overridden can be found [here](https://github.com/SpotIM/spotim-integration-docs/blob/master/conversation/README.md#specific-conversation-use-case-implementations)

Insert the appropriate div of the widget you want to load on page and the widget will load there.
##### Popular in the Community Code
```<div data-spotim-module="pitc"></div>```

##### Spotlight Code
```<div data-conversation-spotlight></div>```

Additional customizations can be found by going to [Popular in the Community](https://github.com/SpotIM/spotim-integration-docs/edit/master/recirculation/README.md) and [Spotlight](https://github.com/SpotIM/spotim-integration-docs/tree/master/spotlight) sections. 
