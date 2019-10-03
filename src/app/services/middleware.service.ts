import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CacheService } from './cache.service';
import { PubSubService } from './pubsub.service';
import { NotificacionType } from '../model/notification'

@Injectable()
export class MiddlewareService implements HttpInterceptor {

  constructor(protected router: Router, private cacheService : CacheService, private pubSub : PubSubService) { }

  // if there are any issue about credential to production, we can add to all request new headers os something we need to call our API
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept', req)
    let shieldedUrl = req.url.includes(AppConfig.API_ENDPOINT)
    if (shieldedUrl) {
      let lastServerCallCache = this.cacheService.Get('lastServerCallCache')
      // Si aún no ha hecho una llamada, permitir la petición
      if (!lastServerCallCache) {
        let nowDate = new Date()
        let nowDateNumber = nowDate.getTime() / 1000
        this.cacheService.Add('lastServerCallCache', nowDateNumber.toString())
        return next.handle(req)
      } else { // conseguir de la cache la instancia de la última petición al servidor "configurado por url" y calcular el tiempo de transcurso
        const timeToNextCall = 3
        let nowDate = new Date()
        let nowDateNumber = nowDate.getTime() / 1000
        if ((nowDateNumber - Number(lastServerCallCache)) > timeToNextCall) {
          this.cacheService.Add('lastServerCallCache', nowDateNumber.toString())
          return next.handle(req)
        } else {
          let msg = (timeToNextCall - (nowDateNumber - Number(lastServerCallCache))).toString()
          this.pubSub.emit('showStaticSnackbar', `Call not allowed need to wait ${msg} seconds`, NotificacionType.ERROR )
          return Observable.throw(`Call not allowed need to wait ${timeToNextCall - (nowDateNumber - Number(lastServerCallCache))} seconds`)
        }
      }
    } else {
      return next.handle(req)
    }
  }
}
