import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  constructor(private http: HttpClient, private AppConfig : AppConfig) { 
  }

  public getAllStarships(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get(AppConfig.API_ENDPOINT+'starships', httpOptions)
  }

  public getStarshipDataPage(page: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.get(AppConfig.API_ENDPOINT+'starships/?page='+page, httpOptions)
  }

}
