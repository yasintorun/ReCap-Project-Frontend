import { HostRoot } from './../../../Constants';
import { CarAllDetail } from './../../../models/carAllDetail';
import { LocalStorageService, LocalStorageKeys } from './../../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from './../../../services/rental.service';
import { CarService } from './../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImageService } from './../../../services/car-image.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-admin-car-detail',
  templateUrl: './admin-car-detail.component.html',
  styleUrls: ['./admin-car-detail.component.css']
})
export class AdminCarDetailComponent implements OnInit {
  carImages: CarImage[] = []
  carDetail: CarAllDetail | null | undefined

  todayDate: Date

  carRentDatesForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router
    ){ }

  ngOnInit(): void {
    this.todayDate = new Date()
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]) {
        this.getCarImages(params["carId"])
        this.getCarDetail(params["carId"])
      } else {
        window.location.pathname = "/cars"
      }
    })
    this.createCarRentDatesForm()
  }

  createCarRentDatesForm() {
    this.carRentDatesForm = this.formBuilder.group({
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required],
    })
  }

  getCarImages(carId:number) {
    this.carImageService.getCarImages(carId).subscribe(response => {
      this.carImages = response.data
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetail(carId).subscribe(response => {
      this.carDetail = response.data
      if(response.success == false || response.data == null) {
        window.location.pathname = "/cars"
      }
    })
  }

  getCarImagePath(imagePath:string) {
    return HostRoot + imagePath
  }


  getCarImageActiveClass(first:boolean) {
    if(first) {
      return "active"
    }
    return ""
  }

  checkOut() {
    if(this.carRentDatesForm.valid) {
      let rentalModel = {
        carId: this.carDetail.carId,
        ...this.carRentDatesForm.value 
      }
      
      this.localStorageService.set(LocalStorageKeys.RENTAL_CAR, JSON.stringify(rentalModel))
      this.router.navigateByUrl('/checkout')
      
    }
  }


  rentCar() {
    // let rental:Rental = {
    //   carId: this.carDetail.carId, 
    //   customerId: 3, //Todo : dinamik yap
    //   returnDate: null,
    //   rentDate: null
    // }
    // this.rentalService.rentCar(rental).subscribe(response => {
    //   this.toastrService.success(response.message)
    // }, errorResponse => {
    //   let error:ResponseModel = errorResponse.error
    //   this.toastrService.error(error.message)
    // })
  }
}
