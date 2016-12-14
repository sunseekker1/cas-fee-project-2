import {beforeEachProviders, it, describe, expect, inject, TestComponentBuilder, beforeEach, setBaseTestProviders} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {NavController, Platform} from 'ionic-angular';
import {AppDataProvider} from '../../providers/app.data.provider';
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);


describe('Testing methods', () => {

    beforeEachProviders(() => [HomeComponent,
        {provide: NavController, useValue: {}},
        {provide: AppDataProvider, useValue: {}},
        {provide: Platform, useValue: {}}
    ]);

    it('check if qrdata is instantiated', inject([HomeComponent], (HomeComponent) => {

            let result = HomeComponent.qrData;
            expect(result).toBeDefined();

        }
    ));

});

describe('Checking several DOM Elements', () => {
    let tcb;

    //setup
    beforeEachProviders(() => [
        TestComponentBuilder,
        HomeComponent,
        {provide: NavController, useValue: {}},
        {provide: AppDataProvider, useValue: {}},
        {provide: Platform, useValue: {}}
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    //specs
    it('check if scan button exists', done => {
        tcb.createAsync(HomeComponent).then(fixture => {
            let element = fixture.nativeElement;
            fixture.detectChanges(); //trigger change detection

            //expect(element.querySelector('#scanButton').innerText).toBe('test');
            expect(element.querySelector('#scanButton')  === null ).toBe(false);
            done();

        });
    });
});