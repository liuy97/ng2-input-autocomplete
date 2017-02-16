/*
  MIT LICENSE @liuy97
*/
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  ModuleWithProviders,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewContainerRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ng2-input-autocomplete',
  template: `
  <div class="autocomplete">
    <input type="text"
      placeholder="{{placeholder}}"
      (blur)="showAutoComplete = false;"
      (focus)="showAutoComplete = true;"
      [value]="value"
      (keyup)="enterText($event)">
    <ul *ngIf="showAutoComplete && candidates.length > 0">
      <li *ngFor="let candidate of candidates; let idx = index"
        [ngClass]="{ active: (idx === selectedIndex) }"
        (mouseover)="selectedIndex = idx;"
        (mousedown)="onSelect(idx)">
        {{candiatesLabels[idx]}}
      </li>
    </ul>
  </div>`,
  styles: [
    `.autocomplete ul {
       position: absolute;
       left: 0;
       width: 100%;
       border-left: 1px solid #888;
       border-right: 1px solid #888;
       border-bottom: 1px solid #888;
       list-style: none;
       padding-left: 0px;
       margin-top: 2px;
       background-color: #fff;
       z-index: 100;
     }
     .autocomplete li {
       text-align: left;
       list-style: none;
       width: 100%;
       padding: 0.4em 0 0.4em 0;
     }
     .autocomplete li.active {
       width: 100%;
       background-color: #4bf;
     }

     .autocomplete .highlight {
       background-color: #e2e2e2;
     }
     .autocomplete li.active .highlight {
       background: #666;
       color: #fff;
     }`
  ],
})

export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() items:  any[];
  @Input() config: any;
  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChangedEvent: EventEmitter<any> = new EventEmitter<any>();
  inputElement: HTMLInputElement;
  value: string;
  candidates: any[];
  candiatesLabels: any[];
  selectedIndex: number;
  showAutoComplete: boolean;
  placeholder: string;
  private sourceField: any;
  private thisElement: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.thisElement = elementRef.nativeElement;
    this.selectedIndex = 0;
    this.showAutoComplete = false;
    this.value = '';
  }

  ngOnInit() {
    this.placeholder = 'autocomplete';
    this.inputElement = <HTMLInputElement>(this.thisElement.querySelector('input'));

    if(!this.isNull(this.config)) {
      if(!this.isNull(this.config.placeholder)) {
        this.placeholder = this.config.placeholder;
      }
      if(!this.isNull(this.config.sourceField)) {
        this.sourceField = this.config.sourceField;
      }
    }
    this.filterItems(this.value);
    this.inputElement.focus();
  }

  ngOnChanges() {
    this.filterItems(this.value);
  }

  enterText(event: any) {
    let total = this.candidates.length;
    switch (event.keyCode) {
      case 27:
        this.showAutoComplete = false;
        break;
      case 38:
        this.selectedIndex = (total + this.selectedIndex - 1) % total;
        break;
      case 40:
        this.selectedIndex = (total + this.selectedIndex + 1) % total;
        break;
      case 13:
        if (this.candidates.length > 0) {
          this.onSelect(this.selectedIndex);
        }
        event.preventDefault();
        break;
      default:
        this.value = event.target.value;
        this.inputChangedEvent.emit(this.value);
        break;
    }
  }

  onSelect(idx: number) {
    this.showAutoComplete = false;
    this.value = this.candiatesLabels[idx];
    this.selectEvent.emit(this.candidates[idx]);
  }

  filterItems(search: string) {
    let field = this.sourceField;
    let filterItem = this.filterItem;
    if (this.items) {
      this.candidates = this.items.filter(
        function (item) {
          return filterItem(item, field, search);
        });
      this.buildLabels();
    }
  }

  private getFieldValue(object: any, path: any) {
    if (typeof object === 'string') {
      return object;
    }
    if (path instanceof Array) {
      let result: any = object;
      path.forEach((element: any) => {
        if (result !== null && result !== undefined
          && result[element] !== null && result[element] !== undefined) {
          result = result[element];
        } else {
          result = '';
        }
      });
      return result;
    } else {
      return object[path] || '';
    }
  }

  private isNull(object: any) {
    return object === null || object === undefined;
  }

  private buildLabels() {
    let field = this.sourceField;
    let getFieldValue = this.getFieldValue;
    this.candiatesLabels = this.candidates.map((e: any) => getFieldValue(e, field));
  }

  private filterItem(item: any, path: any, search: string) {
    if(search === null || search === undefined || search.length === 0) {
      return true;
    }
    let result: any;
    if (typeof item === 'string') {
      result = item;
    } else if (path instanceof Array) {
      result = item;
      path.forEach((element: any) => {
        if (result !== null && result !== undefined
          && result[element] !== null && result[element] !== undefined) {
          result = result[element];
        } else {
          result = '';
        }
      });
    } else {
      result = item[path] || '';
    }
    return result.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  }

}

