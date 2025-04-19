import { AgGridModule } from 'ag-grid-angular'; // or 'ag-grid-community' in older versions
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';

//ModuleRegistry.registerModules(AllModules); // Register all modules (easy fix for dev)

@NgModule({
  declarations: [],
  imports: [
    BrowserModule, AppComponent, AppRoutingModule,
    AgGridModule
  ],
  bootstrap: [],
  exports: [AppComponent]
})
export class AppModule { }
