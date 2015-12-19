Package.describe({
    name: 'dyaa:authenticator',
    summary: 'Google authenticator methods for quick integration',
    version: '0.1.0',
    git: 'https://github.com/dyaa/Google-Authenticator'
});

Package.onUse(function(api) {
    Npm.depends({
        'notp': '2.0.3',
        'thirty-two': '0.0.2'
    });

    api.addFiles(['server/authenticator.js'], 'server');
    api.export('Authenticator', 'server');
});
