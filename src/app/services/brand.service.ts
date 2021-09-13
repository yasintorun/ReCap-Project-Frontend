import { Brand } from './../models/brand';
import { DataResponseModel } from './../models/dataResponseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = RootURL + "/brands"
  constructor(private httpClient:HttpClient) { }

  getBrands() : Observable<DataResponseModel<Brand[]>> {
    return this.httpClient.get<DataResponseModel<Brand[]>>(this.apiUrl + "/getall")
  }

  add(brand:Brand):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/add", brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", brand)
  }

  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/delete", brand)
  }

}
