import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutocompleteModule } from '../src';
import { DemoComponent } from './demo.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    AutocompleteModule.forRoot()
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
