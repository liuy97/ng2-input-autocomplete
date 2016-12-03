import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';

import { AppComponent }  from './app.component';
import { AutocompleteModule } from './autocomplete/ng2-input-autocomplete';

@NgModule({
  imports:      [ BrowserModule, AutocompleteModule.forRoot(), FormsModule,
    HttpModule, JsonpModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
