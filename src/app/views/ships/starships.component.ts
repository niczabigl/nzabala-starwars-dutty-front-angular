import { Component, OnInit, SimpleChanges, Output } from '@angular/core';
import { Starship } from '../../model/starship';
import { PubSubService } from '../../services/pubsub.service';
import { StarshipsService } from '../../services/starships.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { NotificacionType } from '../../model/notification'

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class StarshipsComponent implements OnInit {

  dataSource : MatTableDataSource<Starship>;
  fullDataSource : MatTableDataSource<Starship>;
  dataSourceFiltered : MatTableDataSource<Starship>;

  columnsToDisplay = ['name', 'model', 'starship_class', 'manufacturer', 'passengers', 'consumables'];
  expandedElement: Starship;

  filter : string;
  constructor(private pubsub : PubSubService, private shipsService : StarshipsService) { }

  ngOnInit() {
    this.shipsService.getStarshipDataPage('1').subscribe(
      (data:any) =>
      {
        this.fullDataSource = new MatTableDataSource(data.results)
        this.dataSource = this.fullDataSource
      }
    )
    
  }

  applyFilter() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getStarshipDataPage(page : string){
    this.shipsService.getStarshipDataPage(page).subscribe(
    (data:any) => {
      if (!data || data.length === 0 ) {
        //this.notification = new Notificacion('No items found', NotificacionType.ERROR);
        this.pubsub.emit('showSnackbar', 'No items found', NotificacionType.ERROR)
      } else {
        this.dataSource = new MatTableDataSource(data);
        //this.notification = new Notificacion(`Items found ${data.entity.length}`, NotificacionType.INFO);
        this.pubsub.emit('showSnackbar', `Items found ${data.length}`, NotificacionType.SUCCESS)
      }
    })
  }

  getStarshipDetail (details : Object) {
    this.pubsub.emit('showModal', 'Starship', details)
  }
}