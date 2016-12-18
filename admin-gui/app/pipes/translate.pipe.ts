/*
 * Pipe to execute the translations of the language specific terms on the page
 * */

import { Pipe, PipeTransform } from '@angular/core';
import { LANG_TRANSLATIONS_DE } from '../translation/lang-de';
import {LANG_TRANSLATIONS_EN} from '../translation/lang-en';
import {AppConfigProvider} from '../config/app.config.provider';


const dictionary = {
    ["de"]: LANG_TRANSLATIONS_DE,
    ["en"]: LANG_TRANSLATIONS_EN
};

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {

    constructor(private appConfig:AppConfigProvider) {
    }

    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }

        return dictionary[this.appConfig.appLang][value];
    }
}