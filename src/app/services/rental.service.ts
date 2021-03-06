import { PaymentInfo } from 'src/app/models/paymentInfo';
import { RentalDetail } from './../models/rentalDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';
import { Rental } from '../models/Rental';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = RootURL + "/rentals"
  
  constructor(private httpClient:HttpClient) { }

  getRentals() : Observable<DataResponseModel<RentalDetail[]>> {
    return this.httpClient.get<DataResponseModel<RentalDetail[]>>(this.apiUrl + "/getalldetails")
  }

  rentCar(paymentInfo:PaymentInfo, creditCardSave:boolean) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/rentcar?save="+creditCardSave, paymentInfo)
  }

  getTotalRentalCount():Observable<DataResponseModel<number>>{
    return this.httpClient.get<DataResponseModel<number>>(this.apiUrl + "/totalrentalcount")
  }
  
}
