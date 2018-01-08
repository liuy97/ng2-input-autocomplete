import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { AutocompleteComponent } from '../src/ng2-input-autocomplete';
import { AutocompleteModule } from '../src';

describe('AutocompleteComponent', () => {
  let comp: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutocompleteModule.forRoot()]
    });
  });

  it('should autocomplete', () => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    comp = fixture.componentInstance;
  });
});
