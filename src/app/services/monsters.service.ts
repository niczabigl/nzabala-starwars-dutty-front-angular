import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class MonstersService {

  constructor(private http: HttpClient, private AppConfig : AppConfig) { 
  }

  public getAllMonsters(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get(AppConfig.API_ENDPOINT+'species', httpOptions);
  }

  public getMonstersDataPage(page: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get(AppConfig.API_ENDPOINT+'species/?page='+page, httpOptions)
  }
}
