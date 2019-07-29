## Imports
You can import comments from another comment platform into Spot.IM. If you are migrating from another platform, this lets your users continue their conversations in Spot.IM from the other platform.

The import process is triggered by an _import hint_, which is a set of parameters added to a Conversation's `<script>` block. These parameters identify the article in the platform you are importing from. When the Conversation loads for the first time, the import hint triggers the Spot.IM backend service to import the article's comments from the previous platform. This process occurs only once for each article when the article's Conversation widget is first loaded.

### Disqus
Importing comments from Disqus requires two additional attributes:

- `data-disqus-url` - [`disqus_url` or `this.page.url`](https://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables#thispageurl) parameter in your Disqus integration code.
- `data-disqus-identifier` - [`disqus_identifier`](https://help.disqus.com/customer/portal/articles/472099-what-is-a-disqus-identifier-) parameter in your Disqus integration code. Has a pattern of postID<whitespace> "https://admin.publisher.domain/?p=postID"

Add these parameters to the Conversation's `<script>` block on the article page.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-article-tags="ARTICLE_TOPIC1, ARTICLE_TOPIC2"
    data-post-url="ARTICLE_URL"
    data-disqus-url="DISQUS_URL"
    data-disqus-identifier="DISQUS_IDENTIFIER"></script>
```

### Facebook
Importing comments from Facebook requires one additional attribute:

- `data-facebook-url` - this is the canonical URL of the page you place the Conversation on.

Add this parameter to the Conversation's `<script>` block on the article page.

```html
<script async src="https://launcher.spot.im/spot/SPOT_ID"
    data-spotim-module="spotim-launcher"
    data-post-id="POST_ID"
    data-article-tags="ARTICLE_TOPIC1, ARTICLE_TOPIC2"
    data-post-url="ARTICLE_URL"
    data-facebook-url="ARTICLE_URL"></script>
```

### Livefyre
Importing Livefyre comments requires one additional attributes:

- `data-livefyre-url` - this is the `articleId`, which uniquely identifies a Collection in your Livefyre account

See [Livefyre Import](../livefyre-import/README.md) documentation for more details about the import process.

### CSV Import
If you do not use any of the commenting platforms listed above, there may be an option to manually import comments though a CSV file. The following sections list requirements and options for CSV imports.

#### Necessary Columns For All Manual Imports
* POST_ID - this needs to match the POST_ID of the article where you put our conversation widget
* user_id
* message_id
* content

#### Nice To Have Columns for User Data
* user_name - without this it will be generated as a Guest. This field can not contain special characters (Ex: "<" or ">"), but may contain foreign characters. 
* display_name - Without this it will be generated as a Guest
* image_url - Without this it will be a random Spot.IM avatar
* email - Without this it will be empty, and we will be unable to match users to their comments if there is no SSO process that matches user ids
* email_verified - Without this it will be defaulted to false
* created_at - Without this it will be defaulted to the current time
* private_profile - Without this the user profiles will default to false (public profile)

#### Nice to Have Columns for Message Data
* approved - Without this it will be defaulted to true
* written_at - Without this it will be defaulted to the current time
* parent - Without a parent column, all messages will be imported as basic comments and replies will not be connected to their parents
* absolute_likes - Without this, we will default to 0 likes (if we have this, we will have no user data associated with the likes)
* absolute_dislikes - Without this, we will default to 0 dislikes (if we have this, we will have no user data associated with the likes)
* user_likes - Without this, we will default to 0 likes (must be in the form of a list of user ids)
* user_dislikes - Without this, we will default to 0 dislikes (must be in the form of a list of user ids)

A sample CSV sent to us would look like this:
<img src="https://images.spot.im/image/upload/q_70,fl_lossy,dpr_3,c_limit/v200/19e2755d6af020b7d6d1f36fc9a320ab">

