import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AutocompleteModule } from './library/ng2-input-autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';

import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
export function main() {
  describe('AppComponent', function () {
    let de: DebugElement;
    let inputsEl: any;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
      let config: Route[] = [
        { path: '', component: HomeComponent }
      ];
      TestBed.configureTestingModule({
        imports: [FormsModule, AutocompleteModule.forRoot(),
          , RouterTestingModule.withRoutes(config), HttpModule, JsonpModule],
        declarations: [AppComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('h1'));
      inputsEl = fixture.debugElement.queryAll(By.css('input[autocomplete]'));
      fixture.detectChanges();
    });

  });
}
