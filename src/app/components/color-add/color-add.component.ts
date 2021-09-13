import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup
  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  add() {
    if(this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)

      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(response.message)
      }, errorResponse => {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i].ErrorMessage, "Hata");
        }
      });

    } else {
      this.toastrService.error("Hatalı giriş", "Dikkat")
    }
  }

}
