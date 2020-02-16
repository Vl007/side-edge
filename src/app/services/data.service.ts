import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, publishReplay, refCount, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {QueryResult} from '../models/query-result';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  queryResult$: Observable<QueryResult>;

  constructor(private httpClient: HttpClient) {
  }

  loadData() {
    if (!this.queryResult$) {
      this.queryResult$ = this.httpClient.get('/raw/task/users.json')
        .pipe(
          map((data: any) => data),
          publishReplay(1),
          refCount()
        );
    }

    return this.queryResult$;

  }
}
