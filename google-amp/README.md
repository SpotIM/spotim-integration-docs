# Spot.IM on AMP (Accelerated Mobile Pages)

Spot.IM supports Accelerated Mobile Page (AMP). If you're not familiar with AMP, it's an open source HTML library, JavaScript library, and caching service designed for building high performance web pages. AMP pages are highly optimized and adhere to a set of standards to maximize performance across a variety of browsers and platforms. To learn more, see Google's [What is AMP](https://www.ampproject.org/learn/overview/) page.

## Contents

- [Contents](#contents)
- [Before You Begin](#before-you-begin)
  - [Best Practices for Post IDs](#best-practices-for-post-ids)
- [Using AMP](#using-amp)

## Before You Begin

To use AMP, you will need the following information:

1. Your `Spot ID`. If you don't know your Spot ID, contact your Spot.IM account manager.
2. The `POST_ID` of the page you want to add a Spot.IM Conversation to. The `POST_ID` can be any alphanumeric value as long as it's unique to the page.

### Best Practices for Post IDs

Post IDs can contain the following characters:

- Letters
- Numbers
- Underscores
- Dashes

Post IDs should be short. A common approach is to use the page's title or content. For example:

`article_1`
`article-title`
`article-short-link`

## Using AMP for Conversation

Spot.IM's AMP implementation wraps the standard Spot.IM Conversation into an AMP iframe. Because of this, the Conversation appears static. When a user taps on the Conversation, a new browser tab opens and displays the standard Conversation interface.

1. Add the following CSS to your stylesheet.

_**Note:** If you have an existing `<style amp-custom>` tag, append the following class definition to that tag._
```html
<style amp-custom>
  .spot-im-amp-overflow {
    background: white;
    font-size: 15px;
    padding: 15px 0;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    color: #307fe2;
  }
</style>
```
2. Replace your current Spot.IM Conversation element with the following. Make sure to replace the `SPOT_ID` and `POST_ID` parameters with your own values.
```html
<amp-iframe width="375" height="815" resizable
    sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation"
    layout="responsive" frameborder="0" 
    src="https://amp.spot.im/production.html?spot_im_highlight_immediate=true&spotId=SPOT_ID&postId=POST_ID">
    <amp-img placeholder height="815" layout="fill" src="//amp.spot.im/loader.png"></amp-img>
    <div overflow class="spot-im-amp-overflow" tabindex="0" role="button" aria-label="Read more">Load more...</div>
</amp-iframe>
```

## Using AMP for the whole Social Kit
At the moment, Popular in the Community Widget has AMP-compatible code in Beta stages.
If you wish to implement on AMP both Popular in the Community and Conversation, please reach out to your account manager.

From the account manager you will recieve two html files:
1. Header - styling code to be added to your head section. It will be an HTML code snippet, wrapped with <style amp-custom> tags. _**Note:** If you have an existing `<style amp-custom>` tag, append the following class definition to that tag._
  
2. Body - Code of the Popular in the Community and Conversation, a.k.a the SpotIM standard implementation. If your AMP implementation is based on your general site template, replace the entire SpotIM block of code with the provided code in the HTML file. If not, position the code in the place you want to implement both of the widgets.
The file with the implementation code to be pasted into the Body of the page has the conversation AMP implemantation code presented above, with your `SPOT_ID` - https://github.com/SpotIM/spotim-integration-docs/tree/master/google-amp#using-amp-for-Conversation. Make sure to replace the `POST_ID` parameter with your own value.

_**Note:** By default, this code will present Conversation below Popular in the Community Widget. If you prefer differently, make sure to ask your Account Manager for this adjustment. 
