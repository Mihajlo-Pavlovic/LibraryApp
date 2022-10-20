import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  login(fromFormUsername, fromFormPassword){
    const data = {
      username: fromFormUsername,
      password: fromFormPassword
    }
    return this.http.post(`${this.uri}/login`, data)
  }


  register(fromFormUsername, fromFormPassword, fromFormFistrname, fromFormLastname, fromFormMail, fromFormImage, fromFormAddress, fromFormPhone){
    const data = {
      username: fromFormUsername,
      password: fromFormPassword,
      firstname: fromFormFistrname,
      lastname: fromFormLastname,
      address: fromFormAddress,
      phoneNumber: fromFormPhone,
      email: fromFormMail,
      image: fromFormMail
    }
    // console.log(data)
    console.log("register service")
    return this.http.post(`${this.uri}/requestregistration`, data)
  }

  changePassword(usernameFromMemory ,fromFormPasswordOld, fromFormPasswordNew){
    const data = {
      username: usernameFromMemory,
      passwordOld: fromFormPasswordOld,
      passwordNew: fromFormPasswordNew
    }
    return this.http.post(`${this.uri}/changepassword`, data)
  }

  fetchUser(username){
    const data = {
      username: username
    }
    return this.http.post<User>(`${this.uri}/fetchuser`, data)
  }

  fetchAllRequestes(){
    const data = { username: 'username' }
    return this.http.post(`${this.uri}/fetchAllRequests`, data)
  }

  acceptRequest(username){
    const data = {
      username: username
    }
    console.log('accept request service')
    return this.http.post(`${this.uri}/acceptRegistration`, data)
  }

  denyRequest(username){
    const data = {
      username: username
    }
    console.log('deny request service')
    return this.http.post(`${this.uri}/denyRegistration`, data)
  }

  getAll(){
    const data = {}
    return this.http.post(`${this.uri}/fetchAllUsers`, data)
  }

  delete(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/deleteUser`, data)
  }

  change(user){
    const data = {
      user: user
    }
    return this.http.post(`${this.uri}/updateUser`, data)
  }

}