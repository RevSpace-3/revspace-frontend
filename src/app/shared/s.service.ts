import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SService {
  darkMode:number;
  constructor() { }
  setDarkMode(data){
    this.darkMode = data
  }

  getDarkMode(){
    return this.darkMode
  }

  toggleDarkMode(){
    if(this.darkMode ==0){
      this.darkMode ++;
      
    }else{
      this.darkMode = 0;
      
    }
    
    console.log("this button is getting pressed2")
    return this.darkMode;
  }
}
