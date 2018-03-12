# Importing Livefyre Comments into Spot.IM

This document outlines the process Spot.IM uses to import data from Livefyre. After reading this document, you will have a better understanding of what the import process requires, how it's performed, and how your users can start using Spot.IM once the import is complete.


## The Import Process

The import process consists of three steps:

1. Spot.IM Conversations are associated with a Livefyre comment thread
2. Spot.IM downloads Livefyre comments for each Conversation
3. Users that log in via SSO are automatically registered in Spot.IM and gain access to their old comments

At the end of this process, your users can begin commenting using Spot.IM.

## Linking Spot.IM Conversations to Livefyre Threads

The first step is identifying which Livefyre comments get imported into which Spot.IM Conversation. Each Livefyre comment thread is identified by a unique `articleId`, which associates the thread to an article or page on your website. This is similar to the `postId` used to identify Spot.IM Conversations. Spot.IM uses the `articleId` and `postId` to determine which Spot.IM Conversation to import a Livefyre thread to. This ensures that all comments belonging to a single Livefyre thread are linked to the same Spot.IM Conversation. This also allows Spot.IM to import a single comment thread at a time, which is explained in more detail in the next section.


## Importing Comments into Spot.IM

Spot.IM provides two approaches to importing comments: a gradual import approach, and a bulk import approach. While the gradual import approach is recommended, the bulk import approach offers an alternative in case the first approach results in discrepancies. The benefits of each approach are listed below.

### Gradual Import
The gradual import approach imports a Livefyre comment thread when users load ("hit") an article with a  Spot.IM Conversation. The Conversation's HTML script block contains an import hint, which is an attribute containing the `articleId` of the associated Livefyre comment thread (`data-livefyre-url` attribute gets added to the Conversation `<script>` when Spot.IM is enabled on your site). When the user loads the Conversation, the import hint notifies the Spot.IM backend service to import comments for that particular article by calling the Livefyre API. This process only occurs on the first load of each article. Subsequent loads won't trigger another import.

Spot.IM only imports a comment thread when at least one user loads the article, but the process remains transparent to the user. In addition, this lets you spread out the import process over time. However, this approach doesn't guarantee that all of your comments will be imported. If an article receives no hits during the import period, then its Livefyre comments won't be imported.

The import process also overwrites the existing Conversation. If an article hit triggers an import and a comment is created before the import process finishes, the comment will be overwritten. In almost all cases, the process is fast enough to prevent this from being a issue.

The benefit of this approach is that it:
* Requires little effort; just add import hints to each Conversation
* Requires no downtime

The downside to this approach is that:
* The import doesn't happen immediately
* Articles that receive no traffic during the import period won't have their comments imported
* There is a small chance of losing new comments during the import

### Bulk import
The second approach imports all Livefyre comment threads at once. Instead of relying on article hits, this approach calls the Livefyre API for each of your articles sequentially. This approach requires a list of each article on your website including its URL, `postId`, and Livefyre `articleId`. It also requires you to disable Livefyre and Spot.IM while it's running. However, it guarantees that all comments will be imported regardless of whether an article page load occurs.

The benefit of this approach is that it:
* Guarantees 100% of your comments will be imported
* Eliminates the chance of losing new comments during the import period

The downside of this approach is that it:
* Requires a full list of all articles with their URLs and Livefyre articleId
* Requires downtime of both Livefyre and Spot.IM (up to few hours) during the import

### Attributing Imported Comments to Registered Users
Spot.IM maintains the association between comments and users. After Spot.IM is live on your site, users who log in via SSO are automatically registered with Spot.IM. Any comments made by the user in Livefyre are linked to their Spot.IM account and the user can continue commenting as normal. When using the gradual import approach, any subsequently imported comments are automatically attributed to the user. For users who haven't logged in yet, their comments will remain visible in any threads they've commented in.

### Completing the Import
At the end of the process, Spot.IM will have imported all of your Livefyre comments and associated them with your articles. Your users will also be able to view and create comments using Spot.IM. At this point you can safely terminate your Livefyre service. You can also remove the import hints from your article pages if you used the gradual import process.
