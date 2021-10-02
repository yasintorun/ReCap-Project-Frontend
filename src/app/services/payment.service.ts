import { OrderDetail } from './../models/orderDetail';
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

  rentCar(paymentInfo:PaymentInfo, creditCardSave:boolean) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/pay?save="+creditCardSave, paymentInfo)
  }

  getAllUserOrders(userId:number):Observable<DataResponseModel<OrderDetail[]>> {
    return this.httpClient.get<DataResponseModel<OrderDetail[]>>(this.apiUrl + "/getalluserorders?userId="+userId)
  }


  getAllPayments():Observable<DataResponseModel<Payment[]>>{
    return this.httpClient.get<DataResponseModel<Payment[]>>(this.apiUrl +"/getall")
  }

  getTotalMoneyEarned():Observable<DataResponseModel<number>> {
    return this.httpClient.get<DataResponseModel<number>>(this.apiUrl + "/totalmoneyearned")
  }

}
