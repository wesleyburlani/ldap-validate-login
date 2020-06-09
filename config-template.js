var config = {
    host: "", // hostname to LDAP server, format ldap://<domain>
    user: {
        uid: "", // uid of user on Directory Tree
        passwd:"", // user password
        baseDn: "", // distinguished name(DN) base to prefix on search
    },
    admin: {
        entryDn: "", // entryDN of an Administratir user to search user data
        passwd: "",
    },
}

module.exports = config;