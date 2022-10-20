import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe( params => this.id = params.id);}

  ngOnInit(): void {
    this.bookService.getZanr().subscribe(res=>this.zanroviList = res)
    this.bookService.fetchBook(this.id).subscribe(b=>{
      this.book=b
      this.authors = this.book.authors.join(",")
      this.categories = this.book.category.join(',')
    })
  }
  id
  book
  authors;
  categories
  zanrovi = [];
  zanroviList;
  message;
  // authors: authors.split(", "),
  // categories: categories.split(", "),


  editBook(){
    if(this.zanrovi.length < 4){
      this.message = "Book updated"
      console.log(this.zanrovi)
      if(this.url != '')
      this.book.image = this.url;
      this.book.authors = this.authors.split(", ");
      this.book.categories = this.zanrovi
      // console.log(this.book)
      this.bookService.editBook(this.book).subscribe(res=>{
        // console.log(res)
        this.ngOnInit();
      })
    }
    else {
      this.message = "Must have less than three categories"
    }
  }

  back(){
    this.router.navigate(['adminedit'])
  }
  renderBook(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin' || JSON.parse(localStorage.getItem('logedUser')).type === 'moderator'
  }
  url
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteComment(id, num){
    this.bookService.deleteComment(id, num).subscribe(resp=>{this.ngOnInit()})
  }
}
