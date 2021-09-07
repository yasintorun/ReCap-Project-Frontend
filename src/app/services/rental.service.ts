import { RentalDetail } from './../models/rentalDetail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootURL } from '../Constants';
import { DataResponseModel } from '../models/dataResponseModel';
import { Rental } from '../models/Rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = RootURL + "/rentals"
  
  constructor(private httpClient:HttpClient) { }

  getRentals() : Observable<DataResponseModel<RentalDetail[]>> {
    return this.httpClient.get<DataResponseModel<RentalDetail[]>>(this.apiUrl + "/getalldetails")
  }

}
