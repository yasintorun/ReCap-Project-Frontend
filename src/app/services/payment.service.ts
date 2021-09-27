import { PaymentInfo } from 'src/app/models/paymentInfo';
import { ResponseModel } from './../models/responseModel';
import { CreditCard } from './../models/creditCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = RootURL + "/payments"

  constructor(private httpClient: HttpClient) { }

  Pay(payment:Payment) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/pay", payment)
  }

}
