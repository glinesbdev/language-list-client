import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, Toast, ToastController } from 'ionic-angular';
import { IList } from '../lists/iList';
import { AddWordPage } from '../add-word/add-word';
import { IWord } from '../add-word/iWord';
import { ListWordService } from '../../services/list-word';
import { ListService } from '../../services/list';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
})
export class ListDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private listWordService: ListWordService, private listService: ListService) {
    this.deleteToast = this.toastCtrl.create({
      message: 'Word deleted',
      duration: 3000,
      position: 'top'
    });
  }

  list: IList;
  listId: number;
  items: IWord[];
  deleteToast: Toast;

  ionViewDidLoad() {
    this.list = <IList>this.navParams.get('list');
    this.listId = this.list.id;
    this.items = this.list.items;
  }

  ionViewDidEnter() {
    this.listService.getList(this.listId).subscribe(response => {
      this.list = response.body.list;
      this.items = this.list.items;
    });
  }

  toAddWord(): void {
    this.navCtrl.push(AddWordPage, {
      list: this.list
    });
  }

  toEditWord(item: IWord, slidingItem: ItemSliding): void {
    slidingItem.close();

    this.navCtrl.push(AddWordPage, {
      list: this.list,
      item: item
    });
  }

  deleteWord(id: number, index: number, slidingItem: ItemSliding): void {
    slidingItem.close();
    
    this.listWordService.deleteWord(id).subscribe(response => {
      this.deleteToast.present();
      this.items.splice(index, 1);
    },
    error => console.error(error));
  }

  trackByFn(index: number, word: IWord): number {
    return index;
  }

}
