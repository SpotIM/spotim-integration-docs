# Spot.IM SEO

Spot.IM SEO service aims to allow Google to index the comments and ratings data collected by Spot.IM and associate it with the Partner site.

Working with this API requires basic knowledge with Schema.org and specifically with its CreativeWork specification, as Spot.IM will return data in that format.



## Frontend SEO Integration
To enable this feature, all publisher needs to do is to add the attribute `data-seo-enabled="true"` to the Spot.IM embed code.
This will cause Spot.IM to perform the following endpoint call, and embed the returned data in the partner's HTML:
`https://seo.spot.im/v2/<schema-name>/<spot-id>/<post-id>?json=<true/false>`

| Parameter 	| Description 	| Example 	|
|----------------------------------	|--------------	|-----------------------------------------------------------------	|
| `schema-name`   | Type of SEO object to be created in a [kebab-case](http://wiki.c2.com/?KebabCase)  | [article](https://schema.org/Article), [recipe](https://schema.org/Recipe), [video-object](https://schema.org/VideoObject), etc. Valid values can be seen [here](https://schema.org/CreativeWork).   |
| `spot-id`  | `Partner spot ID`  | `sp_f349fhuw`  |
| `post-id`  | `Article post ID`  | `38476f`  |
| `json`  | Set this to true to return json data instead of a json+ld script snippet.  | true/false  |

The publisher may optionally add a JSON body to enrich the SEO data to be returned.

**Example Body**
```json
{"author": {"@type":"Person", "name":"Carol Smith"}}
```

**CURL Example**

```curl
curl -X POST -H "Content-Type: application/json" -d '{"author": {"@type":"Person", "name":"Carol Smith"}}' "https://seo.spot.im/v2/article/sp_6DT3fV0O/349395"
```

**Output**
```json
{
  "@context": "http://schema.org/",
  "@type": "Article",
  "image": {
    "@context": "http://schema.org/",
    "@type": "ImageObject",
    "width": "undefined",
    "height": "undefined"
  },
  "aggregateRating": {
    "@context": "http://schema.org/",
    "@type": "AggregateRating",
    "ratingValue": 4,
    "reviewCount": 1,
    "worstRating": 1,
    "bestRating": 5
  },
  "review": [
    {
      "@context": "http://schema.org/",
      "@type": "Review",
      "datePublished": "2016-12-28",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "michael681"
      },
      "reviewBody": "Amazing piece!",
      "reviewRating": {
        "@type": "Rating",
        "bestRating": 5,
        "worstRating": 1,
        "ratingValue": 4
      }
    }
  ],
  "comment": [
    {
      "@context": "http://schema.org/",
      "@type": "Comment",
      "datePublished": "2016-12-28",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "andreson681"
      },
      "downvoteCount": 0,
      "upvoteCount": 1,
      "text": "test"
    },
    {
      "@context": "http://schema.org/",
      "@type": "Comment",
      "datePublished": "2017-11-04",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "Sam-Gengy-260"
      },
      "downvoteCount": 0,
      "upvoteCount": 0,
      "text": "yyrtyr"
    },
    {
      "@context": "http://schema.org/",
      "@type": "Comment",
      "datePublished": "2017-02-09",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "qa-mooo-550"
      },
      "downvoteCount": 0,
      "upvoteCount": 0,
      "text": "plt-9224"
    },
    {
      "@context": "http://schema.org/",
      "@type": "Comment",
      "datePublished": "2016-11-04",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "Dave-Sadansky-260"
      },
      "downvoteCount": 0,
      "upvoteCount": 0,
      "text": "rerewrwerwe"
    },
    {
      "@context": "http://schema.org/",
      "@type": "Comment",
      "datePublished": "2016-11-04",
      "author": {
        "@context": "http://schema.org/",
        "@type": "Person",
        "name": "Dave-Sadansky-260"
      },
      "downvoteCount": 0,
      "upvoteCount": 0,
      "text": "utyutyutyuty"
    }
  ],
  "author": {
    "@type": "Person",
    "name": "Carol Smith"
  }
}
```

## Backend SEO Integration

Integrating the comments SEO can be done by backend integration. During the render of a page, the backend should call Spot.IM SEO Service, receive SEO markup and append it to the bottom of the page.

Calling Spot.IM SEO Service is done by sending a POST request to:

`https://seo.spot.im/v2/comment/:spotId/:postId`

(Don't forget to set your `spotId` and the current `postId`)

As a response you'll get a markup that holds SEO information for Google and other search engines. This markup implements JSON-LD based on the [schema.org](http://schema.org/) protocol. Appending this markup to the page let search engines to index the page.

When done, you can verify the integration using [Google's Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool) both by url (if your url is accessible by the world) or by pasting an html.

For Live blog:
Calling Spot.IM SEO Service is done by sending a POST request to:

'https://seo.spot.im/v2/article/live-blog/:spotId/:eventId?json=true'

(Don't forget to set your `spotId` and the current `eventId`)
Also please send Headers: Origin, Referer
