import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '../../shared/conversations_repo';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  moduleId: module.id,
  selector: 'conversation',
  templateUrl: 'conversation.component.html',
  styleUrls: ['conversation.component.css']
})
export class ConversationCmp {
  conversation: Observable<Conversation>;

  constructor(route: ActivatedRoute) {
    this.conversation = route.data.pluck<Conversation>('conversation');
  }
}