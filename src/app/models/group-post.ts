import { Like } from "./Like";
import { User } from "./User";

export class GroupPost 
{
    postId:number;

    body:string;
    image:string;
    datePosted:string;

    numOfLikes:number;
    comment:boolean;

    owner:User;
    parent:GroupPost;
    child:GroupPost;

    likes:Array<Like>;

    constructor(body:string, image:string, date:string, comment:boolean, user:User, parent:GroupPost, child:GroupPost, likes:Array<Like>)
    {
        this.body = body;
        this.image = image;
        this.datePosted = date;
        this.numOfLikes = 0;
        this.comment = comment;
        this.owner = user;
        this.parent = parent;
        this.child = child;
        this.likes = likes;
    }
}
