#CAS FEE Project 2 - A Login Accelerator for Webapplications
by Noel Bellón & Thomas Brandenburger

## 1. Project Description
This project has the purpose to give the users a simple way to login to their favorite webapplications/websites (participant) with their smartphones by scanning a qr-code on the respective websites.

**Features:**
- Mobile App
    - Managing accounts
    - Scan QR-Code
    - Encrypted client storage of login credentials
    - Hybrid App Running on Android, iOS and Windows Mobile

- Admin User Interface
    - Administration
    - Dashboard with Overview of Clients, Sites, Accesses
    - Access-Logs
    - Responsive
    - Authentication
    
- Login Showcase
    - Autofill Credentials by Receiving Data from Websocket
    - Providing QR-Code
    
- REST-API
    - Data Persistance with MongoDB
    - Authentication


**Workflow:**

![Alt text](/Fastlogin.png?raw=true "Fastlogin")

## 2. Technologies
- jQuery / jQuery Plugin
- HTML
- CSS
- SCSS
- TypeScript
- Encryption
- Angular2
- Node.js
- Exress
- Socket.io
- MongoDB
- Ionic Framework (Cordova)


## 3. Installation
**Mobile App**
```
$ cd mobile-app
$ npm install
$ ionic serve

*** Gulp Tasks ***
$ gulp watch
$ gulp lint
```
To install the app on the mobile phone copy mobile-app/build/android-debug.apk to you android phone.



**Login Showcase**
```
$ cd login-showcase
$ npm install
$ npm start
open Browser at localhost:3500
```

**REST API - Without Installation Using Hosted MongoDB - RECOMENDED**
```
$ cd rest-api
$ npm install
$ npm start
REST API is listening at localhost:8080
```
Make sure you have uncommented the connection string for hosted mongodb in config.js

To test the REST API you can import the postman collection "/rest-api/_backup/postman-api/collection.json" into your postman app
You have to choose "Basic Auth" and authenticate with user admin/admin

**REST API - With Installation of Local MongoDB**
```
$ cd rest-api
$ npm install
$ npm run mongo-init-win (mongo-init-mac)
$ npm run mongo-import-win (mongo-import-mac)
$ npm start
REST API is listening at localhost:8080
```
Make sure you have installed mongodb on your local machine
Make sure you have uncommented the connection string for local mongodb in config.js

To test the REST API you can import the postman collection "/rest-api/_backup/postman-api/collection.json" into your postman app
You have to choose "Basic Auth" and authenticate with user admin/admin




**Admin UI**
```
$ cd admin-ui
$ npm install
$ npm start
open Browser at localhost:3000
```
Login with the prepared user admin/admin (admin1/admin1, oder admin2/admin2)



**ToDo's:**

Prio 1
- Admin UI Input Validation > Reactive Form Validation in Admin Component not working as expected > Sadly running out of time to implement this to try the template validation in the other components
- Give the User Feedback after all the actions happening on the UI > Sadly running out of time to implement this



Prio 2
- Admin UI Searchfunction
- Refactor CSS Admin UI > Sadly running out of time to implement this
- Admin UI Grafical Display of Accesses > Barchart > Sadly running out of time to implement this
- Gulp Task Build, Minify, compile scss, compress > Sadly running out of time to implement this
- Admin UI Error Handling > Sadly running out of time to implement this
- REST API Error Handling > Sadly running out of time to implement this
- Unit Tests Admin UI > Sadly running out of time to implement this
- Git cleanup and check .gitignore 


Done
- Design Admin UI > Noel > OK
- Login Admin UI (Admin) > Noel
- Admin UI Dropdown For Selectable Values > Noel
- Design Login Showcase > Thomas > OK
- Landing Page Login Showcase > Thomas > OK
- Icon App > Thomas > OK
- Colorize App > Thomas > OK
- Put all CSS declarations in one main CSS File > Noel > OK
- Unit Tests REST API > Thomas > OK
- Admin UI Make it Multilanguage Capable > OK
- Comment source code > Thomas > Noel > OK
- Code formatting > Thomas > Noel > OK
- Update git readme.md > OK
- REST API > npm install > install mongodb if not installed -> fill with testdata > OK
- put configuration values to config file -> hostnames, ports > OK
- quite a lot other stuff....

## 5. Resume

**Besonders gut**
- Aufteilung Workpackages
- Vielfältiger Technologieeinsatz
- Nette Idee -> funktionierender POC


**Würden wir anders machen**
- Einsatz von Betaversionen Ionic/Angular für Produktion überdenken
- Mehr Zeit für Testing (Unit und EndtoEnd)
- Mehr Zeit für GUI > Zeitaufwändig

**Was haben wir gelernt**
- Nodejs
- Angular2
- Ionic > Cordova
- jQuery Plugin implementieren
- Socket Service
- REST API implementieren
- TypeScript
- Gulp
- Testing
- MongoDB
- SCSS
- Verschiedene Formvalidierungsansätze ausprobiert
