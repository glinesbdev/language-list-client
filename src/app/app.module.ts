import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ReviewPage } from '../pages/review/review';
import { ReviewDetailPage } from '../pages/review-detail/review-detail';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { ListsPage } from '../pages/lists/lists';
import { AddListPage } from '../pages/add-list/add-list';
import { ListDetailPage } from '../pages/list-detail/list-detail';
import { AddWordPage } from '../pages/add-word/add-word';

import { LoginService } from '../services/login';
import { StorageService } from '../services/storage';
import { UserService } from '../services/user';
import { LanguageService } from '../services/language';
import { ListService } from '../services/list';
import { ListWordService } from '../services/list-word';
import { TranslationService } from '../services/translation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpHelper } from '../helpers/httpHelper';

import { FlashCardComponent } from '../components/flash-card/flash-card';

@NgModule({
  declarations: [
    MyApp,
    ReviewPage,
    ReviewDetailPage,
    AboutPage,
    LoginPage,
    ListsPage,
    AddListPage,
    ListDetailPage,
    AddWordPage,
    AccountPage,
    TabsPage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReviewPage,
    ReviewDetailPage,
    AboutPage,
    LoginPage,
    ListsPage,
    AddListPage,
    ListDetailPage,
    AddWordPage,
    AccountPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    StorageService,
    UserService,
    ListService,
    ListWordService,
    LanguageService,
    TranslationService,
    HttpHelper,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
