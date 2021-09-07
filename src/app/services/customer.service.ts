import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { Customer } from '../models/customer';
import { DataResponseModel } from '../models/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = RootURL + "/customers"

  constructor(private httpClient: HttpClient) { }

  getCustomers() : Observable<DataResponseModel<Customer[]>> {
    return this.httpClient.get<DataResponseModel<Customer[]>>(this.apiUrl + "/getall")
  }

}
