import { Component } from '@angular/core';
import { MDL } from './material-design-lite-upgrade-element'; // Inofficial Angular Material Design Lite

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
  // directives: [MDL]
})
export class AppComponent {
  title = 'FastLogin';
}
