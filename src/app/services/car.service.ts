import { DataResponseModel } from './../models/dataResponseModel';
import { CarDetail } from './../models/carDetail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootURL } from '../Constants';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
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

  getCar(carId:number):Observable<DataResponseModel<Car>> {
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "/getbyid?id="+carId)
  }

  getCarByFilter(brands:string, colors:string, minPrice:number, maxPrice:number) : Observable<DataResponseModel<CarDetail[]>>{
    return this.httpClient.get<DataResponseModel<CarDetail[]>>(this.apiUrl + `/getcarbyfilter`, {
      params: {
        brands:  [brands],
        colors: [colors],
        minPrice: minPrice,
        maxPrice: maxPrice,
      }
    })
  }


  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", car)
  }
  
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", car)
  }

  getCarTotalPrice(carId:number, rentDate:string, returnDate:string) {
    return this.httpClient.get<DataResponseModel<number>>(this.apiUrl + `/getcartotalprice?carId=${carId}&rentDate=${rentDate}&returnDate=${returnDate}`)
  }

  getTotalCarCount():Observable<DataResponseModel<number>>{
    return this.httpClient.get<DataResponseModel<number>>(this.apiUrl + "/totalcarcount")
  }

}
