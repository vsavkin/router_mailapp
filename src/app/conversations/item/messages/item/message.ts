import 'rxjs/add/operator/mergeAll';

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../../shared/model';

@Component({
  templateUrl: './message.html',
  styleUrls: ['./message.css']
})
export class MessageCmp {
  message: Observable<Message>;
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = (<any>route.data.pluck('messages')).mergeAll();
    this.message = route.data.pluck('message');
  }
}
