import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
    console.log(this.validate('email'))
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmedContract: [false, Validators.requiredTrue],
    })
  }

  register() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value)
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        console.log(response)
        this.toastrService.success(response.message)
        this.authService.authenticate(response.data)
      }, errorResponse => {
        console.log(errorResponse)
      })
    } else {
      this.toastrService.error("Bilgileri eksik girdiniz.", "HATA")
    }
  }

  validate(formControlName:string) {
    let formControl = this.registerForm.get(formControlName)
    
    if(!formControl.touched) {
      return true //Kullanıcı daha input alanına girmemiş.
    }

    return formControl.errors == null
  }

}
