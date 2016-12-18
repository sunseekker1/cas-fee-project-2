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

**REST API**
Make sure you have installed mongodb on your local machine
On Windows you need to modify the installation location of the mongodb bin directory in the package.json install script to fetch your installation 
```
$ cd rest-api
$ npm install
$ npm run mongo-init-win (mongo-init-mac)
$ npm run mongo-import-win (mongo-import-mac)
$ npm start
REST API is listening at localhost:8080
```
To test the REST API you can import the postman collection "/rest-api/_backup/postman-api/collection.json" into your postman app
You have to choose "Basic Auth" and authenticate with user admin/admin

**Admin UI**
```
$ cd admin-ui
$ npm install
$ npm start
open Browser at localhost:3000
```
Login with the prepared user admin/admin



**ToDo's:**

Prio 1

- Admin UI Input Validation
- Refactor CSS Admin UI
- Comment source code > Thomas > Noel
- Code formatting > Thomas > Noel
- Update git readme.md


Prio 2
- Admin UI Searchfunction
- Admin UI Grafical Display of Accesses > Timeline
- Gulp Task Build, Minify, compile scss, compress
- package.json > dev / prod dependencies
- Admin UI Error Handling
- REST API Error Handling
- Unit Tests Admin UI
- REST API > npm install > install mongodb if not installed -> fill with testdata
- put configuration values to config file -> hostnames, ports
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


## 5. Resume

**Besonders gut**
- Aufteilung Workpackages
- Vielfältiger Technologieeinsatz
- Gute Idee -> funktionierender POC


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
