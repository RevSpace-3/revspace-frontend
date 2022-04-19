import { GroupPost } from "./group-post";
import { User } from "./User";

export class GroupLike 
{
    likeId!:number;
    user:User;
    post:GroupPost;

    constructor(id:number, user:User, post:GroupPost)
    {
        this.likeId = id;
        this.post = post;
        this.user = user;
    }
}
