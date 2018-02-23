# Spot.IM Social Kit

The Spot.IM Social Kit lets you display Spot.IM Conversations on your own website, or integrate with a variety of social platforms including Facebook, WordPress, Disqus, and Blogger.

## Contents

  - [Contents](#contents)
  - [Before You Begin](#before-you-begin)
    - [Best Practices for Post IDs](#best-practices-for-post-ids)
  - [Implementations](#implementations)
    - [Standalone Conversation](conversation-standalone-example.html)
    - [WordPress](#wordpress)
      - [Importing Spot.IM Comments Into WordPress](#importing-spotim-comments-into-wordpress)
    - [Blogger](#blogger)
    - [Disqus](#disqus)
    - [Facebook](#facebook)
  - [Advanced Options](#advanced-options)
    - [Popular in the Community](popular-in-the-community-standalone-example.html)
    - [Adding a Newsfeed](newsfeed-standalone-example.html)
    - [Multiple Conversation Instances](multiple-instances-example.html)
      - [Adding an Instance](#adding-an-instance)
      - [Removing an Instance](#removing-an-instance)
    - [Displaying the Number of Messages in a Conversation](comments-count-example.html)

## Before You Begin

Before you can make use of Social Kits, you will need to set up your Spot.IM account. Request a demo by going to [www.spot.im](www.spot.im), entering basic information about your website, and clicking on **Get Started Now**.

After setting up your account, log in to the Admin Dashboard and click **Features**. Then, click on the **Social Kit** tab.

For most of the components on this page, you will also need your `Spot ID` and `Post IDs`. Your Spot ID is a unique ID associated with your Spot.IM account. You can get your Spot ID by contacting [support@spot.im](support@spot.im). Post IDs identify individual pages or articles on your website. You can use any alphanumeric value as a Post ID, but it must be unique for each page. See below for best practices for generating Post IDs.

### Best Practices for Post IDs

A Post ID can be any alphanumeric value that uniquely identifies a page. Post IDs can contain the following characters:

- Letters
- Numbers
- Underscores
- Dashes

Post IDs should be short. A common approach is to use the page's title or content. For example:

- `article_1`
- `article-title`
- `article-short-link`

## Implementations

<!-- TODO: Recommend adding images for Standalone Conversation, WordPress, and Blogger. -->

### [Standalone Conversation](conversation-standalone-example.html)

Standalone Spot.IM Conversations can be placed in any location on any web page. Simply place the `<div>` element shown below where you want the Conversation to appear. We recommend placing it just below the page's main content.

In addition to a Spot ID and Post ID, you will also need an `ARTICLE_URL`. The Article URL is the canonical URL for the article or page that the Conversation is related to.

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script async src="https://recirculation.spot.im/spot/SPOT_ID"></script>
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-url="ARTICLE_URL"
    data-post-id="POST_ID"></script>
```

### WordPress

Spot.IM provides a plugin for integrating with WordPress.

[![How to Install the Spot.IM WordPress Plugin](https://img.youtube.com/vi/U-TWO8k0ojI/0.jpg)](https://www.youtube.com/watch?v=U-TWO8k0ojI)_Click here to watch a video walkthrough._

1. Log into your WordPress dashboard as an administrator.
2. In the left-hand navigation pane, click **Plugins** > **Add New**.
3. Enter "Spot.IM Comments" in the search field. You should see the [Spot.IM Comments](https://wordpress.org/plugins/spotim-comments/) plugin listed. If you do not see the plugin listed, you may be using an outdated or incompatible version of WordPress.
4. On the plugin page, click **Install Now** in the lower right-hand corner. This brings you to the installation page.
5. Click **Activate Plugin** to download and install the plugin.
6. Return to your WordPress dashboard and click **Settings** > **Spot.IM Settings** > **WP Sync**.
7. Enter your Spot ID in the Spot ID text box, then click **Save Changes**.

#### Importing Spot.IM Comments Into WordPress

You can import your Spot.IM comments into WordPress. This allows you to view, moderate, and filter comments through the WordPress dashboard.

In order to use WordPress integration, you will need an _import token_. Contact [support@spot.im](mailto:support@spot.im) for help with getting an import token.

1. Log into your WordPress dashboard as an administrator.
2. In the left-hand navigation pane, click **Spot.IM**, then click **Display**.
3. Set all display options to _disabled_.
3. Click on the **WP Sync** tab.
4. Enter your **Import Token**. If you need an import token, contact [support@spot.im](mailto:support@spot.im).
5. Enter any additional configuration options including:
    - The number of posts to retrieve on sync
    - How often to import comments
6. Click **Import Now** to immediately import your comments, or click **Save Changes** to save.

The import process can take several minutes to complete. Once it's finished, all of your Spot.IM comments will be available in WordPress.

### Blogger

You can add Spot.IM Conversations to your Blogger pages by adding a [Standalone Conversation](#standalone-conversation) to your Blogger templates.

To integrate Spot.IM with Blogger, add the [Universal Code](#universal-code) to your Blogger templates.

1. Log in to your Blogger dashboard as an administrator.
2. In the left-hand navigation panel, click **Settings** > **Post and Comments**.
3. Disable Blogger's default comment system by clicking **Comments** > **Comments** and selecting "Hide" in the drop-down menu.
4. Return to the dashboard and click **Template** > **Edit HTML**.
5. Copy and paste the following `<script>` elements into the `<head>` section of the template. Replace `SPOT_ID` and `POST_ID` your own values.

    ```html
    <script async src="https://recirculation.spot.im/spot/SPOT_ID"></script>       
    <script async data-spotim-module="spotim-launcher" src="https://launcher.spot.im/spot/SPOT_ID" data-post-id="POST_ID"></script>
    ```

6. Copy and paste the following `<div>` element into the `<body>` section of the template. This element can go anywhere on the page, although we recommend placing it right after the page's contents.

    ```html
    <div data-spotim-module="recirculation" data-spot-id="sp_ptnymcmS"></div>
    ```

7. Click **Save Template**.

### Disqus

Spot.IM can display comments from Disqus. Before you begin, you will need two additional pieces of data from Disqus:

- A [`DISQUS_URL`](https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables#thispageurl), which is the URL that the Disqus service uses to identify the current page.
- A [`DISQUS_IDENTIFIER`](https://help.disqus.com/customer/portal/articles/472099-what-is-a-disqus-identifier-), which tells the Disqus service which comment thread to load.

To display Disqus comments, follow the instructions for a [standalone Conversation](#standalone-conversation) and replace the second `<script>` element with the following. Make sure to replace `SPOT_ID`, `POST_ID`, `ARTICLE_URL`, `DISQUS_URL`, and `DISQUS_IDENTIFIER` with your own values.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-post-url="ARTICLE_URL"
    data-disqus-url="DISQUS_URL"
    data-disqus-identifier="DISQUS_IDENTIFIER"></script>
```

### Facebook

Spot.IM can display comments from Facebook. Before you begin, you will need the URL of the Facebook page that you want to display comments for. This URL will be provided to Spot.IM in the `FACEBOOK_URL` parameter.

Follow the instructions for a [standalone Conversation](#standalone-conversation) and replace the second `<script>` element with the following. Make sure to replace `SPOT_ID`, `POST_ID`, `ARTICLE_URL`, and `FACEBOOK_URL` with your own values.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-post-url="ARTICLE_URL"
    data-facebook-url="FACEBOOK_URL"></script>
```

## Advanced Options

<!-- TODO: Recommend adding images for Popular in the Community, Newsfeed, and Message Count -->

### [Popular in the Community](popular-in-the-community-standalone-example.html)

You can showcase popular comments by embedding a "Popular in the Community" control. This promotes popular user-generated content on the current page.

Make sure to replace `SPOT_ID` with your own Spot ID.

```html
<div data-spotim-module="recirculation" data-spot-id="SPOT_ID"></div>
<script src="https://recirculation.spot.im/spot/SPOT_ID"></script>
```

### [Adding a Newsfeed](newsfeed-standalone-example.html)

<!-- TODO: What does the Newsfeed do? -->

To add a Newsfeed, place the following script where you want the Newsfeed to appear on the page. Make sure to replace `SPOT_ID` with your own Spot ID:

```html
<script async
    src="https://launcher.spot.im/spot/SPOT_ID?module=newsfeed"
    data-spotim-module="spotim-launcher"></script>
```

### [Multiple Conversation Instances](multiple-instances-example.html)

You can embed multiple Conversations on the same page. Some features such as infinite scroll pages or Single Page Applications (SPAs) require this functionality. The best approach is to create a single `<div>` container where all of the Conversation data loads.

**Important:** The `POST_ID` and `ARTICLE_URL` parameters must match the article that the Conversation relates to. If the URL changes while a user is using an infinite scroll Conversation or swapping articles in an SPA, ensure that the Conversation's `ARTICLE_URL` matches the new URL. Using an identical `ARTICLE_URL` in two different Conversations could lead to a corrupted state. Each Conversation should also refer to a different `POST_ID`, otherwise the same Conversation will be loaded multiple times.

#### Adding an Instance

The following HTML creates a Conversation container and adds a Conversation using JavaScript. Make sure to replace `SPOT_ID`, `POST_ID`, and `ARTICLE_URL` with your own values.

```html
<div class="spotim-container"></div>
<script>
  var spotId = 'SPOT_ID';
  var postId = 'POST_ID';
  var articleUrl = 'ARTICLE_URL';
  // get reference to the container:
  var container = document.querySelector('.spotim-container');
  // create the elements and set all attributes:
  var recirculationDiv = document.createElement('div');
  recirculationDiv.setAttribute('data-spotim-module', 'recirculation');
  recirculationDiv.setAttribute('data-spot-id', spotId);
  var recirculationScript = document.createElement('script');
  recirculationScript.setAttribute('async', 'true');
  recirculationScript.setAttribute('src', 'https://recirculation.spot.im/spot/' + spotId);
  var conversationScript = document.createElement('script');
  conversationScript.setAttribute('async', 'true');
  conversationScript.setAttribute('src', 'https://launcher.spot.im/spot/' + spotId);
  conversationScript.setAttribute('data-spotim-module', 'spotim-launcher');
  conversationScript.setAttribute('data-post-url', articleUrl);
  conversationScript.setAttribute('data-post-id', postId);
  // append the elements to the container:
  container.appendChild(recirculationDiv);
  container.appendChild(recirculationScript);
  container.appendChild(conversationScript);
</script>
```

#### Removing an Instance

To remove one or more Conversation instances, simply clear their containers:

```html
<script>
  var container = document.querySelector('.spotim-container');
  container.innerHTML = '';
</script>
```

### [Displaying the Number of Messages in a Conversation](comments-count-example.html)

You can display the number of messages in a Conversation anywhere on the page. Place the following script on your page, replacing `SPOT_ID` with your Spot ID:

```html
<script async
    src="https://launcher.spot.im/spot/SPOT_ID?module=messages-count"
    data-spot-id="SPOT_ID"
    data-spotim-module="spotim-launcher"></script>
```

Then, place a `<div>` element where you want the count to appear, replacing `POST_ID` with the page's Post ID:

```html
<div class="spot-im-replies-count" data-post-id="POST_ID"></div>
```
