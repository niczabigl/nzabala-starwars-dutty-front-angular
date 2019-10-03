import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PubSubService } from '../../services/pubsub.service';
import { NotificacionType } from '../../model/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string;
  pass : string;

  loginForm

  // constructor(authService : AuthService) { }

  constructor(private authService : AuthService, private formBuilder: FormBuilder, private pubSub : PubSubService, private router : Router) { 
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onSubmit (values) {
    this.authService.Login(values.username, values.password, (res) => {
      if(res.success) {
        this.authService.SetCredentials(values.username, values.password)
        this.router.navigateByUrl('/ships');
      } else {
        this.pubSub.emit('showSnackbar', 'Username or password is incorrect', NotificacionType.ERROR)
      }
      
    })
  }

}
