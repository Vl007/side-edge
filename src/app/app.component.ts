import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {Observable} from 'rxjs';
import {User} from './models/user';
import {filter, tap} from 'rxjs/operators';
import {QueryResult} from './models/query-result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['picture', 'name', 'gender', 'location', 'email', 'dob', 'registered', 'phone', 'cell', 'id', 'nat'];

  resultLength: number;
  users: User[];
  pageSize = 10;

  filterSurname: string;

  constructor(private data: DataService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData(this.pageSize, 0);
  }

  loadData(pageSize: number, pageIndex: number, filterSurname?) {
    this.data.loadData()
      .subscribe((data: QueryResult) => {
        let filteredResult = data.results;
        if (this.filterSurname && this.filterSurname.length > 0) {
          filteredResult = data.results.filter(row => {
            return row.name.last.indexOf(this.filterSurname) >= 0;
          });
        }

        const start = pageIndex * pageSize;
        this.users = filteredResult.slice(start, start + pageSize);
        this.resultLength = data.info.results;
      });
  }

  onChangePageOrSize(event: PageEvent) {
    this.loadData(event.pageSize, event.pageIndex);
  }

  filterData() {
    this.loadData(this.pageSize, 0);
  }
}
