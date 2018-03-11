# Spot.IM Social Kit

The Spot.IM Social Kit consists of two components: Conversations and Popular in the Community. These components allow your users to create comments and view popular community-generated content. You can also use the Social Kit to import comments from a variety of social platforms including Facebook, WordPress, and Disqus.

If you are using WordPress, please see the [WordPress documentation page](wordpress/README.md).

## Contents

  - [Before You Begin](#before-you-begin)
    - [Best Practices for Creating Post IDs](#best-practices-for-creating-post-ids)
  - [Standard Implementation](#standard-implementation)
  - [Other Options](#other-options)
    - [Standalone Conversation Widget](#standalone-conversation-widget)
    - [Standalone Popular in the Community Widget](#standalone-popular-in-the-community-widget)
    - [Multiple Conversation Instances](#multiple-conversation-instances)
    - [Displaying the Number of Messages in a Conversation](#displaying-the-number-of-messages-in-a-conversation)
  - [Integrations](#integrations)
    - [Disqus](#disqus)
    - [Facebook](#facebook)

## Before You Begin

Before using the Spot.IM Social Kit, you will need your Spot.IM `Spot ID`. You will also need to create a `Post ID` for each article or page that you want to display the Social Kit on. You can use any alphanumeric value as a Post ID, but it must be unique to each page. See the following section for [best practices for creating Post IDs](#best-practices-for-creating-post-ids). You will also need an `ARTICLE_URL`, which is the canonical URL of the page that the article is hosted on. The `ARTICLE_URL` is used in part to generate previews of the article when it is linked to in the Social Kit.

Additionally, your article pages will need to contain [Open Graph (OG)](http://ogp.me/) tags. OG tags are meta tags that define the title, type, preview image, and other attributes of each article on your website. Each page must contain these tags in order for the Social Kit to generate previews of the article. You can learn more about OG tags at the [OG specification page](http://ogp.me/).

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

The Social Kit standard implementation adds two widgets to each page: the Conversation widget and the Popular in the Community widget. The Conversation widget lets your users view and create comments, while the Popular in the Community widget showcases popular user-generated content.

![Image of a standard implementation](standard-implementation.png)

To add these widgets to your page, first add the following `<script>` to the page's `<head>` element:

```html
<script async src="https://recirculation.spot.im/spot/SPOT_ID"></script>
```

Then, place the following elements in the location on the page where you want the widgets to appear. You can place these widgets anywhere, although we recommend placing them just below the page's main content.

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-post-id="POST_ID"></script>
```

## Other Options

### [Standalone Conversation Widget](conversation-standalone-example.html)

To display a Conversation widget by itself, place the Conversation's `<script>` element in the location on the page where you want the widget to appear. You can find an implementation example [here](conversation-standalone-example.html).

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-post-id="POST_ID"></script>
```

### [Standalone Popular in the Community Widget](popular-in-the-community-standalone-example.html)

To display a Popular in the Community widget by itself, place the following elements in the location on the page where you want the widget to appear. You can find an implementation example [here](popular-in-the-community-standalone-example.html).

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script src="https://recirculation.spot.im/spot/SPOT_ID"></script>
```

### [Multiple Conversation Instances](multiple-conversation-instances/README.md)

You can embed multiple Conversation widgets on a single page. For more information, see the [Multiple Conversation Instances](multiple-conversation-instances/README.md) documentation page.

### [Displaying the Number of Messages in a Conversation](comments-count/README.md)

You can display a separate widget showing the number of messages in a Conversation. For more information, see the [Message Count](comments-count/README.md) documentation page.

## Integrations

You can import comments from another comment platform into Spot.IM. If you are migrating from another platform, this lets your users continue their conversations in Spot.IM from the other platform.

The import process is triggered by an _import hint_, which is a set of parameters added to a Conversation's `<script>` block. These parameters identify the article in the platform you are importing from. When the Conversation loads for the first time, the import hint triggers the Spot.IM backend service to import the article's comments from the previous platform. This process occurs only once for each article when the article's Conversation widget is first loaded.

### Disqus

Importing comments from Disqus requires two additional parameters:

- A [`DISQUS_URL`](https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables#thispageurl), which is the URL that the Disqus service uses to identify the article.
- A [`DISQUS_IDENTIFIER`](https://help.disqus.com/customer/portal/articles/472099-what-is-a-disqus-identifier-), which tells the Disqus service which comment thread to load.

Add these parameters to the Conversation's `<script>` block on the article page.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-post-url="ARTICLE_URL"
    data-disqus-url="DISQUS_URL"
    data-disqus-identifier="DISQUS_IDENTIFIER"></script>
```

### Facebook

Importing comments from Facebook requires one additional parameter:

- A `FACEBOOK_URL`, which is the URL of the Facebook page that you want to display comments for.

Add this parameter to the Conversation's `<script>` block on the article page.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-post-url="ARTICLE_URL"
    data-facebook-url="FACEBOOK_URL"></script>
```
