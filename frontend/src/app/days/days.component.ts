import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  constructor(private bookService: BookService) { 
  }

  ngOnInit(): void {
    this.bookService.getDays().subscribe(res => this.days = res)
  }
  days;
  newDays;
  message;
  rateControl = new FormControl("", [Validators.max(100), Validators.min(0)])
  changeDays(){
    if(this.newDays > 0){
      this.bookService.setDays(this.newDays).subscribe(resp=> {this.ngOnInit()});
    }
  else
      this.message = "Cant set days to less than 0"
  }
  renderUser(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin'
  }
}
