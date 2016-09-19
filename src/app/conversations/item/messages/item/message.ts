import 'rxjs/add/operator/mergeAll';

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../../shared/model';

@Component({
  templateUrl: 'message.html',
  styleUrls: ['message.css']
})
export class MessageCmp {
  message: Observable<Message>;
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = route.data.pluck<any>('messages').mergeAll();
    this.message = route.data.pluck<any>('message').mergeAll();
  }
}
