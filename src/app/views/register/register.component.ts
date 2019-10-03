import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PubSubService } from '../../services/pubsub.service';
import { NotificacionType } from '../../model/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : string;
  pass : string;

  registerForm

  // constructor(authService : AuthService) { }

  constructor(private authService : AuthService, private formBuilder: FormBuilder, private pubSub : PubSubService, private router : Router) { 
    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      name: '',
      lastname: ''
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onSubmit (values) {
    let res = this.authService.Register(values, (res) => {
      if(res.success) {
        this.router.navigateByUrl('/login');
      } else {
        this.pubSub.emit('showSnackbar', res.message , NotificacionType.ERROR)
      }
      
    })
  }

}

