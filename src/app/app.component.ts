import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Star Wars Dutty';
  
  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit() {
    this.isUserLogin()

    // in RootControler, we have a watcher to detect everytime router-link change, to do some needed stuff
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart) {
        console.log(val)
      }
    })
  }

  isUserLogin() {
    let userLogin = this.authService.GetCredentials()
    if(!userLogin) {
      let notAllowedPage = ['/login', '/register', '/menu'].indexOf(window.location.pathname)
      return notAllowedPage === -1 ? window.location.pathname = 'login' : false
    }
    return true
  }
}
