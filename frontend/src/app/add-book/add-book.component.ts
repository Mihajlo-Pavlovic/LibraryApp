import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getZanr().subscribe(res=>this.zanroviList = res)
  }
  name: string;
  authors: string;
  categories = [];
  publisher: string;
  year: number;
  language: string;
  count: number;
  image: File;
  url
  zanroviList
  zanrovi = [];
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  message
  addBook(){
    if(this.url == "" || this.name == "" || this.authors == "" || this.categories.length == 0 || this.publisher == "" || this.year == null || this.language == "" || this.count < 0){
      this.message = "Input must be correct"
    }
    else if(this.zanrovi.length < 4){
      this.bookService.addBook(this.url, this.name, this.authors, this.categories, this.publisher, this.year, this.language, this.count).subscribe((resp)=>{
      this.message="book added"
      })
    }
    else {
      this.message = "Book must have less than three categories"
    }
  }
  render(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin' || JSON.parse(localStorage.getItem('logedUser')).type === 'moderator'
  }
  
}
