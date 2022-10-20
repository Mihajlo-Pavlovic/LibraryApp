import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) =>{
      if(!user){
        this.message = "Wrong username or password"
      }
      else{
        localStorage.setItem('logedUser', JSON.stringify(user));
        this.message = "Welcome " + user.firstname +" "+user.lastname;
        this.router.navigate(['home'])
      }
    })
  }

}
