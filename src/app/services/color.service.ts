import { Color } from 'src/app/models/color';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = RootURL + "/colors"

  constructor(private httpClient:HttpClient) { }

  getColors() : Observable<DataResponseModel<Color[]>> {
    return this.httpClient.get<DataResponseModel<Color[]>>(this.apiUrl + "/getall")
  }

  add(color:Color) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", color)
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", color)
  }

  delete(color:Color):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete", color)
  }

}

