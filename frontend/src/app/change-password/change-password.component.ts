import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
  message: string;

  changePassword(){
    const user = JSON.parse(localStorage.getItem('logedUser'))
    if(user.password === this.oldPassword){
      if(this.newPassword1 === this.newPassword2){
        var passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})");
        if(passwordRegex.test(this.newPassword1)){
          this.userService.changePassword(user.username, this.oldPassword, this.newPassword1).subscribe((resp)=>{
            if(resp['message']=='ok'){
              user.password = this.newPassword1
              localStorage.setItem('logedUser', JSON.stringify(user))
              this.message = "Password changed successfuly"
            }else {
              this.message = "Error in backend"
            }
          })
        } else {
          this.message = "Password too weak"
        }
      } else {
        this.message = "New password doesn't match"
      }
    } else {
      this.message = "Wrong password"
    }
  }
}
