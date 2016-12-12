import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shortId'})
export class ShortIdPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }

        var transformedText = value.substring(21, 25);

        return transformedText;
    }
}
