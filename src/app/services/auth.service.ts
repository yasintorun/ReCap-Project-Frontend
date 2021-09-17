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
  
  constructor(private httpClient:HttpClient) {}

  login(loginModel:LoginModel):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + "/login", loginModel)
  }

  isAuthenticated() {
    if(localStorage.getItem("token")) {
      return true
    } else {
      return false
    }
  }

}
