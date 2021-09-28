import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, LocalStorageKeys } from './../../services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userEditProfileForm:FormGroup

  user:User
  userId: number
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }


  createUserEditProfileForm() {
    this.userEditProfileForm = this.formBuilder.group({
      firstName:[this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.email],
      phone: [this.user.phone, Validators.required],
    })
  }

  getUser() {
    let userId = this.localStorageService.GetUserId()
    if(!userId) {
      return //ToDo: Giriş ekranına postala
    }
    this.userService.getUserById(userId).subscribe(response => {
      this.user = response.data
      this.createUserEditProfileForm()
    }, errorResponse => {
      console.log(errorResponse) //ToDo: Toast ile bilgilendir.
    })
  }

  updateUser() {
    if(this.userEditProfileForm.valid) {
      let userId = this.localStorageService.GetUserId()
      let userModel = Object.assign({id:userId}, this.userEditProfileForm.value)
      console.log(userModel)
      this.userService.updateUser(userModel).subscribe(response => {
        console.log(response)
        this.getUser()
      }, errorResponse => {
        console.log(errorResponse)
      })
    }
    else {
      this.toastrService.error("Bilgiler eksik.", "Hata")
    }
  }

}
