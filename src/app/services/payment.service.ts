import { Payment } from './../models/payment';
import { PaymentInfo } from 'src/app/models/paymentInfo';
import { ResponseModel } from './../models/responseModel';
import { CreditCard } from './../models/creditCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = RootURL + "/payments"

  constructor(private httpClient: HttpClient) { }

  Pay() : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/pay", PaymentInfo)
  }

}
