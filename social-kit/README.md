# Spot.IM Social Kit
The Spot.IM Social Kit consists of two components: Real-Time Conversation and Popular-in-the-Community. These components allow your users to write comments and replies to your articles, and view popular community-generated content on your articles.

Power conversation with Real-Time Conversation, a lightweight and fully customizable module to inspire your audience to engage. Complete with automatic moderation for illicit or toxic chatter, Real-Time Conversation will help boost pageviews and SEO rankings.

Popular-in-the-Community promotes the most popular content from your site by showcasing user-generated content (UGC). This unit drives users to more of your content and features a monetization component so you can generate meaningful revenue via revshare.

If you are using WordPress, please see the [WordPress documentation page](../wordpress/README.md).

## Contents
  - [Before You Begin](#before-you-begin)
    - [Best Practices for Creating Post IDs](#best-practices-for-creating-post-ids)
  - [Standard Implementation](#standard-implementation)
  - [Other Options](#other-options)
    - [Standalone Conversation Widget](#standalone-conversation-widget)
    - [Dynamic Conversation Widget in PHP](#dynamic-conversation-widget-in-php)
    - [Standalone Popular in the Community Widget](#standalone-popular-in-the-community-widget)
    - [Standalone Side Rail Popular in the Community Widget](#standalone-side-rail-popular-in-the-community-widget)
    - [Multiple Conversation Instances](#multiple-conversation-instances)
    - [Displaying the Number of Messages in a Conversation](#displaying-the-number-of-messages-in-a-conversation)
  - [Integrations](#integrations)
    - [Disqus](#disqus)
    - [Facebook](#facebook)

## Before You Begin
Before using the Spot.IM Social Kit, you will need your Spot.IM `Spot ID`. You will also need to create a `Post ID` for each article or page that you want to display the Social Kit on. You can use any alphanumeric value as a `Post ID`, but it must be unique to each page. See the following section for [best practices for creating Post IDs](#best-practices-for-creating-post-ids).

Additionally, your article pages will need to contain [OG Tags](https://blog.kissmetrics.com/open-graph-meta-tags/) tags. OG tags are meta tags that define the title, type, preview image, and other attributes of each article on your website. Each page must contain these tags in order for the Popular in the Community to generate previews of the article.

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

## Standard Implementation
The Social Kit standard implementation adds two widgets to each page: Real-Time Conversation Widget and the Popular-in-the-Community Widget. The Conversation Widget lets your users view and create comments, while the Popular-in-the-Community Widget showcases popular user-generated content.

![Image of a standard implementation](social-kit.png)

To add these widgets to your page, place the following elements in the location on the page where you want the widgets to appear. You can place these widgets anywhere, although we recommend placing them just below the page's main content.

You will need to replace the following placeholders:
- `SPOT_ID` - Your Spot ID. **Notice** that the `SPOT_ID` appears in 3 places.
- `POST_ID` in `data-post-id` attribute - A unique identifier for this Conversation.
- `ARTICLE_TOPIC` in `data-article-tags` attribute - Main topics of the article. Can include several topics, separated by ",".This attribute is optional, and is used to support Spot.IM's advanced features, such as Topic Pages, Recirculation by Topic, etc.
- `ARTICLE_URL` in `data-post-url` attribute - The full Canonical URL of the page. This attribute is optional, and is used only if page's Canonical URL reference in the page's head section is erroneous.

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script async src="https://recirculation.spot.im/spot/SPOT_ID"></script>
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-article-tags="ARTICLE_TOPIC1, ARTICLE_TOPIC2"    
    data-post-id="POST_ID"></script>
```

## Other Implementaitons
Spot.IM is actively working on additional documentation. Please contact us if you can not find necessary information online. 

### Standalone Conversation Widget
To display a Conversation widget by itself, place the Conversation's `<script>` element in the location on the page where you want the widget to appear. You can find an implementation example [here](conversation-example.html).

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-article-tags="ARTICLE_TOPIC1, ARTICLE_TOPIC2"    
    data-post-id="POST_ID"></script>
```

### Dynamic Conversation Widget in PHP
To display a Conversation widget in WP, utilizing the information that is already on the WP system, you can place the following Conversation's `<script>` element in the location on the page where you want the widget to appear.

```html
<script async
    data-spotim-module="spotim-launcher"
    src="https://launcher.spot.im/spot/SPOT_ID"
    data-post-url="<?php echo esc_url( get_permalink()); ?>"
    data-article-tags="<?php echo implode(', ', wp_get_post_tags( get_the_ID(), array( 'fields' => 'names' ) )); ?>"    
    data-post-id="<?php echo get_the_ID(); ?>"></script>
```

### Standalone Popular in the Community Widget
To display a Popular in the Community widget by itself, place the following elements in the location on the page where you want the widget to appear. You can find an implementation example [here](popular-in-the-community-example.html).

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script src="https://recirculation.spot.im/spot/SPOT_ID"></script>
```

### Standalone Side Rail Popular in the Community Widget
To display a Popular in the Community Widget as a side bar by itself, place the following elements:
Embed this code where you want the Social Side Rail to appear:

```html
<div style="color:#7B7F83;margin:15px;font-size:13px;text-transform:uppercase;">Popular in the Community</div>
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID" data-spotim-product="siderail"></div>
<script async src="https://recirculation.spot.im/spot/SPOT_ID/siderail" data-spotim-script="recirculation"></script>
```

Replace marked parameters:

SPOT_ID - Your Spot.ID, ask your account manager for a Spot.ID

### Multiple Conversation Instances
You can embed multiple Conversation widgets on a single page. For more information, see the [Multiple Conversation Instances](../multiple-conversation-instances/README.md) documentation page.

### Displaying the Number of Messages in a Conversation
You can display a separate widget showing the number of messages in a Conversation. For more information, see the [Message Count](../conversation/comments-count/README.md) documentation page.

### Importing Comments from Other Platforms
Our conversation widget offers the ability to import comments from other platforms. For more information, see the [Import](../imports/readme.md) documentation page.


