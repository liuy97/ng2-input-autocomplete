# ng2-input-autocomplete

## Installation

To install this library, run:

```bash
$ npm install ng2-input-autocomplete --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-input-autocomplete
```

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
add mapping in systemjs config 

'ng2-input-autocomplete': 'node_modules/ng2-input-autocomplete/dist/index.js',

Once your library is imported, you can use its components and directives:

Three input elements: **config**, **items**, **ngModel**
config supports two properties: **placeholder** and  **sourceField** which is used to search.

Two output events: **selectEvent** (when a item is selected) and **inputChangedEvent** (when users input)

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  String
</h1>
<input autocomplete [items]=["a", "ab"]></input>
  <h2>Objects:</h2>
  <div>
    <input autocomplete [config]="config2" [items]="items2"
      (inputChangedEvent)="onInputChangedEvent($event)"
      (selectEvent)="onSelect($event)">
  </div>
  <h2>Wiki:</h2>
  <div>
    <input autocomplete [items]="wikiItems"
      (inputChangedEvent)="search($event)"
      (selectEvent)="onSelect($event)">
  </div>
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
  config2: any = {'placeholder': 'test', 'sourceField': ['payload', 'label']};

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

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [liuy97](liuy97@gmail.com)
