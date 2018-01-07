import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, ItemSliding, ToastController, Toast } from 'ionic-angular';
import { ListService } from '../../services/list';
import { IList } from './iList';
import { ListDetailPage } from '../list-detail/list-detail';
import { AddListPage } from '../add-list/add-list';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html',
})
export class ListsPage {

  constructor(public navCtrl: NavController, private loading: LoadingController, private toastCtrl: ToastController, private listService: ListService) {
    this.listLoad = this.loading.create({
      content: 'Loading data...'
    });

    this.deleteToast = this.toastCtrl.create({
      message: 'List deleted',
      duration: 3000,
      position: 'top'
    });
  }

  lists: IList[];
  listLoad: Loading;
  deleteToast: Toast;

  ionViewDidLoad() {
    this.listService.getLists().subscribe(response => {
      this.lists = response.body;
    },
    error => console.error(error),
    () => {
      this.listLoad.dismiss();
    }); 
  }

  ionViewDidEnter() {
    this.listService.getLists().subscribe(response => {
      this.lists = response.body;
    },
    error => console.error(error));
  }

  toListDetail(list: IList, slidingItem: ItemSliding): void {
    slidingItem.close();

    this.navCtrl.push(ListDetailPage, {
      list: list
    });
  }

  toAddList(): void {
    this.navCtrl.push(AddListPage);
  }

  deleteList(list: IList, index: number, slidingItem: ItemSliding): void {
    this.listService.deleteList(list.id).subscribe(response => {
      this.deleteToast.present();
      this.lists.splice(index, 1);
    },
    error => console.error(error));
  }

  trackByFn(index: number, list: IList) {
    return list.id;
  }

}
