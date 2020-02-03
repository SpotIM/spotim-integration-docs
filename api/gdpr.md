# GDPR Export Process


To conduct a GDPR export you will need the following information :

1. Spot.IM User ID - Capture the User ID in the admin panel with your email
2. Export Token - Once logged in to your Spot.IM account the export token lives at the bottom of your Settings page 
3. Spot ID - Your Spot ID 

## Capture User ID
First log into the host panel and search for the user you are looking for. 
<img src="https://s3.amazonaws.com/www.spotim.name/rich/Screen+Shot+2020-02-03+at+7.45.13.png">
<br><br>
If the user exists, you will be able to see the user id show up in the url immediately after 'user/'. It will start with 'u_'. Please refer to screenshot below for more clarity. 

<img src="https://s3.amazonaws.com/www.spotim.name/rich/gdpr-ss.png">



## Start Export:

Send a POST request to:

https://open-api.spot.im/gdpr/export

Params:

{ 
    “access_token”: “1234567890” (export token from Admin Panel),  
    “spot_id”: “sp_123”,  
    “user_id”: “u_123” (spotim user_id)
}

Returns:

{“id”: 1234567890}

## Get GDPR User Data Export Status

Send a GET Request to https://open-api.spot.im/gdpr/export/status/{id}?access_token={token}&spot_id={spot-id}

*Replace the information in the curly brackets with the appropriate parameters

Params:

{
    "id": "1234567890" (ID captured from your initial export),  
    "access_token": “1234567890” (export token from Admin Panel),   
    "spot_id": “sp_123”
}

Returns:

{
   “status”: “pending” | “completed” | “failed”
}

*If status is completed, returns “link”: “download.link” as well*

