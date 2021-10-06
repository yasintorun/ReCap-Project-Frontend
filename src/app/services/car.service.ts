import { ResponseModel } from './../models/responseModel';
import { CarDetail } from 'src/app/models/carDetail';
import { DataResponseModel } from './../models/dataResponseModel';
import { CarAllDetail } from '../models/carAllDetail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootURL } from '../Constants';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = RootURL + "/cars"
  apiUrlForDetail = RootURL + "/cardetails"

  constructor(private httpClient:HttpClient) { }


  getCars() : Observable<DataResponseModel<CarAllDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarAllDetail[]>>(this.apiUrl + "/getcardetails");
  }

  getCarsByBrandName(brand : string) : Observable<DataResponseModel<CarAllDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarAllDetail[]>>(this.apiUrl + "/getcarsbybrand?brand="+brand)
  }


  getCarsByColorName(color : string) : Observable<DataResponseModel<CarAllDetail[]>> {
    return this.httpClient.get<DataResponseModel<CarAllDetail[]>>(this.apiUrl + "/getcarsbycolor?color="+color)
  }

  getCarDetail(carId:number):Observable<DataResponseModel<CarAllDetail>>{
    return this.httpClient.get<DataResponseModel<CarAllDetail>>(this.apiUrl + "/getcardetail?carId=" + carId)
  }

  getCar(carId:number):Observable<DataResponseModel<Car>> {
    return this.httpClient.get<DataResponseModel<Car>>(this.apiUrl + "/getbyid?id="+carId)
  }

  getCarByFilter(brands:string, colors:string, minPrice:number, maxPrice:number) : Observable<DataResponseModel<CarAllDetail[]>>{
    return this.httpClient.get<DataResponseModel<CarAllDetail[]>>(this.apiUrl + `/getcarbyfilter`, {
      params: {
        brands:  [brands],
        colors: [colors],
        minPrice: minPrice,
        maxPrice: maxPrice,
      }
    })
  }


  add(car:Car):Observable<DataResponseModel<Car>>{
    return this.httpClient.post<DataResponseModel<Car>>(this.apiUrl + "/add", car)
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


  AddCarDetail(carDetail:CarDetail):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrlForDetail + "/add", carDetail)
  }

}
