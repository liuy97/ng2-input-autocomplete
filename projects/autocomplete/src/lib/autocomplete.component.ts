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
  OnChanges,
  OnDestroy,
  OnInit,
  AfterViewInit,
  Output,
  SimpleChange,
  ViewContainerRef,
  HostBinding
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line
  selector: 'ng2-input-autocomplete',
  template: `
  <div [ngClass]="classList">
    <input type="text"
      placeholder="{{placeholder}}"
      (blur)="showAutoComplete = false;"
      (focus)="showAutoComplete = true;"
      [value]="value"
      (keyup)="enterText($event)">
    <ul *ngIf="showAutoComplete && candidates && candidates.length > 0">
      <li *ngFor="let candidate of candidates; let idx = index"
        [ngClass]="{ active: (idx === selectedIndex) }"
        (keyup)="onKeyUpEvent($event, idx)"
        (mouseover)="selectedIndex = idx;"
        (mousedown)="onSelect(idx)">
        {{candidatesLabels[idx]}}
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
  ]
})
export class AutocompleteComponent implements OnInit, OnChanges {
  classList = 'autocomplete';
  @Input() items: any[];
  @Input() config: any;
  @Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChangedEvent: EventEmitter<any> = new EventEmitter<any>();
  inputElement: HTMLInputElement;
  value: string;
  candidates: any[];
  candidatesLabels: any[];
  selectedIndex: number;
  showAutoComplete: boolean;
  placeholder: string;
  maxLimit = 0;
  private sourceField: any;
  private thisElement: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.thisElement = elementRef.nativeElement;
    this.selectedIndex = 0;
    this.showAutoComplete = false;
    this.value = '';
  }

  ngOnInit() {
    if (this.config && this.config.class) {
      this.classList += ' ' + this.config.class;
    }
    if (this.config && this.config.max > 0) {
      this.maxLimit = this.config.max;
    }
    this.placeholder = 'autocomplete';
    this.inputElement = this.thisElement.querySelector(
      'input'
    ) as HTMLInputElement;

    if (!this.isNull(this.config)) {
      if (!this.isNull(this.config.placeholder)) {
        this.placeholder = this.config.placeholder;
      }
      if (!this.isNull(this.config.sourceField)) {
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
    const total = this.candidates.length;
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
    this.value = this.candidatesLabels[idx];
    this.selectEvent.emit(this.candidates[idx]);
  }

  onKeyUpEvent(event: KeyboardEvent, idx: number): void {
    if (event.keyCode === 13) {
      this.onSelect(idx);
    }
 }

  filterItems(search: string) {
    const field = this.sourceField;
    const filterItem = this.filterItem;
    if (this.items) {
      this.candidates = this.items.filter(item => {
        return filterItem(item, field, search);
      });
      if (this.maxLimit > 0) {
        this.candidates = this.candidates.slice(0, this.maxLimit);
      }
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
        if (
          result !== null &&
          result !== undefined &&
          result[element] !== null &&
          result[element] !== undefined
        ) {
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
    const field = this.sourceField;
    const getFieldValue = this.getFieldValue;
    this.candidatesLabels = this.candidates.map((e: any) =>
      getFieldValue(e, field)
    );
  }

  private filterItem(item: any, path: any, search: string) {
    if (search === null || search === undefined || search.length === 0) {
      return true;
    }
    let result: any;
    if (typeof item === 'string') {
      result = item;
    } else if (path instanceof Array) {
      result = item;
      path.forEach((element: any) => {
        if (
          result !== null &&
          result !== undefined &&
          result[element] !== null &&
          result[element] !== undefined
        ) {
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
  // tslint:disable-next-line
  selector: '[input-autocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() config: any;
  @Input() items: any;
  @Input() ngModel: string;
  @Input() control: FormControl;
  @Output() ngModelChange = new EventEmitter();
  @Output() inputChangedEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  private componentRef: ComponentRef<AutocompleteComponent>;
  private thisElement: HTMLElement;
  private autocompleteElement: HTMLElement;
  private inputElement: HTMLInputElement;
  private tabIndex: number;
  private reset = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    this.thisElement = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit() {
    if (this.thisElement.tagName.toLowerCase() === 'form') {
      return;
    }
    this.createDiv();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.instance.selectEvent.unsubscribe();
      this.componentRef.instance.inputChangedEvent.unsubscribe();
    }
    document.removeEventListener('click', this.hideAutocomplete);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['items'] && this.componentRef) {
      const component = this.componentRef.instance;
      component.items = changes['items'].currentValue;
      component.filterItems(component.value);
    }
  }

  ngAfterViewInit() {
    const input = this.getInputElement();
    if (this.control) {
      this.control.valueChanges.subscribe(() => {
        this.reset = true;
      });
    }
    if (input.form) {
      input.form.addEventListener('reset', () => {
        this.reset = true;
      });
    }
  }

  @HostListener('click', ['$event.target'])
  @HostListener('focus', ['$event.target'])
  showAutocomplete(event: any) {
    this.hideAutocomplete();
    if (event === this.thisElement) {
      this.createAutocomplete();
    }
  }

  getInputElement() {
    let input = this.thisElement as HTMLInputElement;

    if (this.thisElement.tagName !== 'INPUT' && this.autocompleteElement) {
      input = this.thisElement.querySelector(
        'input'
      ) as HTMLInputElement;
    }

    return input;
  }

  hideAutocomplete = (event?: any): void => {
    if (!this.componentRef) {
      return;
    }
    if (event && event.target && this.thisElement && event.target === this.thisElement.parentElement) {
      return;
    }
    if (
      !event ||
      (event.target !== this.thisElement && event.type === 'click')
    ) {
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
      this.ngModel = val;
      this.ngModelChange.emit(val);
    }
    const component = this.componentRef.instance;
    component.filterItems(val);
    this.inputChangedEvent.emit(val);
  }

  onSelect = (item: any) => {
    const component = this.componentRef.instance;
    const val = component.value;
    if (val !== this.ngModel) {
      this.ngModel = val;
      this.ngModelChange.emit(val);
    }
    this.selectEvent.emit(item);
    if (this.inputElement) {
      this.inputElement.value = '' + val;
    }
    this.hideAutocomplete();
  }

  private createDiv() {
    const element = document.createElement('div');
    element.style.display = 'inline-block';
    element.style.position = 'relative';
    this.thisElement.parentElement.insertBefore(
      element,
      this.thisElement.nextSibling
    );
    element.appendChild(this.thisElement);
    document.addEventListener('click', this.hideAutocomplete);
  }

  private createAutocomplete() {
    const factory = this.resolver.resolveComponentFactory(
      AutocompleteComponent
    );
    this.componentRef = this.viewContainerRef.createComponent(factory);
    const component = this.componentRef.instance;
    component.config = this.config;
    component.items = this.items;
    component.selectEvent.subscribe(this.onSelect);
    component.inputChangedEvent.subscribe(this.onInputChanged);
    this.autocompleteElement = this.componentRef.location.nativeElement;
    this.autocompleteElement.style.display = 'none';
    this.inputElement = this.getInputElement();
    if (this.thisElement.tagName !== 'INPUT' && this.autocompleteElement) {
      this.inputElement.parentElement.insertBefore(
        this.autocompleteElement,
        this.inputElement.nextSibling
      );
    }

    if (this.reset) {
      this.ngModel = '';
      this.reset = false;
    }

    this.inputElement.value = this.ngModel ? this.ngModel : '';
    component.value = this.inputElement.value;
    this.tabIndex = this.inputElement['tabIndex'];
    this.inputElement['tabIndex'] = -100;
    if (this.componentRef) {
      const rect = this.thisElement.getBoundingClientRect();
      const style = this.autocompleteElement.style;
      style.width = rect.width + 'px';
      style.position = 'absolute';
      style.zIndex = '1';
      style.top = '0';
      style.left = '0';
      style.display = 'inline-block';
    }
  }
}
