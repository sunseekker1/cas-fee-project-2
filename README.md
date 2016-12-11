#CAS FEE Project 2 - A Login Accelerator for Webapplications
by Noel Bellón & Thomas Brandenburger

## 1. Project Description
This project has the purpose to give the users a simple way to login to their favorite webapplications/websites (participant) with their smartphones by scanning a qr-code on the respective websites.

**Features:**
- Hybrid Mobile App
- User backend running in the browser
- Managing accounts
- Autofill Logins by scanning qr-code
- Encrypted client storage of login credentials

**Workflow:**

![Alt text](/Fastlogin.png?raw=true "Fastlogin")

## 2. Technologies
- jQuery
- HTML
- CSS
- SCSS
- TypeScript
- Encryption
- Angular2
- Node.js
- exress
- socket.io
- mongodb
- ionic framework


## 3. Installation
```

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

- Comment source code > Thomas > Noel
- Code formatting > Thomas > Noel
- Update git readme.md


Prio 2

- Refactor CSS Admin UI
- Admin UI Dropdown For Selectable Values
- Admin UI Searchfunction
- Admin UI Input Validation
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

- Konsolidierung verschiedener Node-Module
- Einsatz von Betaversionen Ionic/Angular für Produktion überdenken
- Mehr Zeit für Testing (Unit und EndtoEnd)
- Mehr Zeit für GUI > Zeitaufwändig

**Würden wir anders machen**

- Nodejs
- Angular2
- Ionic > Cordova
- jQuery Plugin implementieren
- Socket Service
- REST API implementieren
- TypeScript
