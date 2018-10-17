import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AutocompleteModule } from '../../projects/autocomplete/src/public_api';
import { WikipediaService } from './wiki.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientJsonpModule,
    HttpClientModule,
    AutocompleteModule.forRoot(),
  ],
  providers: [WikipediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
