import { Component, OnInit, SimpleChanges, Output } from '@angular/core';
import { Monster } from '../../model/monster';
import { PubSubService } from '../../services/pubsub.service';
import { MonstersService } from '../../services/monsters.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { NotificacionType } from '../../model/notification'

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MonstersComponent implements OnInit {

  dataSource : MatTableDataSource<Monster>;
  fullDataSource : MatTableDataSource<Monster>;
  dataSourceFiltered : MatTableDataSource<Monster>;

  columnsToDisplay = ['name', 'classification', 'designation', 'language'];
  expandedElement: Monster;

  filter : string;
  constructor(private pubsub : PubSubService, private monstersService : MonstersService) { }

  ngOnInit() {
    this.monstersService.getMonstersDataPage('1').subscribe(
      (data:any) =>
      {
        console.log('DATA', data)
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
    this.monstersService.getMonstersDataPage(page).subscribe(
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