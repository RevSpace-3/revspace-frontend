import { GroupInfo } from "./group-info";
import { User } from "./User";

export class GroupThread 
{
    groupId!:number;
    groupInfo!:GroupInfo;
    //groupMembers:User[] = [];
    member:User;

    public constructor(info:GroupInfo, u:User)//userList:User[])
    {
       // this.groupId = id; // passed value doesnt matter
        this.groupInfo = info; // information about the group and its owner
        this.member = u;
        //this.groupMembers = userList; // list of all members
    }

    // printGroupMembers()
    // {
    //     this.groupMembers.forEach(
    //         (value) =>
    //         {
    //             console.log("User Email: " + value.email);
    //         });
    // }

}
