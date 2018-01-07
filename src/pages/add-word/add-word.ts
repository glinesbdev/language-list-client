import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, Toast, ToastController } from 'ionic-angular';
import { IList } from '../lists/iList';
import { ListWordService } from '../../services/list-word';
import { TranslationService } from '../../services/translation';
import { StorageService } from '../../services/storage';
import { IWord } from './iWord';

@Component({
  selector: 'page-add-word',
  templateUrl: 'add-word.html',
})
export class AddWordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public translateLoad: LoadingController, public toastCtrl: ToastController, private listWordService: ListWordService, private translationService: TranslationService, private storageService: StorageService) {
    this.updatedToast = this.toastCtrl.create({
      message: 'Word Updated',
      duration: 3000,
      position: 'top'
    });
  }

  word: string;
  translation: string;
  context: string;
  list: IList;
  item: IWord;
  updatedToast: Toast;
  editing: boolean = false;

  ionViewDidLoad() {
    this.list = this.navParams.get('list');
    this.item = this.navParams.get('item');

    if (this.item) {
      this.word = this.item.word;
      this.translation = this.item.translation;
      this.context = this.item.context === 'undefined' ? '' : this.item.context;
      this.editing = true;
    }
  }

  addWord(): void {
    let item = {
      word: this.word,
      translation: this.translation,
      context: this.context,
      word_list_id: this.list.id
    };

    if (this.item) {
      item['id'] = this.item.id;
    }

    if (!this.editing) {
      this.listWordService.addWord(item).subscribe(response => {
        this.updatedToast.present();
        this.navCtrl.pop();      
      },
      error => console.error(error));
    } else {
      this.listWordService.editWord(item).subscribe(response => {
        this.updatedToast.present();
        this.navCtrl.pop();      
      },
      error => console.error(error));
    }
  }

  translate(word: string, translation: boolean = true): void {
    let alert = this.translateLoad.create({
      content: 'Getting Translation...'
    });

    alert.present();

    let body = {
      from: this.storageService.getUserLanguage().toLocaleLowerCase(),
      to: this.list.language.toLocaleLowerCase(),
      words: [word]
    };
    
    this.translationService.getTranslation(body).subscribe(response => {
      if (translation) {
        this.translation = response.body.words[0];
      } else {
        this.context = response.body.words[0];
      }
    },
    error => console.error(error),
    () => {
      alert.dismiss();
    });
  }

}
