import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { IList } from '../lists/iList';
import { ListDetailPage } from '../list-detail/list-detail';

@Component({
  selector: 'page-review-detail',
  templateUrl: 'review-detail.html',
})
export class ReviewDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController) {
    this.list = this.navParams.get('list');
    this.noEntryAlert = this.alert.create({
      title: 'No Items!',
      subTitle: 'Add words to review them',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add Words',
          handler: () => {
            this.navCtrl.setRoot(ListDetailPage, {
              list: this.list
            });
          }
        }
      ]
    });
  }

  list: IList;
  noEntryAlert: Alert;

  ionViewDidLoad() {  
  }

  ionViewCanEnter(): boolean {
    if (!this.list.items) {
      this.noEntryAlert.present();
      return false;
    }

    return true;
  }

}
