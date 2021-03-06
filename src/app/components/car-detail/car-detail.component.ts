import Swal from 'sweetalert2';
import { LocalStorageService, LocalStorageKeys } from './../../services/local-storage.service';
import { ResponseModel } from './../../models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { Rental } from './../../models/Rental';
import { RentalService } from './../../services/rental.service';
import { CarService } from './../../services/car.service';
import { CarAllDetail } from 'src/app/models/carAllDetail';
import { HostRoot } from './../../Constants';
import { CarImageService } from './../../services/car-image.service';
import { CarImage } from './../../models/carImage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = []
  carDetail: CarAllDetail | null | undefined

  todayDate: Date

  carRentDatesForm:FormGroup

  userRole:string = "admin"

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

  ButtonsByRole() {
    switch(this.userRole) {
      case "":
        return  "L??tfen Giri?? Yap??n"  
      case "admin":
        return `
          <button class="btn btn-success fw-bolder" style="font-size: 20px;" type="button" data-bs-toggle="modal" data-bs-target="#rentACar">Arabay?? D??zenle</button>
          <button class="btn btn-danger fw-bolder" style="font-size: 20px;" type="button" data-bs-toggle="modal" data-bs-target="#rentACar">Arabay?? Sil</button>  
        `
    }
    return ""
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


  deleteCar() {
    Swal.fire({
      title: 'Arabay?? silmek istedi??ine emin misin?',
      showCancelButton: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText:"Evet, Sil"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.carService.delete(this.carDetail.carId).subscribe(response => {
          Swal.fire('Silindi!', '', 'success')
        }, errorResponse => {
          console.log(errorResponse)
        })
      }
    })
  }
}
