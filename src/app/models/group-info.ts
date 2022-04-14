import { Post } from "./Post";
import { User } from "./User";

export class GroupInfo
{
    infoId!:number;
    groupName!:string;
    description!:string;
    interests!:string;// To Do. Update logic to support group interest field
    dateCreated!:string;
    owner!:User;
    postHead!:Post;

    public constructor(name:string, desc:string, inter:string, ownr:User, post:Post)
    {
        //this.infoId = id;
        this.groupName = name;
        this.description = desc;
        this.interests = inter;
        this.dateCreated = new Date().toLocaleDateString("en-US");
        this.owner = ownr;
        this.postHead = post;
    }
}
