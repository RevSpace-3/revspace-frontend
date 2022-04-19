import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TwoFAService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  
  constructor(
    private backendService:BackendService,
    public httpClient:HttpClient,
    private router:Router) { }


  // set to true after OTP matched
  private validTwoFA = false;

  // set to true if user gave wrong OTP
  private invalidTwoFA = false;

  public mobileSend(phone:string)
  {
    let sendCode = {phoneNo:phone}
    const request = this.httpClient.post(this.backendService.getBackendURL() + "/mobileNo", sendCode);
    const result = request.subscribe(
      (response)=>{
        console.log(sendCode);
        alert(response);
      },
      ()=>
      {
        this.router.navigate(['']);
      }
    )
  }
  
  public getValidTwoFA() {
    return this.validTwoFA;
  }

  public setValidTwoFA(value : boolean) {
    this.validTwoFA = value;
  }

  public otpSend(otp:number)
  {
    let sms = {'otp' : otp}
    const request = this.httpClient.post(this.backendService.getBackendURL() + "/otp", sms, {responseType : 'text'});
    const result = request.subscribe(
      (response : string)=>{
        console.log('otp passed: ' + response);
        if (response === 'OTP Correct') {
          this.validTwoFA = true;
          this.router.navigate(['postfeed']);
          this.invalidTwoFA = false;
        }
        else {
           this.validTwoFA = false;
           console.log('otp not correct');
           this.invalidTwoFA = true;
        }
      },
      ()=>
      {
        console.log('otp failed');
        this.router.navigate(['']);
      }
    )
  }

  public isTwoFAInvalid() {
    return this.invalidTwoFA;
  }
  
}   
