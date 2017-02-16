import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WikipediaService } from '../shared/wikipedia.service';
import { AutocompleteModule } from '../library/ng2-input-autocomplete';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, AutocompleteModule.forRoot()],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [WikipediaService]
})
export class HomeModule { }
