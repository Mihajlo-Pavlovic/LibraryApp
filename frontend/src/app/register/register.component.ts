import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  username:string;
  password1:string;
  password2:string;
  firstname:string;
  lastname:string;
  address:string;
  phone:string;
  mail:string;
  message:string;

  register() {
    console.log("register")
    var mailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if(mailRegex.test(this.mail)){
      if(this.password1 == this.password2){
        var passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})");
        if(passwordRegex.test(this.password1)){
          this.message = ""
          this.userService.register(this.username, this.password1, this.firstname, this.lastname, this.mail, null, this.address, this.phone).subscribe(respObj=>{
            if(respObj['message']=='ok'){
              this.message = 'User added'
            }
            else if(respObj['message']=='username'){
              this.message = "User with this username already exists"
            }
            else{
              this.message = 'Error'
            }
          });
        }
        else{
          this.message = "Password is too weak"
        }
      }
      else{
        console.log("Passwords don't match")
        this.message = "Passwords don't match"
      }
    } else {
    this.message = "That's not a mail"
    }
  
  }
}
