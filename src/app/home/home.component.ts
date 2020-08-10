import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../shared/services/commands.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
