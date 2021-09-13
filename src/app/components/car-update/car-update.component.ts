import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Brand } from './../../models/brand';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  currentCar:Car
  carEditForm:FormGroup
  colors:Color[] = []
  brands:Brand[] = []
  years:number[] = []
  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if(params["car"]) {
        this.getCar(params["car"])
      } else {
        this.NotFound()
      }
    })



    
    this.getAllColors()
    this.getAllBrands()
    this.getModelYearsOptions(1990, 2021)
  }

  createCarUpdateForm() {
    this.carEditForm = this.formBuilder.group({
      brandId: [this.currentCar.brandId, Validators.required],
      colorId: [this.currentCar.colorId, Validators.required],
      modelYear:[this.currentCar.modelYear,Validators.required ],
      dailyPrice:[this.currentCar.dailyPrice,Validators.required],
      description: [this.currentCar.description, Validators.required]
    })
  }

  update() {
    if(this.carEditForm.valid) {
      let carModel = Object.assign({}, this.carEditForm.value)

      carModel.brandId = parseInt(this.carEditForm.value.brandId)
      carModel.colorId = parseInt(this.carEditForm.value.colorId)
      carModel.modelYear = parseInt(this.carEditForm.value.modelYear)
      carModel.id = this.currentCar.id
      console.log(carModel)

      Swal.fire({
        title: 'Rengi silmek istediğine emin misin?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "green",
        confirmButtonText:"Evet, güncelle"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.carService.update(carModel).subscribe(response => {
            Swal.fire('Güncellendi!', '', 'success')
          }, errorResponse => {
            console.log(errorResponse)
          })
        }
      })
    
    }
  }


  getAllColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getModelYearsOptions(min:number, max:number){
    for (let i = min; i <= max; i++) {
      this.years.push(i)
    }
  }

  getCar(carId:number) {
    this.carService.getCar(carId).subscribe(response => {
      console.log(response)
      if(response.success && response.data) {
        this.currentCar = response.data
        this.createCarUpdateForm()
      } else {
        this.NotFound()
      }
    })
  }

  NotFound() {
    console.log("asdasd");
    window.location.pathname = "/"
  }

}
