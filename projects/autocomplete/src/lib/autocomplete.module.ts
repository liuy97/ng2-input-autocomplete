import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent, AutocompleteDirective } from './autocomplete.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AutocompleteComponent, AutocompleteDirective],
  exports: [AutocompleteComponent, AutocompleteDirective],
  entryComponents: [AutocompleteComponent]
})
export class AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AutocompleteModule
    };
  }
}

