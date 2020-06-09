var ldap = require('ldapjs');
var config = require('./config');

var client = createClient(config.host);

var userEntryDn = `uid=${config.user.uid},${config.user.baseDn}`;

// connecting to user
client.bind(userEntryDn, config.user.passwd, function (userLoginError) {

    if (userLoginError) {
        return client.unbind(unbindCallback);
    }
    //connecting to admin user to get user information
    client.bind(config.admin.entryDn, config.admin.passwd, function (adminLoginError) {

        if (adminLoginError) {
            return client.unbind(unbindCallback);
        }
        //searching for user information
        client.search(config.user.baseDn, getSearchOptions(config.user.uid), function (error, res) {

            res.on('searchEntry', function (entry) {
                // prints user information
                console.log(JSON.stringify(entry.object, null, 2));
            });
            res.on('end', function (result) {
                client.unbind(unbindCallback);
            });
        });
    })
});


function getSearchOptions(userUid) {
    return {
        filter: `(uid=${userUid})`,
        scope: 'sub',
    };
}

function createClient(host) {
    return ldap.createClient({
        url: host,
        timeout: 5000,
        connectTimeout: 10000
    });
}

function unbindCallback(error) {
    if(error) {
        console.log(error);
    }
}