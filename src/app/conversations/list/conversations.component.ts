import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '../../shared/conversations_repo';
import 'rxjs/add/operator/pluck';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'conversations',
  templateUrl: 'conversations.component.html',
  styleUrls: ['conversations.component.css']
})
export class ConversationsCmp {
  folder: Observable<string>;
  conversations: Observable<Conversation[]>;

  constructor(route: ActivatedRoute) {
    this.folder = route.params.pluck<string>('folder');
    this.conversations = route.data.pluck<Conversation[]>('conversations');
  }
}
