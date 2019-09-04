# ng2-input-autocomplete

[![npm version](https://badge.fury.io/js/ng2-input-autocomplete.svg)](https://badge.fury.io/js/ng2-input-autocomplete)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/liuy97/ng2-input-autocomplete.svg?branch=master)](https://travis-ci.org/liuy97/ng2-input-autocomplete)

#### Quick links
[StackBlitz Template](https://stackblitz.com/edit/ng2-input-autocomplete)

Angular2 input autocomplete

## Installation

To install this library, run:

```bash
$ npm install ng2-input-autocomplete --save
```

## breaking changes from V1.0.0

Directive name has been changed from autocomplete to input-autocomplete

## Usage

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AutocompleteModule } from 'ng2-input-autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AutocompleteModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components and directives:

Three input elements: **config**, **items**, **ngModel**

config supports two properties: **placeholder** and  **sourceField** which is used to search.
Two optional properties: **class** for customized css style and **max** for the max number of items.

Two output events: **selectEvent** (when a item is selected) and **inputChangedEvent** (when users input)

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  String
</h1>
<input input-autocomplete [items]=["a", "ab"]></input>
  <h2>Objects:</h2>
  <div>
    <input input-autocomplete [config]="config2" [items]="items2"
      (inputChangedEvent)="onInputChangedEvent($event)"
      (selectEvent)="onSelect($event)">
  </div>
  <h2>Wiki:</h2>
  <div>
    <input input-autocomplete [items]="wikiItems"
      (inputChangedEvent)="search($event)"
      (selectEvent)="onSelect($event)">
  </div>
```

in styles.css
```css
.test li.active {
  width: 100%;
  background-color: red!important;
}

.test li {
  color: blue;
}
```

```typescript
export class AppComponent  {
  selectedItem: any = '';
  inputChanged: any = '';
  wikiItems: any[] = [];
  items2: any[] = [{id: 0, payload: {label: 'Tom'}},
    {id: 1, payload: {label: 'John'}},
    {id: 2, payload: {label: 'Lisa'}},
    {id: 3, payload: {label: 'Js'}},
    {id: 4, payload: {label: 'Java'}},
    {id: 5, payload: {label: 'c'}},
    {id: 6, payload: {label: 'vc'}}
  ];
  config2: any = {'class': 'test', 'max': 2, 'placeholder': 'test', 'sourceField': ['payload', 'label']};

  constructor(private service: WikipediaService) {}

  onSelect(item: any) {
    this.selectedItem = item;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  search (term: string) {
    this.service.search(term).subscribe(e => this.wikiItems = e, error => console.log(error));
  }
}
```

**Note:** If you're using reactive forms, pass the `FormControl` into the input as a prop like `<input input-autocomplete [control]="formControl">` for methods such as `setValue` or `reset` to work.

## Development

```bash
$ npm run test
```

## License

MIT © [liuy97](liuy97@gmail.com)
