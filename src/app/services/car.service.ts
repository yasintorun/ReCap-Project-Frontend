import { CarDetail } from './../models/carDetail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootURL } from '../Constants';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Car } from '../models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = RootURL + "/cars"

  constructor(private httpClient:HttpClient) { }


  getCars() : Observable<DataResponseModel<CarDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarDetail[]>>(this.apiUrl + "/getcardetails");
  }

  getCarsByBrandName(brand : string) : Observable<DataResponseModel<CarDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarDetail[]>>(this.apiUrl + "/getcarsbybrand?brand="+brand)
  }


  getCarsByColorName(color : string) : Observable<DataResponseModel<CarDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarDetail[]>>(this.apiUrl + "/getcarsbycolor?color="+color)
  }

  getCarDetail(carId:number):Observable<DataResponseModel<CarDetail>>{
    return this.httpClient.get<DataResponseModel<CarDetail>>(this.apiUrl + "/getcardetail?carId=" + carId)
  }

  getCarByFilter(brand:string, color:string) : Observable<DataResponseModel<CarDetail[]>>{
    return this.httpClient.get<DataResponseModel<CarDetail[]>>(this.apiUrl + `/getcarbyfilter?brand=${brand}&color=${color}`)
  }

}
