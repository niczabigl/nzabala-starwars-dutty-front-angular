import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  cacheStorage

  constructor() {
    this.cacheStorage = window.localStorage
  }

  Delete(key: string) {
    return this.cacheStorage.removeItem(key)
  }

  Has(key: string) {
    return this.cacheStorage.getItem(key)?true:false
  }

  Key(index : number) {
    return this.cacheStorage.key(index)
  }

  DeleteAll() {
    return this.cacheStorage.clear()
  }

  Get(key) {
    return this.cacheStorage.getItem(key)
  }

  Add(key : string , value: string) {
    return this.cacheStorage.setItem(key,value)
  }
}
