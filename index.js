var ldap = require('ldapjs');
var config = require('./config');

exports.handler = async function (event, context, callback) {

    console.log("\nEVENT: \n\n" + JSON.stringify(event, null, 2))

    var uid = event.uid;
    var passwd = event.passwd.toUpperCase();

    var client = createClient(config.host);

    var userEntryDn = `uid=${uid},${config.user.baseDn}`;

    var userInfo = {};

    // connecting to user
    client.bind(userEntryDn, passwd, function (userLoginError) {

        if (userLoginError) {
            callback("There was a problem validating login, it could be VPN connection or invalid credentials");
            return client.unbind(unbindCallback);
        }
        //connecting to admin user to get user information
        client.bind(config.admin.entryDn, config.admin.passwd, function (adminLoginError) {

            if (adminLoginError) {
                callback("invalid admin login");
                return client.unbind(unbindCallback);
            }
            //searching for user information
            client.search(config.user.baseDn, getSearchOptions(uid), function (error, res) {

                res.on('searchEntry', function (entry) {
                    // prints user information
                    userInfo = entry.object;
                });
                res.on('end', function (result) {
                    client.unbind(unbindCallback);
                });
            });
        })
    });

    callback(undefined, userInfo);

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
        if (error) {
            console.log(error);
        }
    }
}