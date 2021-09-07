import { DataResponseModel } from './../models/dataResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = RootURL + "/brands"
  constructor(private httpClient:HttpClient) { }

  getBrands() : Observable<DataResponseModel<Brand[]>> {
    return this.httpClient.get<DataResponseModel<Brand[]>>(this.apiUrl + "/getall")
  }

}
