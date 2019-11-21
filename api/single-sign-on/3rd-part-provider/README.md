
# Spot.IM Integration with 3rd party SSO provider


SpotIM enables partner user to utilize partner's 3rd party SSO provider to auto-login to Spot.IM when he's logged into the Partner's site.
To accomplish this, the partner needs to provider SpotIM API spec of the SSO provider in advance to allow such custom integration.

The technical flow, once the custom integration is in place, is as follows:

1.  Partner asks Spot.IM to start an SSO session using 3rd party SSO Provider's name, and access token of the 3rd party provider.

2. Spot.IM turns to 3rd party SSO provider to get user's details using the access token recieved

3. Spot.IM logs the user in (registers it too if needed)

4. Spot.IM acknowledges the success by providing the success codeB

5. Spot.IM FED logs in the user and displays his avatar as logged in

## Frontend Login integration
This code sample corresponds to the steps given above:
```javascript
if (window.SPOTIM && window.SPOTIM.startSSOForProvider) {
  startSSO();
} else {
  document.addEventListener('spot-im-api-ready', startSSO, false);
}
function startSSO(){
  window.SPOTIM.startSSOForProvider({ provider: 'PROVIDER-NAME-FROM-SPOTIM', token: token }).then(function(userData) {
    // userData contains information about the logged in user
  })
  .catch(function(reason){
    // reason contains error details
  });
}
```
## SSO Provider Integration
The Partner's 3rd Party SSO provider is responsible to validate partner's user access token and return SpotIM the correct
up-to-date user informtion.


## Frontend Logout Integration

To ensure state consistency between Spot.IM and the Partner it is required that the Partner informs Spot.IM whenever the user logs out.

The logout action is performed from the Front End by calling  `window.SPOTIM.logout()`

```javascript
if(window.SPOTIM && window.SPOTIM.logout){
    window.SPOTIM.logout();
} else {
    document.addEventListener('spot-im-api-ready', function() { window.SPOTIM.logout(); }, false);
}
```

## Integration for "Require Login" moderation policy

Spot.IM allows moderators to activate a moderation policy which requires users to be logged in before writing comments.
Usually the user is prompted with a Spot.IM login dialog when this policy is active.

With SSO, Spot.IM login UI never activated, and the login process needs to be initialized by the publisher.

The publisher is notified with an event when the user attempts to send his message.


**Example**
```javascript
document.addEventListener('spot-im-login-start', function(event) {
    // trigger your login flow here
});
```
### Piano Integration
In order to integrate Piano with Spot.IM, Spot.IM first needs to validate that the piano integration works. Afterwords, we will attach a configuration to the Spot ID.

Configuration Validation is done to ensure that all the details are working properly and that the provider api returns the necessary data that we need in order to successfully run SSO. Unlike normal SSO integrations, SSO by provider is entirely controlled by Spot.IM. The steps below detail the process

1. Obtain all of the necessary configuration details, along with a sample token
2. One of our backend devs runs the exact function that runs in production, just to validate that we get the user details correctly
3. If everything runs correctly, Spot.IM will set the configuration and publisher can continue their SSO implementation. Otherwise, Spot.IM will determine if the issue lies in the configuration or something else. 

#### Data That Needs to Be Provided
* App Id
* Api Token
* Private Key
* Public Key (JWT Shared Secret / JWT Verification Shared Secret / JWT Encryption Key) - Used to in order to decode and validate the JWT token that the publisher passes to Spot.IM so we can securely extract the UID and query the Piano API. Please see the following links for additional information.
  * https://docs.piano.io/piano-id-overview/#sharedsecret
  * https://docs.piano.io/how-to-integrate-piano-id-with-commenting-apps?paragraphId=af369fbee39ad11

* User Token 
  * Can be found here: https://docs.piano.io/how-to-integrate-piano-id-with-commenting-apps/
