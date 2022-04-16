import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TwoFAService {
  phoneTo:'+18186605542';
  phoneNo:number;

  private invalidTwoFA = true;

  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  

  constructor(
    private backendService:BackendService,
    public httpClient:HttpClient,
    private router:Router) { }

  

  public mobileSend(phone:string, username:string, password:string)
  {
    let sendCode = {phoneNo:phone}
    const authToken:string = 'Basic ' + btoa(username + ":" + password);
    const myHeaders:HttpHeaders = new HttpHeaders({
      'Authorization': authToken
    });
    const request = this.httpClient.post(this.backendService.getBackendURL() + "/mobileNo", sendCode);
    const result = request.subscribe(
      (response)=>{
        console.log(sendCode);
        alert(response);
        this.router.navigate(['postfeed']);
        
      },
      ()=>
      {
        this.router.navigate(['']);
      }
    )
  }
  

  public twoFAValid()
  {
    return !this.invalidTwoFA;
  }

  public otpSend(otp:number,username:string, password:string)
  {
    let sms = {otp:otp}
    const authToken:string = 'Basic ' + btoa(username + ":" + password);
    const myHeaders:HttpHeaders = new HttpHeaders({
      'Authorization': authToken
    });
    const request = this.httpClient.post(this.backendService.getBackendURL() + "/otp", sms);
    const result = request.subscribe(
      (response)=>{
        console.log(sms);
        alert(response);
        this.invalidTwoFA = false;
      },
      ()=>
      {
        this.router.navigate(['']);
        this.invalidTwoFA = true;
      }
    )
  }

}
