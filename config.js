var config = {
    host: process.env.HOST,
    user: {
        baseDn: process.env.USER_BASEDN,
    },
    admin: {
        entryDn: process.env.ADMIN_ENTRYDN,
        passwd: process.env.ADMIN_PASSWD,
    },
}

module.exports = config;