This project aims to validate an user login using LDAP protocol

### Dependencies ###

* [ldapjs](http://ldapjs.org/) npm package 

### How do I get set up? ###

To run this project locally, first of all you need to clone this repository, the project had the following requirements: 

#### Requirements ####

* npm
* node

#### Configuration ####

You need to confgiure the following environment variables: 

* HOST: hostname to connect to LDAP server, format "ladp://<domain>:<port>"
* USER_BASEDN: base dn of users on your LDAP server 
* ADMIN_ENTRYDN: entry dn of an admin user that can search for other users
* ADMIN_PASSWD: admin password

#### Install Librariess ####

Run the following command:

```
npm install ldapjs
```

### Running Project on AWS ###

after install libraries, zip all files and upload to a lambda function on AWS. Configure environment variables on this function and configure a test event with the structure below:

```json
{ 
    "uid": "", //user uid to validate login
    "passwd": ""
}
```

Its recommended to change lambda execution timeout to at least 10 seconds to get correct bind connection timeout errors.