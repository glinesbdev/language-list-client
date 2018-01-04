import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoginService } from '../../services/login';
import { UserService } from '../../services/user';
import { StorageService } from '../../services/storage';
import { LoginModel } from './loginModel';
import { UserModel } from '../user/userModel';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IUser } from '../user/iUser';
import { HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService, private userService: UserService, private storageService: StorageService, private nav: NavController, private alert: AlertController) {}

  model: LoginModel = new LoginModel();
  user: UserModel;

  ngOnInit(): void {
    if (this.storageService.getLogin() && this.storageService.getLogin().length) {
      let userId = JSON.parse(this.storageService.getLogin())['userId'];

      this.userService.getUser(userId).subscribe((response: any) => {
        this.user = response.body.user;
      },
      error => this.showErrorAlert(error),
      () => {
        this.nav.push(HomePage, {
          user: this.user
        });
      });
    }
  }

  onLogin():void {
    this.loginService.login(this.model).subscribe((response: any) => {
        this.user = response.body.data;
        this.storageService.setLogin(JSON.stringify(this.populateHeaders(response.headers)));
      },
      error => this.showErrorAlert(error),
      () => {
      this.nav.push(HomePage, {
        user: this.user
      });
    });
  }

  private showErrorAlert(error: any) {
    let alert = this.alert.create({
      title: 'Error!',
      subTitle: error.error.errors[0],
      buttons: ['Ok']
    });

    alert.present();
  }

  private populateHeaders(headers: HttpHeaders): Object {
    let data = {
      'userId': this.user.id,
      'access-token': headers.get('access-token'),
      'client': headers.get('client'),
      'token-type': headers.get('token-type'),
      'expiry': headers.get('expiry'),
      'uid': headers.get('uid')
    };

    return data;
  }

}