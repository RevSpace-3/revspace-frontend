import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { GroupService } from 'src/app/services/group.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { GroupThread } from 'src/app/models/group-thread';
import { GroupInfo } from 'src/app/models/group-info';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent implements OnInit {
  title: string;

  groups:GroupInfo[];
  errMsg:string;
  //GroupService: any[];
  showGroup:boolean = false;

  @Output() toggleGroup:EventEmitter<boolean> = new EventEmitter();

  constructor(public groupService:GroupService) { }

  ngOnInit(): void
  {
    this.title = 'groups';
    this.getJoinableGroups();

   // this.printAllGroups();

  }

  getMessage(value)
  {
    this.showGroup = this.showGroup;
  }

  openGroup(index:number)
  {
    console.log("Opening Group of index i=" + index);
    this.groupService.setCurrentGroup(this.groups[index]);
    this.showGroup = true;
  }
  closeGroup()
  {
    this.showGroup = !this.showGroup;
    this.toggleGroup.emit(this.showGroup);

    this.ngOnInit();
    //this.getJoinableGroups();
  }
  getJoinableGroups()
  {
    this.groupService.getOtherGroups().subscribe((data)=>{ this.groups = data;}, err => this.errMsg = err );
  }
}
