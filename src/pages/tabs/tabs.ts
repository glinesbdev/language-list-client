import { Component } from '@angular/core';

import { ListsPage } from '../lists/lists';
import { AccountPage } from '../account/account';
import { ReviewPage } from '../review/review';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  reviewRoot = ReviewPage;
  listsRoot = ListsPage;
  accountRoot = AccountPage;

  constructor() {

  }
}
