import { LoginComponent } from '@ex-orb/ul-login';
// import { PlanetSearchComponent } from './planet-search/planet-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  {
    path: 'planets',
    loadChildren: './planet-search/planet-search.module@PlanetSearchModule',
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
