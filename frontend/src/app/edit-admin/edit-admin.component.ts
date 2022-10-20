import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  constructor(private userService:UserService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(u=>{
      this.users = u
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].username == 'admin'){
          this.users.splice(i, 1)
          break;
        }
      }
      this.bookService.getAll().subscribe(b=>{
        this.books = b
      })
    })
  }

  books
  users


  renderBookDelete(id){
    let f = false
    this.users.forEach((elem) =>{
      elem.borrowing.forEach((book) =>{
        if (book.id == id){
          f = true
          return
        }
      })
      if(f)
        return
    })
    return !f
  }

  editUser(username){
    this.router.navigate(['edituser/'+username])
  }
  editBook(id){
    this.router.navigate(['editbook/'+id])
  }
  deleteUser(username){
    this.userService.delete(username).subscribe(resp=>{
      this.ngOnInit()
    })
  }
  deleteBook(id){
    this.bookService.delete(id).subscribe(resp=>{
      this.ngOnInit()
    })
  }
  renderBook(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin' || JSON.parse(localStorage.getItem('logedUser')).type === 'moderator'
  }
  renderUser(){
    return JSON.parse(localStorage.getItem('logedUser')).type === 'admin'
  }
}
