import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-bookday',
  templateUrl: './bookday.component.html',
  styleUrls: ['./bookday.component.css']
})
export class BookdayComponent implements OnInit {
  book
  rating = 0;
  constructor(private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.getBookOfTheDay().subscribe(res=>{
      this.book = res
      console.log(this.book)
      for(let i = 0; i < this.book.grades.length; i++)
        this.rating += Number(this.book.grades[i].rating)
      console.log(this.rating, this.book.grades.length);
      this.rating = this.rating / this.book.grades.length;
    });
  }
  go(){
    this.router.navigate(['book/'+this.book.id])
  }
}
