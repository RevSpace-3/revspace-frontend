import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { GroupService } from 'src/app/services/group.service';

import { GroupThread } from 'src/app/models/group-thread';
import { GroupInfo } from 'src/app/models/group-info';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.css']
})
export class ViewGroupsComponent implements OnInit 
{
  title: string;

  groups:GroupInfo[];
  query:string;
  errMsg:string;

  statusMsg:string;

  collapseString:string = "collapse hide";
  toggleFlag:boolean = false;


  constructor(public groupService:GroupService, public loginService:LoginService, public router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void
  {
    this.title = 'groups';
    this.groupService.getGroupsByMembership().subscribe(
      (data)  =>  { this.groups = data;}, 
      (err)   =>  { this.errMsg = err; });

    	this.activeRoute.queryParams.subscribe(queryParams => {
        // do something with the query params
      });
      this.activeRoute.params.subscribe(routeParams => {
        this.groupService.getGroupsByMembership().subscribe(
          (data)  =>  { this.groups = data;}, 
          (err)   =>  { this.errMsg = err; });
      });
  }

  toggle(flag:boolean)
  {
    this.toggleFlag = !this.toggleFlag;
    this.statusMsg = "";

    if(this.toggleFlag)    
      this.collapseString = "collapse show";
    else
      this.collapseString = "collapse hide";
  }

  openGroup(index:number)
  {
    this.groupService.setCurrentGroup(this.groups[index]);
    this.router.navigate(['group-page']);
  }

  searchByInterest(search:string)
  {
    this.groupService.getGroupsByInterest(search).subscribe(
      (data) => { this.groups = data; },
      (err)  => { console.log(err); },
      ()     => {  }
    );
  }


  displayMyGroups(flag:boolean)
  {
    if(flag)
    {
      if(this.toggleFlag)
        this.toggle(true);

      this.groupService.getGroupsByMembership().subscribe(
        (data)  =>  { this.groups = data;}, 
        (err)   =>  { this.errMsg = err; },
        ()      =>  { this.statusMsg = this.groups != undefined || this.groups.length > 0 ? "" : "Sorry, you currently don't belong to any groups :c" });
    }
  }
  displayJoinableGroups(flag:boolean)
  {
    if(flag)
    {
      if(this.toggleFlag)
        this.toggle(true);

      this.groupService.getOtherGroups().subscribe(
        (data)=>{ this.groups = data;},
         err => this.errMsg = err, 
         () => this.statusMsg = this.groups != undefined ? "" : "Sorry, there are no groups to join :c");
    }
  }
}


 