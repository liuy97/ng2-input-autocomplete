import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AutocompleteModule } from './index';

import {
  async
} from '@angular/core/testing';

export function main() {

  describe('AutocompleteModule component', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, AutocompleteModule.forRoot()],
        declarations: [TestComponent],
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<input autocomplete [items]="items">'
})

class TestComponent {
  items: any[] = ['a', 'ab'];
}