@Directive({
  selector: '[autocomplete]',
})
export class AutocompleteDirective implements OnInit, OnDestroy, OnChanges {
  @Input() config: any;
  @Input() items: any;
  @Input() ngModel: String;
  @Output() ngModelChange = new EventEmitter();
  @Output() inputChangedEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  private componentRef: ComponentRef<AutocompleteComponent>;
  private thisElement: HTMLElement;
  private autocompleteElement: HTMLElement;
  private inputElement: HTMLInputElement;
  private tabIndex: number;

  constructor(private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef) {
    this.thisElement = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit() {
    this.createDiv();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.instance.selectEvent.unsubscribe();
      this.componentRef.instance.inputChangedEvent.unsubscribe();
    }
    document.removeEventListener('click', this.hideAutocomplete);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes['items'] && this.componentRef) {
      let component = this.componentRef.instance;
      component.items = changes['items'].currentValue;
      component.filterItems(component.value);
    }
  }

  @HostListener('click')
  @HostListener('focus')
  showAutocomplete() {
    this.hideAutocomplete();
    this.createAutocomplete();
  }

  hideAutocomplete = (event?: any): void => {
    if (!this.componentRef) {
      return;
    }
    if (!event || (event.target !== this.thisElement && event.type === 'click')) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
    if (this.inputElement['tabIndex'] < 0) {
      this.inputElement['tabIndex'] = this.tabIndex;
    }
  }

  onInputChanged = (val: string) => {
    this.inputElement.value = val;
    if (val !== this.ngModel) {
      this.ngModelChange.emit(val);
    }
    let component = this.componentRef.instance;
    component.filterItems(val);
    this.inputChangedEvent.emit(val);
  }

  onSelect = (item: any) => {
    let component = this.componentRef.instance;
    let val = component.value;
    if (val !== this.ngModel) {
      this.ngModelChange.emit(val);
    }
    this.selectEvent.emit(item);
    if (this.inputElement) {
      this.inputElement.value = '' + val;
    }
    this.hideAutocomplete();
  }

  private createDiv() {
    let element = document.createElement('div');
    element.style.display = 'inline-block';
    element.style.position = 'relative';
    this.thisElement.parentElement.insertBefore(element, this.thisElement.nextSibling);
    element.appendChild(this.thisElement);
    document.addEventListener('click', this.hideAutocomplete);
  }

  private createAutocomplete() {
    let factory = this.resolver.resolveComponentFactory(AutocompleteComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    let component = this.componentRef.instance;
    component.config = this.config;
    component.items = this.items;
    component.selectEvent.subscribe(this.onSelect);
    component.inputChangedEvent.subscribe(this.onInputChanged);
    this.autocompleteElement = this.componentRef.location.nativeElement;
    this.autocompleteElement.style.display = 'none';
    this.inputElement = <HTMLInputElement>this.thisElement;
    if (this.thisElement.tagName !== 'INPUT' && this.autocompleteElement) {
      this.inputElement = <HTMLInputElement>this.thisElement.querySelector('input');
      this.inputElement.parentElement.insertBefore(this.autocompleteElement, this.inputElement.nextSibling);
    }
    component.value = this.inputElement.value;
    this.tabIndex = this.inputElement['tabIndex'];
    this.inputElement['tabIndex'] = -100;
    if (this.componentRef) {
      let rect = this.thisElement.getBoundingClientRect();
      let style = this.autocompleteElement.style;
      style.width = rect.width + 'px';
      style.position = 'absolute';
      style.zIndex = '1';
      style.top = '0';
      style.left = '0';
      style.display = 'inline-block';
    }
  }
}

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [ AutocompleteComponent, AutocompleteDirective ],
  exports:  [ AutocompleteComponent, AutocompleteDirective ],
  entryComponents: [ AutocompleteComponent ]
})

export class AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AutocompleteModule
    };
  }
}
