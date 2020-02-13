import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name'];

  users$: Observable<User>;

  constructor(private data: DataService) {

  }

  ngOnInit(): void {
    this.users$ = this.data.loadData().pipe(tap(data => console.log(data)));
  }
}
