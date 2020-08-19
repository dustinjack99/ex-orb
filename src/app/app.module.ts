import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { PlanetsService } from './shared/services/planets.service';
import { CommandsService } from './shared/services/commands.service';
import { MapService } from './shared/services/map.service';
import { CommandsComponent } from './commands/commands.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { MapComponent, FilterPipe } from './map/map.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [
    FilterPipe,
    AppComponent,
    CommandsComponent,
    HoldingsComponent,
    MapComponent,
  ],
  providers: [PlanetsService, CommandsService, MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
