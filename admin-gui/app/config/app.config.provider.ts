import { Injectable } from '@angular/core';


/*
 Stores APP related data
 */
@Injectable()
export class AppConfigProvider {
    public appLang = 'de';
    public restApiEndpoints = {
        accesses: 'http://localhost:8080/api/accesses',
        admins: 'http://localhost:8080/api/admins',
        clients: 'http://localhost:8080/api/clients',
        sites: 'http://localhost:8080/api/sites'
    };

    constructor() {
    }
}
