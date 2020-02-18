import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {User} from './models/user';
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
  filterPhone: string;
  filterCity: string;

  constructor(private data: DataService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.loadData(this.pageSize, 0);
  }

  loadData(pageSize: number, pageIndex: number, filterSurname?, filterPhone?, filterCity?) {
    this.data.loadData()
      .subscribe((data: QueryResult) => {
        let filteredResult = data.results;
        if (this.filterSurname && this.filterSurname.length > 0) {
          filteredResult = data.results.filter(row => {
            return row.name.last.indexOf(this.filterSurname) >= 0;
          });
        }

        if (this.filterPhone && this.filterPhone.length > 0) {
          filteredResult = filteredResult.filter(row => {
            return row.phone.indexOf(this.filterPhone) >= 0;
          });
        }

        if (this.filterCity && this.filterCity.length > 0) {
          filteredResult = filteredResult.filter(row => {
            return row.location.city.indexOf(this.filterCity) >= 0;
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
