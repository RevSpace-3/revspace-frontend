import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { GroupService } from 'src/app/services/group.service';

import { GroupThread } from 'src/app/models/group-thread';
import { GroupInfo } from 'src/app/models/group-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {
  title: string;

  groups:GroupInfo[];
  errMsg:string;
  //GroupService: any[];
  showGroup:boolean = false;
  statusMsg:string = "";

  @Output() toggleGroup:EventEmitter<boolean> = new EventEmitter();

  constructor(public groupService:GroupService, private router:Router) { }

  ngOnInit(): void
  {
    this.title = 'groups';
    this.getJoinableGroups();

   // this.printAllGroups();

  }

  getMessage(value)
  {
    this.showGroup = this.showGroup;
  }

  openGroup(index:number)
  {
    console.log("Opening Group of index i=" + index);
    this.groupService.setCurrentGroup(this.groups[index]);
    this.showGroup = true;
    this.router.navigateByUrl("/group-page");

    //this.groupService.
  }
  closeGroup()
  {
    this.showGroup = !this.showGroup;
    this.toggleGroup.emit(this.showGroup);

    this.ngOnInit();
    //this.getJoinableGroups();
  }
  getJoinableGroups()
  {
    this.groupService.getOtherGroups().subscribe(
      (data)=>{ this.groups = data;},
       err => this.errMsg = err, 
       () => this.statusMsg = this.groups != undefined ? "" : "Sorry, there are no groups to join :c");
  }

  searchByInterest(search:string)
  {
    this.groupService.getGroupsByInterest(search).subscribe(
      (data) => { this.groups = data; },
      (err)  => { console.log(err); },
      ()     => {  }
    );
  }
}
