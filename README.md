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
Mobile App
```
cd mobile-app
npm install
```

## 4. API

***Installation:***
- install mongodb
- cd rest-api
- npm install
- npm run init-mongodb
- npm start


**Testing the APi:**
- import the API calls from ./export/postman-api-collection/postman.json collection to your postman application
- start calling the rest services with basic authentication admin1/admin1 (make shure there is an admin admin1/admin1 stored in the database collection admins)


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
- Admin UI Make it Multilanguage Capable
- Admin UI Move canActivate() Method to loginComponent
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
