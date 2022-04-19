import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GroupPost } from 'src/app/models/group-post';
import { User } from 'src/app/models/User';
import { GroupService } from 'src/app/services/group.service';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-group-post',
  templateUrl: './create-group-post.component.html',
  styleUrls: ['./create-group-post.component.css']
})
export class CreateGroupPostComponent implements OnInit {

  constructor(private loginService:LoginService, private groupService:GroupService, private imageService:ImageService) { }

  @Output() event = new EventEmitter<GroupPost>();

  body: string;
  urlLink:string = "";
  creatorId:User;
  comment:boolean;
  date:number;
  user: User = this.loginService.getLoginInfo().user;
  // user: User = new User(1,'email','first','last',10000000,19,'gitur','title','NY','aboutme');
  post = new GroupPost("Test Body", "", new Date().toString(), false, this.loginService.getLoginInfo().user, this.groupService.getCurrentGroup().postHead, null, null);

  expandThis=false;
  show=false;
  errMsg:string;

  ngOnInit(): void {
  }

  createDefaultPost()
  {
    let temp:GroupPost = new GroupPost("Test Body", "", "N/A", false, this.loginService.getLoginInfo().user, this.groupService.getCurrentGroup().postHead, null, null);
    this.groupService.addGroupPost(temp).subscribe(
      (data) => { temp = data; },
      (err)  => { this.errMsg = err; console.log(this.errMsg); },
      () => { this.addNewPost(temp); }
    );
  }

  addNewPost(post:GroupPost)
  {
    post.image = this.urlLink;
    this.event.emit(post);
  }

  /******************************************************************************************* */
  // Legacy Code
  expand(){
    this.expandThis=true;
  }

  //CODE FOR IMGBB
  onInput(e: Event){
    const input = e.target as HTMLInputElement;
    this.imageService.upload(input.files[0])
    .subscribe(url => {
      console.log(url);
      this.urlLink = url;
    });

    //CODE TO DISPLAY IMAGE AS CLICKED
    if(input.files[0]){
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])
        reader.onload = (input:any) =>{
          this.urlLink = input.result
          this.show=true;
        }
      }
      this.post.image = this.urlLink;
  }

  //ADDING POST
  createPost()
  {
    this.post.body = this.body;
    this.post.image = this.urlLink;

    this.groupService.addGroupPost(this.post).subscribe(
      (data)  => { this.post = data; }, 
      (error) => { console.log(error) },
      ()      => { this.addNewPost(this.post); }); 

 
     this.body="";
     this.show=false;
     this.expandThis=false;
    }

}
