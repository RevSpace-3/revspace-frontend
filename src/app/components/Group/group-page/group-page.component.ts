import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupThread } from 'src/app/models/group-thread';
import { User } from 'src/app/models/User';
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

  joinFlag:boolean = true;
  ownerFlag:boolean = false;
  currentUser:User = null;

  routePath:string = "/view-groups";

  constructor(public loginService:LoginService, public groupService:GroupService, public router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.loadInformation();

    this.activeRoute.queryParams.subscribe(queryParams => {
      this.loadInformation();
    });
    this.activeRoute.params.subscribe(routeParams => {
      this.loadInformation();
    });
  }



  loadInformation()
  {
    this.group = this.groupService.getCurrentGroup();
    this.groupService.getThreadsByGroupInfo().subscribe(
      (data)  => { this.threads = data;}, 
      (err)   => { this.errMsg = err; },
      ()      => { 
                  this.checkIfJoinable(); 
                  this.currentUser = this.loginService.getLoginInfo().user; // Just so I dont have to call the service every time.
                  this.checkOwnership(); 
                } );

    //console.log("Group: " + this.group);
    //this.threads.forEach((data)=>{console.log("Thread# " + data.groupId)});
  }
  checkIfJoinable()
  {
    let temp:User = this.loginService.getLoginInfo().user;

    for(let i:number = 0; i < this.threads.length; i++)
    {
      if(this.threads[i].member.userId == temp.userId)
      {
        this.joinFlag = false;
        break;
      }
    }
  }
  handleNavBarEvent(flag:boolean)
  {
    this.router.navigateByUrl("/view-groups");
  }

  checkOwnership()
  {
    if(this.currentUser.userId == this.group.owner.userId)
      this.ownerFlag = true;
  }
  joinGroup()
  {
    let nGroup:GroupThread = new GroupThread(this.group, this.loginService.getLoginInfo().user);
    console.log("Group Name: " + nGroup.groupInfo.groupName);
    console.log("User Name: " + nGroup.member.email);

    this.groupService.addGroup(nGroup).subscribe(
      (data)  =>  { nGroup = data; }, 
      (err)   =>  { this.errMsg = err; }, 
      ()      =>  { 
                    this.threads.push(nGroup); 
                  }
    );
    this.joinFlag = false; 
    this.router.navigate(['/group-page']);
    
  }
  getCurUserThread() : GroupThread
  {
    for(let i:number = 0; i < this.threads.length; i++)
    {
      if(this.threads[i].member.userId == this.currentUser.userId)
      {
        return this.threads[i];
      }
    }
    return null;
  }

  leaveGroup()
  {
    this.groupService.deleteGroup(this.getCurUserThread().groupId).subscribe(
      (data) => { console.log(data); },
      (err)  => { console.log(err); },
      ()     => { 
                  this.threads.splice(this.threads.findIndex(d => d.groupId === this.getCurUserThread().groupId), 1);
                }
    );
    this.joinFlag = true; 
    this.router.navigate([this.routePath]);
  }

  deleteGroup()
  {
    this.groupService.deleteGroupPage(this.getCurUserThread().groupInfo.infoId).subscribe(
      (data)  =>  { console.log(data); },
      (err)   =>  { console.log(err); },
      ()      =>  {  }
    );
    this.router.navigate([this.routePath]);
  }
  navToProfile(user:User)
  {
    this.router.navigate(['viewprofile/' + user.userId]);
  }


}
