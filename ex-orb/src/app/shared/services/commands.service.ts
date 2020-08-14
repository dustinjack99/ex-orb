import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  private commands = [
    { title: 'Scan', flavor: 'Scanning Planet Resources...' },
    { title: 'Explore', flavor: 'Probing Star System...' },
    { title: 'Parlay', flavor: 'Send Envoys to Planet Leadership...' },
    { title: 'Supply', flavor: 'Sending trade ships to surface...' },
    { title: 'Harvest', flavor: 'Harvesting biomass and precious metals...' },
    { title: 'Conquer', flavor: 'War has come to ${planet name}' },
    { title: 'Tech Card', flavor: 'THIS WILL PULL UP TECH CARD HAND' },
  ];

  constructor() {}

  all() {
    return this.commands;
  }
}
