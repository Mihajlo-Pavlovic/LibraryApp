import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService, public router: Router) { }
  privilegija;
  user;
  ngOnInit(): void {
    console.log(localStorage.getItem('logedUser'))
    this.user = localStorage.getItem('logedUser')
    if(this.user === null){
      this.privilegija = "logedout";
    }
    else{
      this.user = JSON.parse(this.user);
      this.privilegija = this.user.type;
    }
    console.log(this.privilegija);
  }


  
}
