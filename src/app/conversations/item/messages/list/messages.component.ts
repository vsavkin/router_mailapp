import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Message} from '../../../../shared/model';

@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css']
})
export class MessagesCmp {
  messages: Observable<Message[]>;

  constructor(route: ActivatedRoute) {
    this.messages = route.data.pluck<Message[]>('messages');
  }
}
