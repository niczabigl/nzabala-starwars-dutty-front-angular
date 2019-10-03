import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { NotificacionType } from '../../model/notification';
import { PubSubService } from '../../services/pubsub.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private pubsub : PubSubService, private snackBar: MatSnackBar, private cd: ChangeDetectorRef) { 
    this.pubsub.on('showSnackbar', this.showNotification.bind(this))
    this.pubsub.on('showStaticSnackbar', this.showStaticNotification.bind(this))
    this.pubsub.on('showLoading', this.showLoading.bind(this))
    this.pubsub.on('hideLoading', this.hideLoading.bind(this))
  }

  ngOnInit() {
    this.cd.detectChanges()
  }

  showNotification (message : string, type:string ){
    if((message != undefined || message != null) && message.length > 0){
      let backGroundColor = this.getTypeNotification(type);
      this.snackBar.open(message, "Close", {
        duration: 3000, 
        horizontalPosition : this.horizontalPosition,
        verticalPosition : this.verticalPosition,
        panelClass: [backGroundColor]
      });
    }
  }

  showStaticNotification (message : string, type:string ){
    if((message != undefined || message != null) && message.length > 0){
      let backGroundColor = this.getTypeNotification(type);
      setTimeout(() => { 
        this.snackBar.open(message, "Close", {
        horizontalPosition : this.horizontalPosition,
        verticalPosition : this.verticalPosition,
        panelClass: [backGroundColor]
      })})
    }
  }

  showLoading () {

  }

  hideLoading () {

  }

  getTypeNotification(type:string): string{
    switch(type){
      case NotificacionType.SUCCESS:
        return 'success-snackbar';
      case NotificacionType.ERROR:
        return 'error-snackbar';
      case NotificacionType.WARNING:
        return 'warning-snackbar';
      case NotificacionType.INFO:
        return 'info-snackbar';
    }
  }
}
