import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupInfo } from 'src/app/models/group-info';
import { GroupLike } from 'src/app/models/group-like';
import { GroupPost } from 'src/app/models/group-post';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
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
  likes:GroupLike[] = [];

  lastLoadTime: number = 0;

  @Input() group:GroupInfo;
  @Input() memberFlag:boolean;
  errMsg:string;

  ngOnInit(): void 
  {
    //this.getGroupPosts();
    this.groupService.getGroupPosts(this.group.postHead.postId).subscribe(
      (data) => { this.postResponse = data; }, 
      (err) => { this.errMsg = err; },
      () => { this.populateArrays(this.postResponse); }
    );
    this.groupService.getGroupLikesByGroup(this.group.postHead.postId).subscribe(
      (data)  => { this.likes = data; },
      (err)   => { console.log(err); },
      ()      => { this.calculateLikeCount(); },
    );
    
   // this.printPosts();
  }

  updatePosts()
  {
    this.getGroupPosts();
    this.populateArrays(this.postResponse);
    //this.printPosts();
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
    if(response != null)
    {
      this.postList = response[0] != null ? response[0] : [];
      this.comments = response[1] != null ? response[1] : [];
    }
    else
    {
      console.log("There are currently no posts for this group.");
    } 
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
    let temp:GroupPost = new GroupPost("Test Comment", "N/A", "N/A", true, this.loginService.getLoginInfo().user, parent, null, null);
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

  calculateLikeCount()
  {
    if(this.likes != null)
    {
      for(let like of this.likes)
      {
        like.post.numOfLikes = like.post.numOfLikes + 1;
      }
    }
  }
  likePost(post:GroupPost)
  {
    let alreadyLiked:boolean = false;
    let temp:GroupLike;
    if(this.likes != null && this.likes.length > 0)
    {
      for(let like of this.likes)
      {
        console.log("Like: " + like.likeId);
        if(like.post.postId == post.postId && like.user.userId == this.loginService.getLoginInfo().user.userId)
        {
          alreadyLiked = true;
          temp = like;
          break;
        }
        else
          alreadyLiked = false;
      }
    }

    if(alreadyLiked)
    {
      post.numOfLikes--;
      this.groupService.deleteGroupLike(temp).subscribe(
        (data) => { 
                    let index:number = this.likes.indexOf(temp); 
                    this.likes.splice(index, 1);
                  },
        (err) => { console.log(err); },
        () => {},
      );
    }
    else
    {
      post.numOfLikes++;
      let tLike:GroupLike = new GroupLike(-1, this.loginService.getLoginInfo().user, post);

      this.groupService.addGroupLike(tLike).subscribe(
        (data) => { tLike = data; },
        (err) => { console.log(err); },
        () => { this.likes.push(tLike); },
      );
    }
  }

  /*************************************************************************************/
  // Legacy code
  submitComment(parent:GroupPost)
  {
    // Testing logic
    let commentInput = this.document.getElementById("commentInput" + parent.postId);
    let commentInputElement = commentInput as HTMLInputElement;

    let temp:GroupPost = new GroupPost(commentInputElement.value, "N/A",new Date().toLocaleTimeString(), true, this.loginService.getLoginInfo().user, parent, null, null);
    this.groupService.addGroupPost(temp).subscribe(
      (data) => { temp = data; },
      (err)  => { this.errMsg = err; console.log(this.errMsg); },
      () => { this.comments.push(temp); }
    );

  }

  formatDateString(date:string):string
  {
    let temp:Date = new Date(date);
    return temp.getDate() + " " + temp.getHours() + " " + temp.getMinutes();
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
