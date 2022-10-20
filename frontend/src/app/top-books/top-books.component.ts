import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {

  constructor(private bookService: BookService, private router:Router) { }
  book = 0;
  topbooks = [null, null, null];
  imageObject: Array<object> = [];
  ngOnInit(): void {
    console.log(this.topbooks)
    this.bookService.topBooks().subscribe(res => {
      console.log(res);
      this.bookService.fetchBook(res[0]).subscribe(book1=> {
        console.log(book1)
        this.topbooks[0] =book1;
        this.bookService.fetchBook(res[1]).subscribe(book2 => {
          console.log(book2)
          this.topbooks[1] =book2;
          this.bookService.fetchBook(res[2]).subscribe(book3 => {
            console.log(book3)
            this.topbooks[2] =book3;
            console.log(this.topbooks)
            for(let i = 0; i < 3; i++){
              this.imageObject.push({
                image: this.topbooks[i].image,
                thumbImage: this.topbooks[i].image,
                alt: this.topbooks[i].name,
                title: this.topbooks[i].name
              })
            }
          })
        })
      })
      
    })
  }


  go(id){
    this.router.navigate(['book/'+this.topbooks[id].id])
  }


}
