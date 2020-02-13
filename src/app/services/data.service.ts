import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  loadData() {
    return this.httpClient.get('/raw/task/users.json')
      .pipe(
        map((data: any) => data.results)
      );
  }
}
