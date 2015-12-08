Authenticator = {};

/**
 * @param label The label which to display in the user's Google Authenticator's app.
 * @return result object containing both a Google Authentication Code (result.key) and a qr code image of the key (result.uri)
 **/
Authenticator.getAuthCode = function(label, issuer) {
    var label = encodeURIComponent(label) || '';
    var issuer = encodeURIComponent(issuer) || '';
    var base32 = Npm.require('thirty-two');

    var secret = Authenticator.createSecret();
    var encoded = base32.encode(secret);

    var encodedForGoogle = encoded.toString().replace(/=/g, '');

    var uri = 'otpauth://totp/' + label + '?secret=' + encodedForGoogle + '&issuer=' + issuer;

    var result = {
        'uri': uri,
        'key': secret
    };
    return result;
}

/**
 * @param token 6 digit token
 * @param key Initialization key
 * @return Boolean, whether the code is verified or not
 **/
Authenticator.verifyAuthCode = function(token, key) {
    var otp = Npm.require('notp');

    var verified = otp.totp.verify(token, key);

    if (!verified) {
        throw new Meteor.Error(406, 'Security code is invalid');
    }
    return verified;
}

/**
 * @return String used for authentication code
 **/
Authenticator.createSecret = function() {
    var text = "";
    var secretChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++) {
        text += secretChars.charAt(Math.floor(Math.random() * secretChars.length));
    }

    return text;
}
