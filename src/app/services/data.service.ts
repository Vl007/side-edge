import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private httpClient: HttpClient) {

  }

  loadData() {
    this.httpClient.get('http://jsteam.sibedge.com/raw/task/users.json')
      .pipe(
        map(data => data.results)
      );
  }
}
