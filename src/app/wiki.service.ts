import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    const wikiUrl = 'https://en.wikipedia.org/w/api.php';

    const url = `${wikiUrl}?search=${term}&action=opensearch&format=json`;

    return this.http
      .jsonp(url, 'callback')
      .pipe(map(response => response[1] as string[]));
  }
}
