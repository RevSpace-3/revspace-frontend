import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { Like } from 'src/app/models/Like';
import { PostUtilObj } from 'src/app/models/PostUtilObj';
import { PostHttpServiceService } from 'src/app/services/post-http-service.service';
import { LikeHttpServiceService } from 'src/app/services/like-http-service.service';

@Component({
  selector: 'app-populate-feed',
  templateUrl: './populate-feed.component.html',
  styleUrls: ['./populate-feed.component.css']
})
export class PopulateFeedComponent implements OnInit {

  constructor(private postHttpService: PostHttpServiceService,
              private likeHttpService: LikeHttpServiceService,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.nextTen(0);
  }


  pclArray: Array<Array<Post>> = [];
  posts: Array<Post> = [];
  comments: Array<Post> = [];
  postUtil: Array<PostUtilObj> = [];
  

  user: User = new User(1,"abc@abc.com","firstName","lastName", 1637264203, 163700000, "gitName", "title", "location", "aboutme");

  /*
  postUtil is an array where each element is an object with the following attributes:
    - postId
    - number of likes
    - how much it's indented on the template
  */

  nextTen(oldestId: number){

    this.postHttpService.getTenPosts(oldestId).subscribe(
      (response) => {

        console.log(response);

        if(response.status == 200){ //Okay
          
          this.pclArray = response.body;

          this.populateArrays(this.pclArray);


        }else if (response.status == 204){ //No more posts to display
          
          alert("There are no more posts to display.")

        }else if (response.status == 400){ //Bad request
          
          alert("Something went wrong! Call IT support for help.");
        }
      }
    );
  }

  populateArrays(pclArray: Array<Array<Post>>) {

    this.calculateLikes(this.pclArray[2]);

    for (let newPost of this.pclArray[0]) {

      this.postUtil.push(new PostUtilObj(newPost.postId, 0, 0));

      this.posts.push(newPost);

      console.log(newPost.creatorId.firstName);
    }

    for (let newComment of this.pclArray[1]) {

      this.comments.push(newComment);
    }  
  }

  calculateLikes(likesArray: Array<Post>) {

    for(let likePost of likesArray){

      this.getPostUtilObj(likePost).numLikes = likePost.date;

      if (likePost.creatorId.userId == this.user.userId) {
        
        this.getPostUtilObj(likePost).starStyle = "fas fa-star";
      }

      //console.log(this.postUtil);
    }
  }

  likePost(curPost: Post) {

    if (!this.alreadyLiked(curPost)){

      this.likeHttpService.likePost();

    this.getPostUtilObj(curPost).numLikes ++;
    this.getPostUtilObj(curPost).starStyle = "fas fa-star";

    }
  }

  determineStarStyle(curPost: Post): string {

    //console.log(this.postUtil);

    return this.getPostUtilObj(curPost).starStyle;
  }

  alreadyLiked(curPost: Post): boolean {

    return (this.determineStarStyle(curPost) == "fas fa-star");
  }


  getPostUtilObj(post: Post): PostUtilObj {

    return this.postUtil.filter(obj => {return obj.postId == post.postId})[0]
  }

  appendComments() {
    
    for (let comment of this.comments) {

      let parent = this.document.getElementById("attach" + comment.parentPost.postId);



      parent.appendChild(this.document.getElementById("comment" + comment.postId));
    }
  }


  getIndent(comment: Post): number {

    if (comment.parentPost.comment) {

      return 50;

    } else {

      return 0;
    }
  }


  // createComment(commentId: number, parentId: number) {

  // }

  

}


