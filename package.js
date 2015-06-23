Package.describe({
    name: 'fullhdpixel:authenticator',
    summary: 'Google authenticator methods for quick integration',
    version: '0.1.1',
    git: 'https://github.com/fullhdpixel/Google-Authenticator'
});

Package.onUse(function(api) {
    Npm.depends({
        'notp': '2.0.3',
        'thirty-two': '0.0.2'
    });

    api.addFiles(['server/authenticator.js'], 'server');
    api.export('Authenticator', 'server');
});
