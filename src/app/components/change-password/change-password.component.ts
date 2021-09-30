import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  changePasswordForm:FormGroup

  constructor(
    private FormBuilder:FormBuilder,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private userService:UserService,
  ) { }

  ngOnInit(): void {
    this.createChangePasswordForm()
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.FormBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordRepeat: ["", Validators.required],
    })
  }



  changePassword() {
    if(this.changePasswordForm.valid) {
      let userId = this.localStorageService.GetUserId()
      let passwordModel = Object.assign({userId: userId}, this.changePasswordForm.value)
      if(passwordModel.newPassword != passwordModel.newPasswordRepeat) {
        this.toastrService.error("Şifreler uyuşmuyor")
        return
      }

      this.userService.changePassword(passwordModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      }, errorResponse => {
        this.toastrService.error(errorResponse?.error?.message, "Hata")
      })

    
    }
    else {
      this.toastrService.error("Hatalı giriş", "Hata")
    }
  }

}
