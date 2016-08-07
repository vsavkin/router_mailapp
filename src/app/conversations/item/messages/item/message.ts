import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Message} from '../../../../shared/model';

@Component({
  moduleId: module.id,
  templateUrl: 'message.html',
  styleUrls: ['message.css']
})
export class MessageCmp {
  message: Message;
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = route.data.pluck<Message[]>('messages');
    route.data.subscribe(d => this.message = d['message']);
  }
}
