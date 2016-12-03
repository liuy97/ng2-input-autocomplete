import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AutocompleteModule } from './autocomplete/ng2-input-autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule }  from '@angular/http';

describe('AppComponent', function () {
  let de: DebugElement;
  let inputsEl: any;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AutocompleteModule.forRoot(), HttpModule, JsonpModule],
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    inputsEl  = fixture.debugElement.queryAll(By.css('input[autocomplete]'));
    fixture.detectChanges();
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h1> text', () => {
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/autocomplete/i,
      '<h1> should say something about "autocomplete"');
  });

  it('should have inputs with autocomplete', () => {
    expect(inputsEl.length).toBe(3);
  });

});
