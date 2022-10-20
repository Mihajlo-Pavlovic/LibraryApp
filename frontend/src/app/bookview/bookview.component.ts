import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {

  constructor(private userService: UserService, private bookService: BookService, private route: ActivatedRoute, private sanitizer:DomSanitizer) { 
    this.route.params.subscribe( params => this.id = params.id);
  }
  days
  ngOnInit(): void {
    this.bookService.getDays().subscribe(res=> this.days = res)
    this.bookService.fetchBook(this.id).subscribe((resp)=>{
      this.book = resp
      console.log(this.book)
      this.bookService.getRating(this.id).subscribe((res)=>{
        this.rating = res['message']});        
    })
    if(localStorage.getItem('logedUser') != null){
      this.userService.fetchUser(JSON.parse(localStorage.getItem('logedUser')).username).subscribe((resp)=>{
        this.user = resp
        console.log(this.user)
        let b = false
        for(let i = 0; i < this.user.borrowing.length; i++){
          if(b = (Number(this.user.borrowing[i].id) === this.book.id))
            break;
          else if(b = (this.user.borrowing.length === 3))
            break;
          else if(b = (this.book.count === 0))
            break;
          else {
            var msPerDay = 8.64e7;
            var d1 = new Date(this.user.borrowing[i].date)
            d1.setHours(12,0,0)
            var d2 = new Date()
            d2.setHours(12,0,0)
            b = Math.round( this.days + (d1.getTime() - d2.getTime()) / msPerDay ) < 0;
            if(b)
              break;
          }
        }
        if(!b){
          this.renderBorrow = true
          this.renderReturn = false
        }
          else{
          this.renderBorrow = false
          this.renderReturn = true
        }
      })
    }
    else {
      this.renderBorrow = (this.renderReturn = false)
    }

  }
  renderBorrow: boolean
  renderReturn: boolean
  user: User
  book: Book
  comment: string
  id: Number
  img
  msg;
  addComent(){
    if(this.comment.length < 1000){
      this.bookService.addCommante(this.book.id, this.comment).subscribe(()=>{})
      this.msg = ""
    }
    else
      this.msg = "Comment is too long"
  }

  rating: number;
  newRating: number;   
  vote(){
    this.bookService.vote(this.id, this.newRating).subscribe(()=>{
      this.bookService.getRating(this.book.id).subscribe((res)=>{
      this.rating = res['message']}); 
    })
  } 

  borrow(){
    this.bookService.borrow(this.id).subscribe((res)=>{
    })
    this.renderBorrow=false
    this.renderReturn=true
  }

  return(){
    this.bookService.return(this.id).subscribe((res)=>{
    })
    this.renderBorrow=true
    this.renderReturn=false
  }

  transform(){
    var s: string;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.book.image+ "");
  }
  canComment(){
    for(var i = 0; i < this.book.comments.length; i++){
      if(this.book.comments[i].username === this.user.username){
        return false;
      }
    }
    return true;
  }
}
