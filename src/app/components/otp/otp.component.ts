import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { TwoFAService } from '../../services/two-fa.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  phone:string = '+18056250267';
  otp:number;

  constructor(private loginService : LoginService,
              private twoFAService : TwoFAService) { }

  ngOnInit(): void {
  }

  mobileSend()
  {
    this.twoFAService.mobileSend(this.phone);
  }

  otpSend()
  {
    this.twoFAService.otpSend(this.otp);
  }

  is2faInvalid() {
    return this.twoFAService.isTwoFAInvalid();
  }

  bypassOTP() {
    this.twoFAService.setValidTwoFA(true);
  }

}
