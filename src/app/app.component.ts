import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ex-Orb';
  links = [
    { path: '/commands', icon: 'home', title: 'Commands' },
    { path: '/holdings', icon: 'view_list', title: 'Holdings' },
  ];

  constructor() {}
}
