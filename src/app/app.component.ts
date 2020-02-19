import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {User} from './models/user';
import {QueryResult} from './models/query-result';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';


export const DATE_FORMAT = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
  ]
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['picture', 'name', 'gender', 'location', 'email', 'dob', 'registered', 'phone', 'cell', 'id', 'nat'];

  resultLength: number;
  users: User[];
  pageSize = 10;

  filterSurname: string;
  filterPhone: number;
  filterCity: string;
  birthFrom: Date;
  birthTo: Date;

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

        if (this.filterPhone && this.filterPhone.toString().length > 0) {
          filteredResult = filteredResult.filter(row => {
            return row.phone.indexOf(this.filterPhone.toString()) >= 0;
          });
        }

        if (this.filterCity && this.filterCity.length > 0) {
          filteredResult = filteredResult.filter(row => {
            return row.location.city.indexOf(this.filterCity) >= 0;
          });
        }

        if (this.birthFrom) {
          filteredResult = filteredResult.filter(row => {
            return moment(this.birthFrom).isBefore(moment(row.dob));
          });
        }

        if (this.birthTo) {
          filteredResult = filteredResult.filter(row => {
            return moment(this.birthTo).isAfter(moment(row.dob));
          });
        }

        const start = pageIndex * pageSize;
        this.users = filteredResult.slice(start, start + pageSize);
        this.resultLength = filteredResult.length || data.info.results;
      });
  }

  onChangePageOrSize(event: PageEvent) {
    this.loadData(event.pageSize, event.pageIndex);
  }


  filterData() {
    this.loadData(this.pageSize, 0);
  }

  reset() {
    this.filterSurname = '';
    this.filterCity = '';
    this.filterPhone = null;
    this.birthFrom = null;
    this.birthTo = null;
    this.loadData(this.pageSize, 0);
  }

}
