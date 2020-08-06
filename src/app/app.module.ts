import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { MaterialModule } from '../../../../libs/material/src/index';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { PlanetMapModule } from './planet-map/planet-map.module';
import { AppRoutingModule } from './app-routing.module';
import { UlLoginModule } from '@ex-orb/ul-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    HomeModule,
    PlanetMapModule,
    UlLoginModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
