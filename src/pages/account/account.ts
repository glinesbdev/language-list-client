import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController, ViewController, Loading } from 'ionic-angular';

import { UserService } from '../../services/user';
import { StorageService } from '../../services/storage';
import { LoginService } from '../../services/login';
import { LanguageService } from '../../services/language';

import { IUser } from '../user/iUser';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public alert: AlertController, public loadingCtrl: LoadingController, public toast: ToastController, public viewCtrl: ViewController, private userService: UserService, private storageService: StorageService, private loginService: LoginService, private languageService: LanguageService) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Data...'
    });
  }

  user: IUser;
  languages: string[];
  email: string;
  username: string;
  language: string;
  loading: Loading
  dirty: boolean = false;
  updatingLoad: Loading;

  ionViewDidLoad(): void {
    let id = this.storageService.getUserId();

    this.userService.getUser(id).subscribe(response => {
      this.user = response.body.user;
    },
    error => console.error(error),
    () => {
      this.setItems();
      this.loading.dismiss();
    });

    this.languageService.getLanguages().subscribe(response => {
      this.languages = response.body.languages;
    },
    error => console.error(error));
  }

  setState(): boolean {
    if (this.user.email !== this.email || this.user.username !== this.username || this.user.language !== this.language) {
      this.dirty = true;
    } else {
      this.dirty = false;
    }

    return this.dirty;
  }

  onUpdate(): void {
    this.updatingLoading();

    this.userService.updateUser(this.user).subscribe(response => {
      this.user = response.body.user;
    },
    error => console.error(error),
    () => {
      this.dirty = false;
      this.setItems();
      this.updatingLoad.dismiss();
      this.updatedToast();
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  private updatingLoading(): void {
    this.updatingLoad = this.loadingCtrl.create({
      content: 'Updating...'
    });

    this.updatingLoad.present();
  }

  private updatedToast(): void {
    let toast = this.toast.create({
      message: 'Update successsful',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  private setItems(): void {
    this.email = this.user.email;
    this.username = this.user.username;
    this.language = this.user.language;
  }

}
