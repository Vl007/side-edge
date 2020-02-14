import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'gender',  'location', 'email', 'login', 'dob', 'registered', 'phone', 'cell', 'id', 'picture', 'nat'];

  users$: Observable<User>;

  constructor(private data: DataService) {

  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.users$ = this.data.loadData().pipe(tap(data => console.log(data)));
  }
}
