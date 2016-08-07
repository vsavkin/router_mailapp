import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Conversation} from '../../shared/model';
import 'rxjs/add/operator/pluck';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'conversations',
  templateUrl: 'conversations.html',
  styleUrls: ['conversations.css']
})
export class ConversationsCmp {
  folder: Observable<string>;
  conversations: Observable<Conversation[]>;

  constructor(route: ActivatedRoute) {
    this.folder = route.params.pluck<string>('folder');
    this.conversations = route.data.pluck<Conversation[]>('conversations');
  }
}
