import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = RootURL + "/users"
  constructor(private httpClient:HttpClient) { }


  getUserById(userId:number):Observable<DataResponseModel<User>> {
    return this.httpClient.get<DataResponseModel<User>>(this.apiUrl + "/getbyid?id="+userId)
  }

  updateUser(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", user)
  }

}
