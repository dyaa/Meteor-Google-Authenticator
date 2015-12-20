## Meteor: Google authenticator methods

This is a server side package only. This package does not store any data in collections. It will only create OTP's (One-time passwords) and verify OTP's.

Two Npm packages are used and included:
- notp@2.0.3
- thirty-two@0.0.2

## Usage (3 steps)

Step 0: Install The Package

```sh
meteor add dyaa:authenticator
```

Step 1: Setup your server methods.

### Server
```javascript
Meteor.methods({
    getOtp: function() {
        var label = 'domain.com';
        var issuer = 'Domain';
        return Authenticator.getAuthCode(label, issuer);
    },
    verifyOtp: function(token, key) {
        return Authenticator.verifyAuthCode(token, key);
    }
});
```
#### Difference between Label and Issuer
![Imgur](http://i.imgur.com/Zzj43fn.jpg)

### Client
Step 2: Setup your HTML

```html
<div id="key"></div>
<form>
    <div id="qrcode"></div>
    <input type="text" id="token" required>
    <button type="submit"></button>
</form>
```

Step 3: Setup your Javascript

You can get a new OTP through a Meteor Call. Here is an example with a button with the id 'getOtp':

```javascript
'click #getOtp': function(event) {
    event.preventDefault();

    Meteor.call('getOtp', function(error, result) {
        if (!error) {
            $('#key').text(result.key);
            //Additionally display the qrcode with the steeve:jquery-qrcode package!
            $('#qrcode').html('');
            jQuery('#qrcode').qrcode({
                text: result.uri,
                width: 250,
                height: 250
            });
        }
    });
}
```

To verify the OTP, simply call the verifyOtp method:

```javascript
var token = $('#token').val();
var key = $('#key').text();
Meteor.call('verifyOtp', token, key, function(error, result) {
    if (error) {
        alert(error.reason);
    } else {
        alert("Authentication succesfull.");
    }
});
```

#### License

Copyright (c) 2016 [Dyaa Eldin Moustafa][1] Licensed under the [MIT license][2].


  [1]: https://dyaa.me/
  [2]: https://github.com/dyaa/Meteor-Google-Authenticator/blob/master/LICENSE
