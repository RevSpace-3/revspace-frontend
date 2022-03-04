import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import{Router,NavigationExtras} from '@angular/router';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchText:FormControl;
  
  search = "";
  userlist: User[]=[];

  // User=[{}];

  constructor(private router:Router) {}
  ngOnInit(): void {
    
  }

  getAllUser(result:any){
    const navigationExtras :NavigationExtras={
      queryParams:{
        result: JSON.stringify(result)
      }
    }
    this.router.navigate(['search-detail'], navigationExtras);
  }

  onKeyUp(x) { // appending the updated value to the variable
    
  }

  navToProfile(user:User)
  {
    this.router.navigate(['viewprofile/' + user.userId]);
  }

  // searchEmail(email: string){
  //   this.actRoute.queryParams.subscribe(data =>{
  //     email = data.email;
  //     console.log(data);
  //   });
  // }

}