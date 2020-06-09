This project aims to validate an user login using LDAP protocol

### Dependencies ###

* [ldapjs](http://ldapjs.org/) npm package 

### How do I get set up? ###

To run this project locally, first of all you need to clone this repository, the project had the following requirements: 

#### Requirements ####

* npm
* node

#### Configuration ####

The repository has a file named `config-template.js`, copy it, rename to `config.js` and fill with your environment data.

#### Install Librariess ####

Run the following command:

```
npm install ldapjs
```

### Running Project Locally ###

After install libraries and configure your `config.js` file, run the following command:

```
node index.js
```