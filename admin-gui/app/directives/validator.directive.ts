import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function emailValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const name = control.value;
        const no = nameRe.test(name);
        return no ? {'email': {name}} : null;
    };
}

@Directive({
    selector: '[email]',
    providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator, OnChanges {
    @Input() email: string;
    private valFn = Validators.nullValidator;
    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['email'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = emailValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }
    validate(control: AbstractControl): {[key: string]: any} {
        return this.valFn(control);
    }
}

