import { Component, OnInit } from '@angular/core';
import { TwoFAService } from 'src/app/services/two-fa.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private twoFAService:TwoFAService) { }

  ngOnInit(): void {
  }

  
  username:string;
  password:string;
  
  // change phone number to twilio verified nuumber to receive OTP
  phone:string ='+18186605542';
  otp:number;

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
