import { Component } from '@angular/core';
import { WikipediaService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng2-input-autocomplete';
  wikiItems: any[] = [];
  selectedItem: any = '';
  inputChanged: any = '';

  items2: any[] = [{id: 0, payload: {label: 'Tom'}},
    {id: 1, payload: {label: 'John'}},
    {id: 2, payload: {label: 'Lisa'}},
    {id: 3, payload: {label: 'Js'}},
    {id: 4, payload: {label: 'Java'}},
    {id: 5, payload: {label: 'c'}},
    {id: 6, payload: {label: 'vc'}}
  ];
  config2: any = {'class': 'test', 'placeholder': 'test', 'sourceField': ['payload', 'label']};

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
