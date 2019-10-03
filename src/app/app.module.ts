import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatToolbarModule } from '@angular/material/';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout/';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app-config';

import { MenuComponent } from './views/menu/menu.component';
import { StarshipsComponent } from './views/ships/starships.component';
import { MonstersComponent } from './views/monsters/monsters.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DialogComponent, DialogOverviewStarship } from './components/dialog/dialog.component';

import { StarshipsService } from './services/starships.service';
import { MonstersService } from './services/monsters.service';
import { PubSubService } from './services/pubsub.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CacheService } from './services/cache.service';
import { MiddlewareService } from './services/middleware.service';


import { Monster } from '../app/model/monster'
import { Starship } from './model/starship';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    StarshipsComponent,
    MonstersComponent,
    NotificationComponent,
    DialogComponent,
    DialogOverviewStarship,
    LoginComponent,
    RegisterComponent
  ],
  exports: [ RouterModule ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [
    AppConfig,
    StarshipsService,
    MonstersService,
    PubSubService,
    AuthService,
    UserService,
    CacheService,
    ErrorStateMatcher,
    { provide: MatDialogRef, useValue: {} },
    { provide: Monster, useValue: {} },
    { provide: Starship, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: MiddlewareService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewStarship
  ]
})
export class AppModule{}