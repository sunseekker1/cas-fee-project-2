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
- TypeScript
- Encryption
- Angular
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

- Design Admin UI > Noel
- Login Admin UI (Admin) > Noel
- Design Login Showcase > Thomas
- Landing Page Login Showcase > Thomas
- Icon App > Thomas
- Colorize App > Thomas
- Comment source code > Thomas > Noel
- Code formatting > Thomas > Noel
- Update git readme.md
- Alle CSS declarationen in eine Haupt CSS File > Noel

Prio 2

- Admin UI Searchfunction
- Gulp Task Build, Minify, compile scss, compress
- package.json > dev / prod dependencies
- Unit Tests Admin UI
- Unit Tests REST API
- REST API > npm install > install mongodb if not installed -> fill with testdata
- put configuration values to config file -> hostnames, ports
- Git cleanup and check .gitignore


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
