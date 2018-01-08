import { Component } from '@angular/core';
import { WikipediaService } from './shared/wikipedia.service';

@Component({
  selector: 'ng2-demo-app',
  template: `<div>
  <h1>{{name}}</h1>
  <div>
    <h2>selected: {{selectedItem.toString()}}</h2>
  </div>
  <div>
    <h2>inputChanged: {{inputChanged.toString()}}</h2>
  </div>
  <h2>String:</h2>
  <div>
    <input autocomplete [items]="items" (inputChangedEvent)="onInputChangedEvent($event)" (selectEvent)="onSelect($event)">
  </div>
  <h2>Objects:</h2>
  <div>
    <input autocomplete [config]="config2" [items]="items2" (inputChangedEvent)="onInputChangedEvent($event)" (selectEvent)="onSelect($event)">
  </div>
  <h2>Wiki:</h2>
  <div>
    <input autocomplete [items]="wikiItems" (inputChangedEvent)="search($event)" (selectEvent)="onSelect($event)">
  </div>
  </div>`
})
export class DemoComponent {
  name = 'autocomplete';
  selectedItem: any = '';
  inputChanged: any = '';
  wikiItems: any[] = [];
  items: any[] = ['a', 'ab'];
  items2: any[] = [
    { id: 0, payload: { label: 'Tom' } },
    { id: 1, payload: { label: 'John' } },
    { id: 2, payload: { label: 'Lisa' } },
    { id: 3, payload: { label: 'Js' } },
    { id: 4, payload: { label: 'Java' } },
    { id: 5, payload: { label: 'c' } },
    { id: 6, payload: { label: 'vc' } }
  ];
  config2: any = { placeholder: 'test', sourceField: ['payload', 'label'] };

  constructor(private service: WikipediaService) {}

  onSelect(item: any) {
    this.selectedItem = item;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  search(term: string) {
    this.service
      .search(term)
      .subscribe(e => (this.wikiItems = e), error => console.log(error));
  }
}
