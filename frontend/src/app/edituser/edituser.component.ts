import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe( params => this.username = params.username);
  }

  ngOnInit(): void {
    this.userService.fetchUser(this.username).subscribe((u)=>{
      this.user = u;
      // this.password = u.password
      // this.firstname = u.firstname
      // this.lastname = u.lastname
      // this.address = u.address
      // this.phone = u.phoneNumber
      // this.mail = u.email
    })
  }
  username
  user
  password:string;
  firstname:string;
  lastname:string;
  address:string;
  phone:string;
  mail:string;

  change(){
    this.userService.change(this.user).subscribe(resp => this.ngOnInit())

  }
  back(){
    this.router.navigate(['adminedit'])
  }
  renderUser(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin'
  }
}
