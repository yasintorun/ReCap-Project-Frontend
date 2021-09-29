import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { CreditCard } from '../models/creditCard';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = RootURL + "/creditcards"
  constructor(
    private httpClient:HttpClient,
    ) { }

  getUserCreditCards(userId:number):Observable<DataResponseModel<CreditCard[]>>{
    return this.httpClient.get<DataResponseModel<CreditCard[]>>(this.apiUrl + "/getusercreditcards?userId="+userId)
  }
}
