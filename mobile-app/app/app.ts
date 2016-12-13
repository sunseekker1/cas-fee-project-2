import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, Nav, NavController, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {AccountsListComponent} from './pages/accounts/accounts.list.component';
import {HomeComponent} from './pages/home/home.component';
import {AppDataProvider} from './providers/app.data.provider';
import {MasterPasswordPage} from './pages/shared/masterpassword.component';

@Component({
    templateUrl: 'build/app.html',
    providers: [AppDataProvider]
})

class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomeComponent;
    pages: Array<{title: string, component: any}>;
    private navCtrl:NavController;

    constructor(
            public platform: Platform,
            private appDataProvider:AppDataProvider,
            private menuCtrl:MenuController
        ) {
        this.initializeApp();

        this.pages = [
            {title: 'Dashboard', component: HomeComponent},
            {title: 'Accounts', component: AccountsListComponent},
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            StatusBar.styleDefault();
        });

    }

    logout() {
        this.appDataProvider.logout();
        this.nav.push(MasterPasswordPage);
        this.menuCtrl.close();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        this.nav.setRoot(page.component);
    }
}

ionicBootstrap(MyApp, [AppDataProvider]);
