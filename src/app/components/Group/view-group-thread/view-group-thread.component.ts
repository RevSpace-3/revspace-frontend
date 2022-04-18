import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupThread } from 'src/app/models/group-thread';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-group-thread',
  templateUrl: './view-group-thread.component.html',
  styleUrls: ['./view-group-thread.component.css']
})
export class ViewGroupThreadComponent implements OnInit, OnChanges {

  title: string;
  group:GroupInfo = null;
  errMsg:string;
  //GroupService: any[];

  @Input() updateFlag:boolean;
  @Output() eventEmitter = new EventEmitter<boolean>();

  constructor(public groupService:GroupService, public loginService:LoginService, private router:Router) { }

  ngOnInit(): void
  {
    this.title = 'groups';
    this.group = this.groupService.getCurrentGroup();
    //this.groupService.getAllGroups().subscribe((data)=>{ this.groups = data;}, err => this.errMsg = err );
  }
  ngOnChanges()
  {
    this.group = this.groupService.getCurrentGroup();
    this.updateFlag = false;
  }

  joinGroup()
  {
    let nGroup:GroupThread = new GroupThread(this.group, this.loginService.getLoginInfo().user);
    console.log("Group Name: " + nGroup.groupInfo.groupName);
    console.log("User Name: " + nGroup.member.email);

    this.groupService.addGroup(nGroup).subscribe((data)=>{nGroup = data;}, err => this.errMsg = err, () => this.router.navigateByUrl("/view-groups"));
    
    console.log(this.errMsg);
    console.log(this.group);

    this.eventEmitter.emit(true);
  }
  closeGroup()
  {
    this.eventEmitter.emit(true);
  }
}





