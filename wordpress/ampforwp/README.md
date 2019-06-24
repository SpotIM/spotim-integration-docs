
# AMP for WP plugin
Our Conversation and Popular in the Community Widget is supported by the AMP for WP plugin. You must have our regular Spot.IM wordpress plugin installed before using AMP For WP plugin. In addition, AMP for WP must be updated to the latest version released. 

## Important Note for Publishers That Already Have Spot.IM AMP Hardcoded onto Site
In order for AMP for WP plugin to work correctly, you must fully  delete all Spot.IM amp code that may have been hard coded onto your site. This includes code in both the head and body section. If you have any questions on exactly what to delete, please contact your account manager.

## Implementation
Implementation instructions are dependent on how our plugin is embedded onto your site. You can find your settings by going to the Spot WP plugin (not amp for wp!) in your wordpress settings and clicking on the advanced tab. Then locate `Comments Embed Method`

<img src="https://images.spot.im/image/upload/q_70,fl_lossy,dpr_3,c_limit/v200/f6b677f230452b558c1df45d96905cb4">
<br><br>


1. If the `Comments Embed Method` is set to `Insert After the Content` it will work without any other setup.

2. If the `Comments Embed Method` is set to `Replace WordPress Comments`, there are two separate lines of code you need to add. First, add the following code in the theme’s functions.php file: 
```php
if ( method_exists( 'SpotIM_Frontend','display_amp_comments' ) ) {
    add_action( 'ampforwp_after_post_content', function() {
        SpotIM_Frontend::display_amp_comments();
    }, 10 );
}
```

Next, add the given script in the head to get it working.
```html
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
```

 ![here](amp-plugin-settings.png)

It will append our widget to post content but WordPress Comments will still need to be manually disabled.



3. Manually add to a template:
![here](../amp-plugin/spotim-let-them-decide.png)

When using ampforwp plugin and embed method set to `Let theme decide`, add the following code to desired template on `wp-content/plugins/accelerated-mobile-pages/templates/accelerated-mobile-pages/templates/design-manager/{active-amp-theme}/`, it must be inside the WordPress's  post loop.
```php
if ( method_exists( 'SpotIM_Frontend','display_amp_comments' ) ) {
    SpotIM_Frontend::display_comments();
}
```


## Recirculation

Recirculation works on AMP powered pages by default along with comments.


### Ads on AMP powered pages

To enable the Recirculation Ads for AMP powered pages, Go to Advance Tab on SpotIM Settings and set `Recirculation AMP Ad tag` to enable.

![RC Ads](../amp-plugin/rc-ads.png)

It will display the AMP Ads under the Recirculation.
