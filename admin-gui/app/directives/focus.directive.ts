import {Directive, Input, ElementRef, SimpleChanges}      from '@angular/core';


@Directive({
    selector: '[hasFocus]'
})
export class FocusDirective
{
    @Input("hasFocus") hasFocus: boolean;
    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit()
    {
        if (this.hasFocus)
        {
            this.elementRef.nativeElement.focus();
        }
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes["hasFocus"] && changes["hasFocus"].currentValue === true)
        {
            this.elementRef.nativeElement.focus();
        }
    }
}