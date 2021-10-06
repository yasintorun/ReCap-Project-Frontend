import { CreditCardService } from './../../services/credit-card.service';
import { RentalService } from './../../services/rental.service';
import { HostRoot } from './../../Constants';
import { CarImage } from './../../models/carImage';
import { CarImageService } from './../../services/car-image.service';
import { Rental } from './../../models/Rental';
import { CarAllDetail } from '../../models/carAllDetail';
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
    id:undefined,
    userId: undefined,
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    CVV: ""
  }

  userCreditCards:CreditCard[] = []
  selectedCreditCard:number = -1

  useSaveCreditCard:boolean = true

  rentalCarModel:Rental
  carDetail:CarAllDetail
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
              private creditCardService:CreditCardService,
              ) { }

  ngOnInit(): void {
    this.createCreditCardForm()
    this.setRentalCarModel()
    this.showDateWithMonthName(this.rentalCarModel.rentDate)
    this.getTotalPrice()
    this.getUserCreditCards()
  }

  getUserCreditCards() {
    let userId = this.localStorageService.GetUserId()
    this.creditCardService.getUserCreditCards(userId).subscribe(response => {
      this.userCreditCards = response.data
      this.useSaveCreditCard = response.data.length > 0
    }, errorResponse => {
      console.log(errorResponse)
    })
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardName: ["", Validators.required],
      cardNumber: ["", Validators.required],
      month: ["", Validators.required],
      year: ["", Validators.required],
      cvv: ["", Validators.required],
      save: [false],
    })
  }

  pay(creditCard:CreditCard) {
    let payment = new PaymentInfo()
    payment.userId = this.localStorageService.GetUserId()
    payment.creditCard = creditCard
    payment.carId = this.carDetail.carId

    this.paymentService.rentCar(payment, this.creditCardForm.value.save).subscribe(response => {
      this.toastrService.success(response.message)
    }, errorResponse=> {
      this.toastrService.error(errorResponse.error.message, "Hata!")
    })
  }

  Pay2() {
    if(this.creditCardForm.valid) {
      let creditCardModel = Object.assign({expirationDate: ""}, this.creditCardForm.value)
      //console.log(creditCardModel)
      creditCardModel.year = String(creditCardModel.year).substring(2,4)
      creditCardModel.expirationDate = creditCardModel.month + "/" + creditCardModel.year
      
      this.pay(this.creditCard)
      
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


  SelectCreditCardToPay(creditCard:CreditCard) {
    this.selectedCreditCard = creditCard.id
    console.log(creditCard)
    this.creditCard = creditCard
  }

  useOtherCard() {
    this.useSaveCreditCard = false
    this.creditCard = {
      id:undefined,
      userId: undefined,
      cardName: "",
      cardNumber: "",
      expirationDate: "",
      CVV: ""
    }
    this.selectedCreditCard = -1
  }

  useSaveCard() {
    this.useSaveCreditCard = true
  }

}
