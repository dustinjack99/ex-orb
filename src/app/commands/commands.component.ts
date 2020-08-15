import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../shared/services/commands.service';

@Component({
  selector: 'ex-orb-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss'],
})
export class CommandsComponent implements OnInit {
  title = 'Commands';
  currentCommand = null;
  commandList = null;

  constructor(private commandService: CommandsService) {}

  ngOnInit(): void {
    this.commandList = this.commandService.all();
  }

  selectLesson(command) {
    console.log('select fired', command);
    this.currentCommand = command;
  }
}
