import { LocalStorageService } from './../../services/local-storage.service';
import { OrderDetail } from './../../models/orderDetail';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userOrders:OrderDetail[] = []

  constructor(
    private paymentService:PaymentService,
    private localStorageService:LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.getUserOrders()
  }


  getUserOrders() {
    let userId = this.localStorageService.GetUserId()
    this.paymentService.getAllUserOrders(userId).subscribe(response => {
      this.userOrders = response.data
    }, errorResponse => {
      console.log(errorResponse)
    })

  }

}
