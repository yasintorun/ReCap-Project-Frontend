import { RentalService } from 'src/app/services/rental.service';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  totalMoneyEarned:number = 0
  totalUserCount:number = 0
  totalRentalCount:number = 0
  totalCarCount:number = 0
  constructor(
    private paymentService:PaymentService,
    private userService:UserService,
    private carService:CarService,
    private rentalService:RentalService,
  ) { }

  ngOnInit(): void {
    this.getTotalMoneyEarned()
    this.getTotalUserCount()
    this.getTotalRentalCount()
    this.getTotalCarCount()
  }


  getTotalMoneyEarned() {
    this.paymentService.getTotalMoneyEarned().subscribe(response => {
      this.totalMoneyEarned = response.data
      console.log(response)
    }, errorResponse => {
      console.log(errorResponse)
    })
  }

  getTotalUserCount() {
    this.userService.getTotalUserCount().subscribe(response => {
      this.totalUserCount = response.data
    }, errorResponse => {
      console.log(errorResponse)
    })
  }


  getTotalRentalCount() {
    this.rentalService.getTotalRentalCount().subscribe(response => {
      this.totalRentalCount = response.data
    }, errorResponse => {
      console.log(errorResponse)
    })
  }

  getTotalCarCount() {
    this.carService.getTotalCarCount().subscribe(response => {
      this.totalCarCount = response.data
    }, errorResponse => {
      console.log(errorResponse)
    })
  }


}
