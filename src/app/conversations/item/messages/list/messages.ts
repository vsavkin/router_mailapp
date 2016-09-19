import 'rxjs/add/operator/mergeAll';

import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Message} from '../../../../shared/model';

@Component({
  templateUrl: 'messages.html',
  styleUrls: ['messages.css']
})
export class MessagesCmp {
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = route.data.pluck<any>('messages').mergeAll();
  }
}