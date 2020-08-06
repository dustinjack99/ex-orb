import { Component } from '@angular/core';

@Component({
  selector: 'ex-orb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ExOrb';

  links = [
    { path: '/', icon: 'home', title: 'Home' },
    { path: '/planets', icon: 'brightness_low', title: 'Planets' },
  ];
}
