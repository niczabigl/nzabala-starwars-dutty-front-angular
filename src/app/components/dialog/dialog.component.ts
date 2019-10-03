import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { PubSubService } from '../../services/pubsub.service'
import { Starship } from '../../model/starship'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private pubsub : PubSubService, private modal: MatDialog) {
    this.pubsub.on('showModal', this.showModal.bind(this))
  } 

  ngOnInit() {
  }

  showModal (type: string, data : Object) {
    switch(type) {
      default:
        this.modal.open(DialogOverviewStarship, {
          data: data
        })
      break
    }
  }

}

@Component({
  selector: 'ship-overview-dialog',
  templateUrl: 'dialog-overview-ship.html',
})
export class DialogOverviewStarship implements OnInit {

  private _IMG_URL : string = 'https://starwars-visualguide.com/assets/img/starships/{{$}}.jpg'
  selectedStarship: Starship
  

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewStarship>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pubsub : PubSubService) {}

  ngOnInit(): void {
    var url = this.data.url
    var id = url.split('/').filter(function (item) {
      return item !== ''
    }).slice(-1)[0]
    this.data.url = this._IMG_URL.replace('{{$}}', id)
    this.onStarShipSelect(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onStarShipSelect ( p : Starship) {
    this.selectedStarship = p
  }

  onEditClick (data: Object) {
    // this.pubsub.emit('editUserPolicies', 
    //   { 
    //     cliid: this.data.cliid, 
    //     cliname: this.data.cliname, 
    //     policies: this.data.policies 
    //   }
    // )
  }
}