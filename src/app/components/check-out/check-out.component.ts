import { ResponseModel } from './../../models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { ToastHelper } from './../../utilities/helpers/toastHelper';
import { PaymentService } from './../../services/payment.service';
import { CreditCard } from './../../models/creditCard';
import { Component, OnInit } from '@angular/core';
import { PaymentInfo } from 'src/app/models/paymentInfo';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  creditCard:CreditCard = {
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    CVV: ""
  }

  constructor(private paymentService:PaymentService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }


  Pay() {
    PaymentInfo.creditCard = this.creditCard
    console.log(PaymentInfo)
    this.paymentService.Pay().subscribe(response => {
        this.toastrService.success(response.message)
    },errorResponse => {
      let error:ResponseModel = errorResponse.error
      this.toastrService.error(error.message)
    })
  }

}
