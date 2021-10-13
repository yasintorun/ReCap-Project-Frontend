import { CarImageService } from './../../services/car-image.service';
import { Brand } from './../../models/brand';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  successResultIcon:string = `<i class="bi bi-check-lg me-2 text-success"></i>`
  errorResultIcon:string = `<i class="bi bi-exclamation-lg me-2 text-danger"></i>`

  carAddForm:FormGroup
  carDetailAddForm:FormGroup
  
  maxCarImageCount:number = 2 //En fazla kaç foto yüklenebilsin?

  colors:Color[] = []
  brands:Brand[] = []
  years:number[] = Array.from({length:32},(v,k)=>k+1990) //1990 ile 2021 arasındaki tüm sayıları diziye atar. TODO: 32 sayısını dinamik yap.

  filePaths: string[] = [];
  carPhotoForm:FormGroup
  carPhotos:File[] = []
  
  transmissions:string[] = ["Manuel", "Otomatik"] //vites tipleri
  fuels:string[] = ["Dizel", "Benzin", "Lpg", "Gaz"] // Yakıt tipleri

  spinnerText:string = ""
  constructor(private formBuilder:FormBuilder,
              private carImageService:CarImageService,
              private toastrService:ToastrService,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private spinner: NgxSpinnerService,
              ) { }

  ngOnInit(): void {
    this.createCarAddForm()
    this.createCarDetailAddForm()
    this.getAllColors()
    this.getAllBrands()
    
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      dailyPrice:["",Validators.required],
      description: ["", Validators.required],
      name: ["", Validators.required],
      findexPuan: ["", Validators.required]
    })
  }

  createCarDetailAddForm() {
    this.carDetailAddForm = this.formBuilder.group({
      modelYear:["",Validators.required ],
      transmission: ["", Validators.required],
      fuel: ["", Validators.required],
      seatCount: ["", Validators.required],
    })
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

  checkCarAddButton() {
    return this.carAddForm.valid // && this.carDetailAddForm.valid && this.carPhotos.length>0  
  }

  imagePreview(e:any) {
    const file = (e.target as HTMLInputElement).files[0];

    this.carPhotos.push(file)

    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.push(reader.result as string);
    }
    reader.readAsDataURL(file)
    console.log(e)
    e.srcElement.value = ""
  }


  AddCar() {

    if(!this.checkCarAddButton()) {
      this.toastrService.error("Hatalı Giriş Lütfen Bilgileri Kontrol Edin")
      return
    }

    let carModel = Object.assign({}, this.carAddForm.value)
    carModel.brandId = parseInt(this.carAddForm.value.brandId)
    carModel.colorId = parseInt(this.carAddForm.value.colorId)
    
    carModel = Object.assign({...carModel}, this.carDetailAddForm.value)
    carModel.modelYear = parseInt(this.carDetailAddForm.value.modelYear)

  
    this.spinnerText = "Araba Genel Bilgileri Giriliyor..."
    this.spinner.show();



    //TODo: Model Year Çalışmıyor. Backend patlıyor.
    this.carService.add(carModel).subscribe(response => {
      this.spinnerText = "Araba bilgileri eklendi. Araba fotoğrafları yükleniyor.."
      
      this.carPhotos.forEach(photo => {
        this.carImageService.uploadCarImage(photo, response.data.id).subscribe(photoResponse => {
          console.log(photoResponse)
          this.spinner.hide()
        }, errorResponse => {
          console.log(errorResponse)
          this.errorOccurred()
        })
      });

    }, errorResponse => {
      console.log(errorResponse)
      this.errorOccurred()
    })

    return
    
  }

  removePhoto(index:number) {
    this.filePaths.splice(index, 1)
    this.carPhotos.splice(index, 1)
  }

  checkCarImageCount() {
    return this.carPhotos.length < this.maxCarImageCount
  }


  errorOccurred() {
    this.spinnerText = "Hata oluştu. Tekrar deneyin.."
    setTimeout(() => {
      this.spinner.hide()
    }, 1000);
  }
}