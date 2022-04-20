import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-hub-navbar',
  templateUrl: './hub-navbar.component.html',
  styleUrls: ['./hub-navbar.component.css']
})
export class HubNavbarComponent implements OnInit {

  constructor() { }

  @Output() searchQuery:EventEmitter<string> = new EventEmitter();

  @Output() showGroups:EventEmitter<boolean> = new EventEmitter();
  @Output() showJoinable:EventEmitter<boolean> = new EventEmitter();
  @Output() showCreate:EventEmitter<boolean> = new EventEmitter();

  searchPara:string;

  ngOnInit(): void {
  }

  searchByInterest()
  {
    this.searchQuery.emit(this.searchPara);
  }

  emitShowGroup()
  {
    this.showGroups.emit(true);
  }
  emitJoinGroup()
  {
    this.showJoinable.emit(true);
  }
  emitCreateGroup()
  {
    this.showCreate.emit(true);
  }
}
