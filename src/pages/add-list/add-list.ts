import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../services/list';
import { StorageService } from '../../services/storage';
import { IList } from '../lists/iList';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html',
})
export class AddListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private listService: ListService, private storageService: StorageService, private languageService: LanguageService) {}

  name: string;
  language: string;
  languages: string[];
  userId: number;
  editing: boolean = false;

  ionViewDidLoad() {
    this.userId = this.storageService.getUserId();
    let item: IList = this.navParams.get('item');

    if (item) {
      this.name = item.name;
      this.language = item.language;
      this.editing = true;
    }

    this.languageService.getLanguages().subscribe(response => {
      this.languages = response.body.languages;
    },
    error => console.error(error));
  }

  addList(): void {
    let body = {
      name: this.name,
      language: this.language,
      userId: this.userId
    };

    this.listService.addList(body).subscribe(response => {
      this.navCtrl.pop();
    },
    error => console.error(error));
  }

}
