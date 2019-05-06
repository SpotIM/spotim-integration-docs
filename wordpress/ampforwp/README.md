# Utilize AMP for WP plugin
## Background:
Several of our partners use AMP to boost their traffic, we have a version of AMP conversation but we need the partners to add the relevant parameters to load the correct conversation using the [AMP for WP] (https://ampforwp.com/)

## Step-By-Step Guide
1. Add the following code in the theme’s functions.php file to add code snippet below the post content.
```html
add_action( 'ampforwp_after_post_content', function() {
?>
<amp-iframe width="375" height="815" resizable
    sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation"
    layout="responsive" frameborder="0"
    src="https://amp.spot.im/production.html?spot_im_highlight_immediate=true&spotId=sp_qMQBaEbp&postId=<?php the_ID(); ?>">
    <amp-img placeholder height="815" layout="fill" src="//amp.spot.im/loader.png"></amp-img>
    <div overflow class="spot-im-amp-overflow" tabindex="0" role="button" aria-label="Read more">Load more...</div>
</amp-iframe>
<?php
}, 10 );
```
Publisher can update the hook and use it where they can.
2. Add below given script in the head to get it working.
```html
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
```
It is required as The tag 'amp-iframe' requires including the 'amp-iframe' extension JavaScript.

Add above script as shown ![here](amp-plugin-settings.png) and Save Changes.


