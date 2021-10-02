import { PaymentService } from './../../../services/payment.service';
import { Payment } from './../../../models/payment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-payment-list',
  templateUrl: './admin-payment-list.component.html',
  styleUrls: ['./admin-payment-list.component.css']
})
export class AdminPaymentListComponent implements OnInit {

  payments:Payment[] = []

  constructor(
    private paymentService:PaymentService,
  ) { }

  ngOnInit(): void {
    this.getPayments()
  }


  getPayments() {
    this.paymentService.getAllPayments().subscribe(response => {
      console.log(response)
      this.payments = response.data
    }, errorResponse => {
      console.log(errorResponse)
    })
  }

}
