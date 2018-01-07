import { Component } from '@angular/core';
import { LoginService } from '../../services/login';
import { UserService } from '../../services/user';
import { StorageService } from '../../services/storage';
import { LoginModel } from './loginModel';
import { UserModel } from '../user/userModel';
import { NavController, AlertController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private loginService: LoginService, private userService: UserService, private storageService: StorageService, private navCtrl: NavController, private alert: AlertController) {}

  model: LoginModel = new LoginModel();
  tabs: HTMLElement = <HTMLElement>document.querySelector('.tabbar.show-tabbar');
  user: UserModel;

  ionViewDidLoad(): void {
    if (this.storageService.getLogin() && this.storageService.getLogin().length) {
      let userId = this.storageService.getUserId();

      this.userService.getUser(userId).subscribe((response: any) => {
        this.user = response.body.user;
      },
      error => this.showErrorAlert(error),
      () => {
        this.navCtrl.setRoot(TabsPage, {
          user: this.user
        });
      });
    }
  }

  ionViewDidEnter(): void {
    if (this.tabs) {
      this.tabs.style.display = 'none';
    }
  }

  ionViewWillLeave(): void {
    if (this.tabs) {
      this.tabs.style.display = 'flex';
    }
  }

  onLogin():void {
    this.loginService.login(this.model).subscribe((response: any) => {
        this.user = response.body.data;
        this.storageService.setLogin(JSON.stringify(this.populateHeaders(response.headers)));
      },
      error => this.showErrorAlert(error),
      () => {
      this.navCtrl.setRoot(TabsPage, {
        user: this.user
      });
    });
  }

  private showErrorAlert(error: any): void {
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
      'userLanguage': this.user.language,
      'access-token': headers.get('access-token'),
      'client': headers.get('client'),
      'token-type': headers.get('token-type'),
      'expiry': headers.get('expiry'),
      'uid': headers.get('uid')
    };

    return data;
  }

}