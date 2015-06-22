## Meteor: Google authenticator methods

This package uses 2 Npm packages: notp@2.0.3 and thirty-two@0.0.2

## Usage

Client
```javascript
var label = 'domain.com';

Meteor.call('getOtp', label, function(error, result) {
    if (!error) {
        $('#qrcode').html('');
        jQuery('#qrcode').qrcode({
            text: result.uri,
            width: 250,
            height: 250
        });
        $('#key').text(result.secret);
        $this.hide();
        $('form').removeClass('hidden');
    }
});

Meteor.call('verifyOtp', token, key, function(error, result) {
    if (error) {
        sweetAlert("Something went wrong!", error.reason, "error");
    } else {
        sweetAlert("Success!", "Authentication succesfull.", "success");
    }
});
```

Server
```javascript
Meteor.methods({
    getOtp: function(label) {
        return Authenticator.getAuthCode(label);
    },
    verifyOtp: function(token, key) {
        return Authenticator.verifyAuthCode(token, key);
    }
});
```