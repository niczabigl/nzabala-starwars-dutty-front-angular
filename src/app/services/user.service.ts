import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  GetUsers() : Observable<User[]> {
    return of(this.getUsers())
  }

  Create(user : User) {
    let users = this.getUsers()
    let auxusers = users.filter(u => u.username === user.username)
    return new Promise ((resolve, reject) => {
      if (auxusers.length) {
        reject({ Success: false })
      } else {
        users.push(user)
        this.setUsers(users)
        resolve({ Success: true })
      }
    })
  }

  Delete() : void {

  }

  GetByUserName(username) : Observable<User> {
    let users = this.getUsers()
    users.filter(u => u.username = username)
    return of(users.length ? users[0] : null)
  }

  getUsers () {
    if (!window.localStorage.users) {
      window.localStorage.users = JSON.stringify([])
    }
    return JSON.parse(window.localStorage.users)
  }

  setUsers (users) {
    window.localStorage.users = JSON.stringify(users)
  }
}
