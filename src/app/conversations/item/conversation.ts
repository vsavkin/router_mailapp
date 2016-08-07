import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '../../shared/model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  moduleId: module.id,
  templateUrl: 'conversation.html',
  styleUrls: ['conversation.css']
})
export class ConversationCmp {
  conversation: Observable<Conversation>;

  constructor(route: ActivatedRoute) {
    this.conversation = route.data.pluck<Conversation>('conversation');
  }
}