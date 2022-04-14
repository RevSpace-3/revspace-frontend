import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group-info';
import { Post } from 'src/app/models/Post';
import { GroupService } from 'src/app/services/group.service';
import { LikeHttpServiceService } from 'src/app/services/like-http-service.service';
import { LoginService } from 'src/app/services/login.service';
import { NewPostService } from 'src/app/services/new-post.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PostHttpServiceService } from 'src/app/services/post-http-service.service';

@Component({
  selector: 'app-group-feed',
  templateUrl: './group-feed.component.html',
  styleUrls: ['./group-feed.component.css']
})
export class GroupFeedComponent implements OnInit {

  constructor(private postHttpService: PostHttpServiceService, private likeHttpService: LikeHttpServiceService,
              private newPostService: NewPostService, private loginService: LoginService,
              private notificationService:NotificationsService, private router:Router,
              @Inject(DOCUMENT) private document: Document, private groupService:GroupService) { }


  postList:Post[] = [];
  @Input() group:GroupInfo;
  errMsg:string;

  ngOnInit(): void 
  {
    this.getGroupPosts();

    this.printPosts();
  }

  updatePosts()
  {
    this.getGroupPosts();
    this.printPosts();
    //this.router.navigate(['group-feed']);
  }

  getGroupPosts() : Post[]
  {
    this.postHttpService.getGroupPosts(this.group.postHead.postId).subscribe(
      (data) => { this.postList = data; }, (err) => { this.errMsg = err; }
    );

    return this.postList;
  }
  printPosts()
  {
    console.log("Printing posts for group " + this.group.infoId)
    for(let i = 0; i < this.postList.length; i++)
    {
      console.log("Id: " + this.postList[i].postId + " Body: " + this.postList[i].body);
    }
  }

  

}
