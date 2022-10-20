import { Component, NgModule, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService, private bookService: BookService, public router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.sortby = params.sort);
    bookService.topBooks().subscribe((res)=>{console.log(res)})
    bookService.getDays().subscribe(res => this.days= res);
  }
  days;
  user: User
  currentBorrowedBooks = []
  pastBorrowedBooks = []
  sortby: string
  ngOnInit(): void {
    this.userService.fetchUser(JSON.parse(localStorage.getItem('logedUser')).username).subscribe((resp)=>{
      this.user = resp
      this.user.pastBorrowing.forEach(elem=>{
        this.bookService.fetchBook(elem.id).subscribe((book)=>{
          const obj = {elem: elem, book: book}
          this.pastBorrowedBooks.push(obj)
        })
      })
      this.user.borrowing.forEach(elem=>{
        this.bookService.fetchBook(elem.id).subscribe((book)=>{
          const obj = {elem: elem, book: book}
          this.currentBorrowedBooks.push(obj)
        })
      })

    })
  }
  getDate(s){
    this.sortArray()
    return s.substring(0, 4) + '/' + s.substring(5, 7) + '/' + s.substring(8, 10)  
  }

  getDateDiff(d) {
    var msPerDay = 8.64e7;
    var d1 = new Date(d)
    d1.setHours(12,0,0)
    var d2 = new Date()
    d2.setHours(12,0,0)
    return Math.round( this.days + (d1.getTime() - d2.getTime()) / msPerDay );

  }

  return(id){
    this.bookService.return(id).subscribe((res)=>{
      for(var i = 0; i < this.currentBorrowedBooks.length; i++ ){
        if(this.currentBorrowedBooks[i].book.id === id){
          this.currentBorrowedBooks.splice(i, 1)
          console.log('now return')
          this.router.navigate(['user'])
        }
      }
    })
  }

  goToBook(id){
    this.router.navigate(['book/'+id])
  }

  sortArray(){
    var sortedArray = []
    this.pastBorrowedBooks.forEach(e => sortedArray.push(e))
    if(this.sortby === 'authors')
      sortedArray.sort((a, b) => {return a.book.authors[0].localeCompare(b.book.authors[0])})
    else if(this.sortby === 'book')
      sortedArray.sort((a, b) => {return a.book.name.localeCompare(b.book.name)})
    else if(this.sortby === 'borrowed')
      sortedArray.sort((a, b) => {return new Date(a.elem.dateB).getTime() - new Date(b.elem.dateB).getTime()})
    else
      sortedArray.sort((a, b) => {return new Date(b.elem.dateR).getTime() - new Date(a.elem.dateR).getTime()})
    console.log(sortedArray);
    return sortedArray
  }
}
