import { Router } from '@angular/router';
import { RegisterModel } from './../models/registerModel';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';
import { RootURL } from './../Constants';
import { DataResponseModel } from './../models/dataResponseModel';
import { TokenModel } from './../models/tokenModel';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/loginModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = RootURL+ "/auth"
  
  constructor(private httpClient:HttpClient,
              private localStorageService:LocalStorageService,
              private router:Router,
              ) {}

  login(loginModel:LoginModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "/login", loginModel)
  }

  register(registerModel:RegisterModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "/register", registerModel)
  }

  isAuthenticated() {
    return this.localStorageService.contain(LocalStorageKeys.TOKEN)
  }

  authenticate(tokenModel:TokenModel) {
    this.localStorageService.set(LocalStorageKeys.TOKEN, tokenModel.token)
    this.localStorageService.set(LocalStorageKeys.USER, tokenModel.userId)
    this.router.navigate([""])
    window.location.reload()
  }


  logout() {
    this.localStorageService.remove(LocalStorageKeys.TOKEN)
    this.localStorageService.remove(LocalStorageKeys.USER)
    this.router.navigate([""])
  }

}
