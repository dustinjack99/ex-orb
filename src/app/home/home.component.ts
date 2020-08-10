import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Commands';
  currentCommand = null;
  commandList = [
    { title: 'Scan', flavor: 'Scanning Planet Resources...' },
    { title: 'Explore', flavor: 'Probing Star System...' },
    { title: 'Parlay', flavor: 'Send Envoys to Planet Leadership...' },
    { title: 'Supply', flavor: 'Sending trade ships to surface...' },
    { title: 'Harvest', flavor: 'Harvesting biomass and precious metals...' },
    { title: 'Conquer', flavor: 'War has come to ${planet name}' },
    { title: 'Tech Card', flavor: 'THIS WILL PULL UP TECH CARD HAND' },
  ];

  constructor() {}

  ngOnInit(): void {}

  selectLesson(command) {
    console.log('select fired', command);
    this.currentCommand = command;
  }
}
