import { Component, OnInit } from '@angular/core';
import { GroupPost } from 'src/app/models/group-post';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-group-post',
  templateUrl: './create-group-post.component.html',
  styleUrls: ['./create-group-post.component.css']
})
export class CreateGroupPostComponent implements OnInit {

  constructor(private loginService:LoginService, private groupService:GroupService) { }

  errMsg:string;
  ngOnInit(): void {
  }

  createDefaultPost()
  {
    let temp:GroupPost = new GroupPost("Test Body", "N/A", false, this.loginService.getLoginInfo().user, this.groupService.getCurrentGroup().postHead, null, null);
    this.groupService.addGroupPost(temp).subscribe(
      (data) => { temp = data; },
      (err)  => { this.errMsg = err; console.log(this.errMsg); }
    );
  }
}
