import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AutocompleteModule } from '../../projects/autocomplete/src/public_api';
import { WikipediaService } from './wiki.service';
import { JsonpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    AutocompleteModule.forRoot(),
  ],
  providers: [WikipediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
