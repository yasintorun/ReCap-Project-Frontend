import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { LocalStorageKeys, LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  
  userLoggedIn:boolean = false
  
  user:User

  constructor(private localStorageService:LocalStorageService,
              private authService:AuthService,
              private userService:UserService,
    ) { }

  ngOnInit(): void {
    this.setUserLoggedIn()
    this.setUser()
  }

  setUserLoggedIn() {
    this.userLoggedIn = this.authService.isAuthenticated()
  }

  setUser() {
    if(this.userLoggedIn && this.localStorageService.contain(LocalStorageKeys.USER)) {
      this.userService.getUserById(Number.parseInt(this.localStorageService.get(LocalStorageKeys.USER))).subscribe(response => {
        this.user = response.data
        console.log(response)
      }, errorResponse => {
        console.log(errorResponse)
      })
    } else {
      this.user = null
    }
  }


  logout(){
    this.authService.logout()
    this.userLoggedIn = false
  }

}
