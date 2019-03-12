# Open API Integration to Spot.IM


Our Open API allows publishers to build their own backup of SpotIM's comments data, for their internal use.

## Export to CSV

You can trigger the export of your comments to CSV using the following endpoint:

```
POST https://open-api.spot.im/v1/comments/export

Header: Content-Type:application/json

Body:
{
"spot_id": "SPOT_ID",
"token": "EXPORT_TOKEN",
"since": "TIMESTAMP"
}
```
SPOT_ID - Your Spot ID. 
EXPORT_TOKEN - Export secret token obtained from Spot.IM, and available on your Admin Panel
TIMESTAMP - for example, 2018-12-01T00:00:0

In Response, you will get a GUID as your export identifier. Response Body for example, 
```
{
    "export_id": "5f04a976-049e-41e4-aeea-03df2ddc9a48"
}
```


With the export identifier, you could track the status of the export process on the following endpoint:

```
GET https://open-api.spot.im/v1/comments/EXPORT_ID/status?token=EXPORT_TOKEN&spot_id=SPOT_ID
```

In response, you will get the following response:
```
{
    "status": "Processing"
}
```
The above message appears while the request is being processed and export URLs are being generated.
Once done, a response as described below, is presented:
```
{
    "status": "Done",
    "export_urls": [<SECURED-URLS>],
    "count": 0
}
```
The response above provides links to the GZIP version of the CSVs. These links will be available for a week.
