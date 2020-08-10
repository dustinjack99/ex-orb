import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ex-Orb';
  links = [
    { path: '/', icon: 'map', title: 'Map' },
    { path: '/commands', icon: 'home', title: 'Commands' },
    { path: '/holdings', icon: 'view_list', title: 'Holdings' },
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigateByUrl('/login');
  }
}
