import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IUser } from '../user/iUser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: IUser;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
  }

}
