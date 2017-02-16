import { HomeComponent } from './home.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AutocompleteModule } from '../library/ng2-input-autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { WikipediaService } from '../shared/wikipedia.service';
export function main() {
  describe('HomeComponent', function () {
    let de: DebugElement;
    let inputsEl: any;
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, AutocompleteModule.forRoot(), HttpModule, JsonpModule],
        declarations: [HomeComponent],
        providers: [WikipediaService]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('h1'));
      inputsEl = fixture.debugElement.queryAll(By.css('input[autocomplete]'));
      fixture.detectChanges();
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should have expected <h1> text', () => {
      const h1 = de.nativeElement;
      expect(h1.innerText).toMatch(/autocomplete/i,
        '<h1> should say something about "autocomplete"');
    });

    it('should have inputs with autocomplete', () => {
      expect(inputsEl.length).toBe(3);
    });

  });
}
