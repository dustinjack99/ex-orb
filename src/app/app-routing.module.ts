import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands/commands.component';
import { HoldingsComponent } from './holdings/holdings.component';

const routes: Routes = [
  { path: 'commands', component: CommandsComponent },
  { path: 'holdings', component: HoldingsComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
