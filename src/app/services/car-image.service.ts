import { CarImage } from './../models/carImage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl = RootURL + "/carimage"
  
  constructor(private httpClient:HttpClient) { }
  
  getCarImages(carId:number) : Observable<DataResponseModel<CarImage[]>> {
    return this.httpClient.get<DataResponseModel<CarImage[]>>(this.apiUrl + "/getCarImagesByCarId?carId="+carId)
  }

  getFirstImageByCarId(carId:number):Observable<DataResponseModel<CarImage>>  {
    return this.httpClient.get<DataResponseModel<CarImage>>(this.apiUrl + "/getfirstimagebycarid?carId="+carId)
  }

}
