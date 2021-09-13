import { ResponseModel } from './../../models/responseModel';
import { ToastrService } from "ngx-toastr";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ToastHelper {
    constructor(
        private toastrService:ToastrService,
    ){}

    Show(responseModel:ResponseModel) {
        console.log(responseModel)
        if(responseModel.success) {
            this.toastrService.success(responseModel.message)
        } else {
            this.toastrService.error(responseModel.message)
        }
    }

}