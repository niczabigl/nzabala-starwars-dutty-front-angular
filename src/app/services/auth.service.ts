import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../model/user';
import { callbackify } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  Login(user: string, pass: string, callback : Function) {
    let response
    setTimeout(() => {
      this.userService.GetByUserName(user).subscribe((u) => {
        if (u !== null && u.password === pass) {
          response = { success: true }
        } else {
          response = { success: false, message: 'Username or password is incorrect' }
        }
        callback(response)
      })
    }, 1000)
  }

  Register(user: User, callback : Function) {
    let response
    setTimeout(() => {
      this.userService.Create(user).then((res) => {
        if (res) {
          response = { success: true }
        }
        callback(response)
      }, () => {
        response = { success: false, message: 'User allready exist' }
        callback(response)
      })
    }, 1000)
  }

  SetCredentials(username : string, password : string) {
    window.localStorage.setItem('currentUser', JSON.stringify({ username: username, password: password }))
  }

  GetCredentials() {
    let cookies = document.cookie.split(';')
    let user = window.localStorage.getItem('currentUser')
    cookies.forEach((c) => {
      console.log('cookie', c)
    })
    if (!user) {
      return false
    }
    return true
  }
}
