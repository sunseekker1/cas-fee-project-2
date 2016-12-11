import {Component} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'your-dialog-selector',
    template: `
  <h2>Hi! I am modal dialog!</h2>
  <button md-raised-button (click)="dialogRef.close(true)">Close dialog TRUE</button>
<button md-raised-button (click)="dialogRef.close(false)">Close dialog FALSE</button>`
})
export class DialogComponent {
    constructor(public dialogRef: MdDialogRef<any>) { }
}