import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TwoFAService } from 'src/app/services/two-fa.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private twoFAService:TwoFAService) { }

  ngOnInit(): void {
  }

  
  username:string;
  password:string;
  
  // change phone number to twilio verified nuumber to receive OTP
  phone:string ='+18186605542';
  otp:number;

  login()
  {
    this.loginService.login(this.username, this.password);
  }

  /**
   * @returns whether the most recent login attempt was invalid (false if no login attempt this session)
   */
  isLoginInvalid():boolean
  {
    return this.loginService.isLoginInvalid();
  }

  mobileSend()
  {
    this.twoFAService.mobileSend(this.phone, this.username, this.password);
  }

  twoFAValid()
  {
    return this.twoFAService.twoFAValid();
  }

  otpSend()
  {
    this.twoFAService.otpSend(this.otp, this.username, this.password);
  }

}
