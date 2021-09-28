import { Injectable } from '@angular/core';

//Tüm key'leri burada tanımla.
export const LocalStorageKeys = {
  USER: "user",
  RENTAL_CAR: "rentalCar",
  TOKEN: "token",
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  //Ana yapılar.
  set(key:string, value:any) {
    localStorage.setItem(key, value)
  }

  remove(key:string) {
    localStorage.removeItem(key)
  }

  get(key:string) {
    return localStorage.getItem(key)
  }

  contain(key:string):boolean {
    if(localStorage.getItem(key)) {
      return true
    } else {
      return false
    }
  }

  GetUserId():number{
    return Number.parseInt(this.get(LocalStorageKeys.USER))
  }

}