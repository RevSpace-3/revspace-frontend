import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { GroupService } from 'src/app/services/group.service';

import { GroupThread } from 'src/app/models/group-thread';
import { GroupInfo } from 'src/app/models/group-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css']
})
export class ViewGroupsComponent implements OnInit 
{
  title: string;

  groups:GroupInfo[];
  errMsg:string;

  constructor(public groupService:GroupService, public loginService:LoginService, public router:Router) { }

  ngOnInit(): void
  {
    this.title = 'groups';
    this.groupService.getGroupsByMembership().subscribe((data)=>{ this.groups = data;}, err => this.errMsg = err );
  }

  openGroup(index:number)
  {
    this.groupService.setCurrentGroup(this.groups[index]);
    this.router.navigate(['group-page']);
  }

}


 