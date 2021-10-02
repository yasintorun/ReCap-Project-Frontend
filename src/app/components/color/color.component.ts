import { ToastrService } from 'ngx-toastr';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = []
  currentColor : Color | null | undefined
  filterText: string = ""

  colorEditForm:FormGroup

  colorAddForm:FormGroup

  constructor(private colorService : ColorService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,) { }

  ngOnInit(): void {
    this.getColors()
    this.createColorEditForm()
    this.createColorAddForm()
  }

  
  createColorEditForm() {
    this.colorEditForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  setCurrentColor(color:Color) {
    this.currentColor = color
    this.colorEditForm.setValue({name:color.name})
  }

  getCurrentColorClass(color:Color) {
    if(color == this.currentColor) {
      return "active"
    }
    return ""
  }

  addColor() {
    if(this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getColors()
      }, errorResponse => {
        console.log(errorResponse)
      })
    } else {
      this.toastrService.error("Hatalı Giriş")
    }
  }

  updateColor() {
    if(this.colorEditForm.valid) {
      let colorModel = Object.assign({}, this.colorEditForm.value)
      colorModel.id = this.currentColor.id
      console.log(colorModel)
      this.colorService.update(colorModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getColors()
      }, errorResponse=> {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Hata");
        }
      })
    }else {
      this.toastrService.error("Hatalı giriş", "Dikkat")
    }
  }

  deleteColor(color: Color) {
    console.log(color)
    Swal.fire({
      title: 'Rengi silmek istediğine emin misin?',
      showCancelButton: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText:"Evet, Sil"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.colorService.delete(color).subscribe(response => {
          Swal.fire('Silindi!', '', 'success')
          this.getColors()
        })
      }
    })
  }

}
