# AMP for WP Plugin
Our Conversation and Popular in the Community Widget is supported by the AMP for WP plugin. You must have the most recent Spot.IM WordPress plugin installed before using the AMP For WP plugin. In addition, AMP for WP must be updated to the latest version released. 

## Important Note for Publishers That Already Have Spot.IM AMP Hardcoded onto Site
In order for AMP for WP plugin to work correctly, you must fully  delete all Spot.IM amp code previously hard coded onto your site. This includes code in both the head and body section. If you have any questions on exactly which code to delete, please contact your account manager.

## Implementation
Implementation instructions are dependent on how our plugin is embedded onto your site. You can find your settings by going to the Spot.IM WP plugin (not Amp for WP!) in your WordPress' settings and clicking on the advanced tab. Then locate `Comments Embed Method`

<img src="https://images.spot.im/image/upload/q_70,fl_lossy,dpr_3,c_limit/v200/f6b677f230452b558c1df45d96905cb4">
<br><br>

#### 1. `Comments Embed Method` is set to `Insert After the Content` 
No setup is needed.

#### 2. `Comments Embed Method` is set to `Replace WordPress Comments` 
There are two separate lines of code you need to add. First, add the following code in the theme’s functions.php file: 
```php
if ( method_exists( 'SpotIM_Frontend','display_amp_comments' ) ) {
    add_action( 'ampforwp_after_post_content', function() {
        SpotIM_Frontend::display_amp_comments();
    }, 10 );
}
```

Next, add the given script in the head to get it working. You can find this setting in the advanced settings tab of the AMP for WP plugin.

```html
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
```

 ![here](amp-plugin-settings.png)

It will append our widget to post content but WordPress Comments will still need to be manually disabled.


#### 3. `Comments Embed Method` is set to `Let the theme decide`
![here](../amp-plugin/spotim-let-them-decide.png)

Add the following code to desired template on `wp-content/plugins/accelerated-mobile-pages/templates/accelerated-mobile-pages/templates/design-manager/{active-amp-theme}/`. It must be inside the WordPress' post loop.
```php
if ( method_exists( 'SpotIM_Frontend','display_amp_comments' ) ) {
    SpotIM_Frontend::display_comments();
}
```


## Recirculation
Recirculation works on AMP powered pages by default along with comments.

### Ads on AMP powered pages
To enable the Recirculation Ads for AMP powered pages, go to the advanced tab in your Spot.IM plugin Settings (not AMP for WP) and enable `Recirculation AMP Ad tag`. Please note that ads must be turned on by your account manager inorder to populate.
![RC Ads](../amp-plugin/rc-ads.png)
