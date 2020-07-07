import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetMapComponent } from './planet-map.component';

const routes: Routes = [{ path: 'planets', component: PlanetMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetMapRoutingModule {}
