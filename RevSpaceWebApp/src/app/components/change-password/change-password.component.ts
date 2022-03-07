import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  correctPass = true;

  passwordForm = new FormGroup({
    email: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    id: new FormControl('')
  })

  constructor(private route: Router, private uServ: UserService, private eComp: EditUserProfileComponent, private lServ: LoginService) { }

  ngOnInit(): void {
  }

  submitPassword(pass: FormGroup) {
    let password = pass.get("newPassword").value;
    let cpassword = pass.get("confirmPassword").value;
    pass.setValue({email: this.eComp.currentUser.email, oldPassword: this.eComp.currentCred.password, id: this.eComp.currentUser.userId})

    if (password === cpassword) {
      this.uServ.changePassword(JSON.stringify(pass.value)).subscribe(
        response => {
          this.route.navigate([""]);
        }
      )
    }
    else {
      this.correctPass = false;
    }
  }

}
