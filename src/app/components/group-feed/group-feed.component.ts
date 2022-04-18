import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupPost } from 'src/app/models/group-post';
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


  postResponse:Array<GroupPost[]>;
  postList:GroupPost[] = [];
  comments:GroupPost[] = [];

  lastLoadTime: number = 0;

  @Input() group:GroupInfo;
  errMsg:string;

  ngOnInit(): void 
  {
    //this.getGroupPosts();
    this.groupService.getGroupPosts(this.group.postHead.postId).subscribe(
      (data) => { this.postResponse = data; }, 
      (err) => { this.errMsg = err; },
      () => { this.populateArrays(this.postResponse); }
    );

   // this.printPosts();
  }

  updatePosts()
  {
    this.getGroupPosts();
    this.populateArrays(this.postResponse);
    this.printPosts();
  }

  getGroupPosts() : Array<GroupPost[]>
  {
    this.groupService.getGroupPosts(this.group.postHead.postId).subscribe(
      (data) => { this.postResponse = data; }, 
      (err) => { this.errMsg = err; },
      () => { this.ngOnInit(); }
    );

    return this.postResponse;
  }
  populateArrays(response:Array<GroupPost[]>)
  {
    this.postList = response[0];
    this.comments = response[1];
    
  }
  printPosts()
  {
    console.log("Printing posts for group " + this.group.infoId)
    for(let i = 0; i < this.postList.length; i++)
    {
      console.log("Id: " + this.postList[i].postId + " Body: " + this.postList[i].body);
    }
  }

  createDefaultComment(parent:GroupPost)
  {
    let temp:GroupPost = new GroupPost("Test Comment", "N/A", true, this.loginService.getLoginInfo().user, parent, null, null);
    this.groupService.addGroupPost(temp).subscribe(
      (data) => { temp = data; },
      (err)  => { this.errMsg = err; console.log(this.errMsg); }
    );
    
  }
  addNewPost(post:GroupPost)
  {
    this.postList.push(post);
    this.ngOnInit();
  }

  /*************************************************************************************/
  // Legacy code
  submitComment(parent:GroupPost)
  {
    // Testing logic
    let commentInput = this.document.getElementById("commentInput" + parent.postId);
    let commentInputElement = commentInput as HTMLInputElement;

    let temp:GroupPost = new GroupPost(commentInputElement.value, new Date().toLocaleTimeString(), true, this.loginService.getLoginInfo().user, parent, null, null);
    this.groupService.addGroupPost(temp).subscribe(
      (data) => { temp = data; },
      (err)  => { this.errMsg = err; console.log(this.errMsg); }
    );

  }
  appendComments() : boolean
  {
    
    for (let comment of this.comments) {

      let parent = this.document.getElementById("attach" + comment.parent.postId);

      parent.appendChild(this.document.getElementById("comment" + comment.postId));
    }
    return true;
  }

  getIndent(comment: GroupPost): number {

    if (comment.parent.comment) {

      return 50;

    } else {

      return 0;
    }
  }

  navToProfile(post:GroupPost)
  {
    this.router.navigate(['viewprofile/' + post.owner.userId]);
  }
  
  @HostListener("window:scroll", [])
  onScroll(): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

      if (Date.now() - this.lastLoadTime > 1000) {

        this.updatePosts();

        this.lastLoadTime = Date.now();
      }
    } 
  }

}
