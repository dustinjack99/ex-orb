import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetSearchComponent } from './planet-search.component';

const routes: Routes = [{ path: 'planets', component: PlanetSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetSearchRoutingModule {}
