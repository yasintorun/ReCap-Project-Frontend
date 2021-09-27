import { RentalService } from './../../services/rental.service';
import { HostRoot } from './../../Constants';
import { CarImage } from './../../models/carImage';
import { CarImageService } from './../../services/car-image.service';
import { Rental } from './../../models/Rental';
import { CarDetail } from './../../models/carDetail';
import { CarService } from './../../services/car.service';
import { LocalStorageService, LocalStorageKeys } from './../../services/local-storage.service';
import { ResponseModel } from './../../models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { ToastHelper } from './../../utilities/helpers/toastHelper';
import { PaymentService } from './../../services/payment.service';
import { CreditCard } from './../../models/creditCard';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  rentalCarModel:Rental
  carDetail:CarDetail
  carImage:CarImage
  creditCardForm:FormGroup

  totalPrice:number = 0

  months:string[] = ["Ay", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] 

  years:string[] = ["Yıl", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"]

  constructor(private paymentService:PaymentService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private localStorageService:LocalStorageService ,
              private router:Router,
              private carService:CarService,
              private carImageService:CarImageService,
              private rentalService:RentalService,
              ) { }

  ngOnInit(): void {
    this.createCreditCardForm()
    this.setRentalCarModel()
    this.showDateWithMonthName(this.rentalCarModel.rentDate)
    this.getTotalPrice()
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardName: ["", Validators.required],
      cardNumber: ["", Validators.required],
      month: ["", Validators.required],
      year: ["", Validators.required],
      cvv: ["", Validators.required],
    })
  }

  Pay2() {
    if(this.creditCardForm.valid) {
      let creditCardModel = Object.assign({expirationDate: ""}, this.creditCardForm.value)
      //console.log(creditCardModel)
      creditCardModel.year = String(creditCardModel.year).substring(2,4)
      creditCardModel.expirationDate = creditCardModel.month + "/" + creditCardModel.year
      
      let payment = new PaymentInfo()
      payment.userId = 3 //TODO: dinamik yap.
      payment.creditCard = creditCardModel
      payment.carId = this.carDetail.carId

      this.rentalService.rentCar(payment).subscribe(response => {
        this.toastrService.success(response.message)
      }, errorResponse=> {
        this.toastrService.error(errorResponse.error.message, "Hata!")
      })
    }else {
      console.log("Kredi kartı hatalı")
    }
  }

  setRentalCarModel() {
    this.rentalCarModel = JSON.parse(this.localStorageService.get(LocalStorageKeys.RENTAL_CAR))
    if(!this.rentalCarModel) {
      this.router.navigateByUrl("/")
    } else {
      this.getCarById()
    }
  }


  getCarById() {
    console.log(this.rentalCarModel)
    this.carService.getCarDetail(this.rentalCarModel.carId).subscribe(response => {
      this.carDetail = response.data
    // console.log(response)
      this.getCarImage(response.data.carId)
    }, errorResponse => {
      //console.log(errorResponse)
    })
  }

  
  showDateWithMonthName(dateString:string) {
    if(dateString == "") return "Bilinmiyor"
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
      "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      
    const date = new Date(dateString)
    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear()
  }

  getCarImage(carId:number) {
    this.carImageService.getFirstImageByCarId(carId).subscribe(response => {
      this.carImage = response.data
      this.carImage.imagePath = HostRoot + response.data.imagePath
      //console.log(response)
    }, errorResponse => {
      //console.log(errorResponse)
    })
  }


  getTotalPrice() {
    this.carService.getCarTotalPrice(this.rentalCarModel.carId, this.rentalCarModel.rentDate, this.rentalCarModel.returnDate).subscribe(response => {
     // console.log(response)
      this.totalPrice = response.data
    }, errorResponse => {
    //  console.log(errorResponse)
    })
  }

}
