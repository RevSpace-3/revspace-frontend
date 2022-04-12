import { Component, OnInit } from '@angular/core';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupThread } from 'src/app/models/group-thread';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit
{
  group!:GroupInfo;
  public threads:GroupThread[] = [];
  errMsg:String;

  constructor(public loginService:LoginService, public groupService:GroupService) { }

  ngOnInit(): void 
  {
    this.loadInformation();
  }

  loadInformation()
  {
    this.group = this.groupService.getCurrentGroup();
    this.groupService.getThreadsByGroupInfo().subscribe((data)=>{ this.threads = data;}, err => this.errMsg = err );

    console.log("Group: " + this.group);
    this.threads.forEach((data)=>{console.log("Thread# " + data.groupId)});
  }
}
