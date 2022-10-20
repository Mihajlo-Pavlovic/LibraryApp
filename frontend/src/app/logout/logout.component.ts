import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.renderLogout = !(localStorage.getItem('logedUser') === null)
  }
  renderLogout:Boolean
  logout(){
    localStorage.removeItem('logedUser')
    this.renderLogout = false
    this.router.navigate(['home'])
  }
}
