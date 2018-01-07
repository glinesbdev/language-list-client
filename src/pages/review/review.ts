import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../services/list';
import { IList } from '../lists/iList';
import { ReviewDetailPage } from '../review-detail/review-detail';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: ListService) {}

  lists: IList[];

  ionViewDidLoad() {
    this.listService.getLists().subscribe(response => {
      this.lists = response.body;
    },
    error => console.error(error));
  }

  ionViewDidEnter() {
    this.listService.getLists().subscribe(response => {
      this.lists = response.body;
    },
    error => console.error(error));
  }

  toReviewDetail(list: IList): void {
    this.navCtrl.push(ReviewDetailPage, {
      list: list
    });
  }

}
