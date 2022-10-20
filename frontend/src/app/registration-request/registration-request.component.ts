import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})
export class RegistrationRequestComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.fetchAllRequestes().subscribe((requests)=>{
      this.allRequestes = requests
    })
   
  }

  allRequestes 

  accept(username){
    this.userService.acceptRequest(username).subscribe((req)=>{
      // this.router.navigate(['regRequest'])
      this.ngOnInit()
    })
  }

  deny(username){
    this.userService.denyRequest(username).subscribe((req)=>{
      // this.router.navigate(['regRequest'])
      this.ngOnInit()
    })
  }
}
