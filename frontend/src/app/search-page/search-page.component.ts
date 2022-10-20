import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private bookService:BookService, private router:Router, private route: ActivatedRoute) {
    // this.route.params.subscribe( params => this.param = params.books)
   }
  param
  books;
  ngOnInit(): void {
    this.route.params.subscribe( params => {this.param = params.books
      console.log(this.param)
      this.bookService.search(this.param).subscribe((resp : Book[])=>{
        this.books = resp
        console.log(this.books)
      })
    })
  }
  goToBook(id){
    this.router.navigate(['book/'+id])
  }
}
