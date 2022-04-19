import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-hub-navbar',
  templateUrl: './hub-navbar.component.html',
  styleUrls: ['./hub-navbar.component.css']
})
export class HubNavbarComponent implements OnInit {

  constructor() { }

  @Output() searchQuery:EventEmitter<string> = new EventEmitter();
  searchPara:string;

  ngOnInit(): void {
  }

  searchByInterest()
  {
    this.searchQuery.emit(this.searchPara);
  }
}
