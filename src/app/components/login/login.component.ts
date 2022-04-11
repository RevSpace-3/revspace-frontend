import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from '../../services/user.service';
import { AppComponent } from 'src/app/app.component';
import { SService } from 'src/app/shared/s.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  darkMode:number=1;
  
  constructor(private loginService:LoginService, private shared:SService) { }

  ngOnInit(): void {
    this.darkMode= this.shared.getDarkMode();
  }

  ngOnChanges(): void {
    
  }
  
  username:string;
  password:string;

  login()
  {
    this.loginService.login(this.username, this.password);
  }

  toggleDark(){
    this.darkMode = this.shared.toggleDarkMode();
    
  }

  /**
   * @returns whether the most recent login attempt was invalid (false if no login attempt this session)
   */
  isLoginInvalid():boolean
  {
    return this.loginService.isLoginInvalid();
  }

}
