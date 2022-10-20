import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addBook(url, name, authors, categories, publisher, year, language, count){
    const data = {
      name: name,
      authors: authors.split(", "),
      categories: categories,
      publisher: publisher,
      year: year,
      language: language,
      count: count,
      image: url
    }

    return this.http.post(`${this.uri}/addbook`, data)
  }

  fetchBook(id:Number){
    const data = {
      id: id
    }
    return this.http.post<Book>(`${this.uri}/fetchbook`, data)
  }

  // updateBook(id, name, authors, categories, publisher, year, language, count){
  //   if(!(typeof authors === 'undefined'))
  //     authors = authors.split(", ")
  //   if(!(typeof categories === 'undefined'))
  //     categories = categories.split(", ")
  //   const data = {
  //     id: id,
  //     name: name,
  //     authors: authors,
  //     categories: categories,
  //     publisher: publisher,
  //     year: year,
  //     language: language,
  //     count: count,
  //     image: ""
  //   }
  //   return this.http.post(`${this.uri}/updatebook`, data)
  // }

  addCommante(id, comment){
    const data = {
      id: id,
      comment: comment,
      username: JSON.parse(localStorage.getItem('logedUser')).username
    }
    return this.http.post(`${this.uri}/addcomment`, data)
  }

  vote(id, num){
    const data = {
      id: id,
      num: num,
      username: JSON.parse(localStorage.getItem('logedUser')).username
    }
    return this.http.post(`${this.uri}/vote`, data)
  }

  getRating(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/rating`, data)
  }

  

  borrow(id){
    const data = {
      id: id,
      username: JSON.parse(localStorage.getItem('logedUser')).username
    }
    return this.http.post(`${this.uri}/borrowBook`, data)
  }

  return(id){
    const data = {
      id: id,
      username: JSON.parse(localStorage.getItem('logedUser')).username
    }
    return this.http.post(`${this.uri}/returnbook`, data)
  }
  
  topBooks(){
    const data = {}
    return this.http.post(`${this.uri}/topBooks`, data) 
  }

  getAll(){
    const data = {}
    return this.http.post(`${this.uri}/fetchAllBooks`, data)
  }

  delete(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/deleteBook`, data)
  }


  topThreeBooks(){
    const data = {
      
    }
    return this.http.post(`${this.uri}/topThreeBooks`, data)
  }

  editBook(book){
    const data = {
      book: book
    }
    return this.http.post(`${this.uri}/updateBook`, data)
  }
  search(param){
    const data = {
      param: param
    }
    return this.http.post(`${this.uri}/search`, data)
  }

  getBookOfTheDay(){
    const data = {
      
    }
    return this.http.post(`${this.uri}/bookoftheday`, data)
  }

  getDays(){
    const data = {
      
    }
    return this.http.post(`${this.uri}/getdays`, data)
  }

  setDays(day){
    const data = {
      day: day
    }
    return this.http.post(`${this.uri}/setdays`, data)
  }

  deleteComment(id, username){
    const data = {
      id: id,
      username: username
    }
    console.log(id, username)
    return this.http.post(`${this.uri}/deleteComment`, data)
  }
  getZanr(){
    const data = {
    }
    return this.http.post(`${this.uri}/getZanr`, data)
  }
}
