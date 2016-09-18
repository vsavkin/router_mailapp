import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/skip';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


/**
 * Data
 */
export type User = {
  id: number; name: string; email: string;
};

export type Conversation = {
  id: number, title: string, user: User; folder: string
};

export type Message = {
  id: number; conversationId: number; title: string; body: string; user: User;
};

export type AppState = {
  conversations: Conversation[]; messages: Message[];
};

export type Reply = {
  type: 'reply'; conversationId: number; payload: {title: string; body: string;};
  onSuccess: Function;
};

export type Action = Reply;

export class Actions extends Subject<Action> {}

@Injectable()
export class Repo {
  users: User[] = [
    {id: 0, name: 'Victor', email: 'victors@example.com'},
    {id: 1, name: 'Kate', email: 'katez@example.com'},
    {id: 2, name: 'Someone Else', email: 'someoneelse@example.com'}
  ];

  initState: AppState = {
    conversations: [
      {id: 0, user: this.users[0], title: 'The Myth of Sisyphus', folder: 'inbox'},
      {id: 1, user: this.users[1], title: 'The Nicomachean Ethics', folder: 'inbox'},
      {id: 2, user: this.users[0], title: 'A Fraft Conversation', folder: 'drafts'}
    ],

    messages: [
      {
        id: 0,
        conversationId: 0,
        title: 'The Path of the Absurd Man',
        body:
            'The absurd man embraces the principles of revolt, freedom, and passion. What does it mean by freedom?',
        user: this.users[0]
      },
      {
        id: 1,
        conversationId: 0,
        title: 'Re: The Path of the Absurd Man',
        body: 'He means leaving without the appeal.',
        user: this.users[1]
      },
      {
        id: 2,
        conversationId: 1,
        title: 'Virtue as the Mean',
        body: 'Does he mean it is not a goal or that it is intermediate?',
        user: this.users[0]
      },
      {
        id: 3,
        conversationId: 1,
        title: 'Re: Virtue as the Mean',
        body: 'He means it as "intermediate", a virtue lies between excess and defect',
        user: this.users[2]
      },
      {
        id: 4,
        conversationId: 2,
        title: 'Draft Message',
        body: 'Draft Message Body',
        user: this.users[0]
      }
    ]
  };

  private id: number = 100;

  state: Observable<AppState>;

  constructor(actions: Actions) {
    this.state = this.stateFn(actions);
    this.setUpEffects(actions);
  }

  conversations(folder: string): Observable<Conversation[]> {
    return this.state.map(s => s.conversations.filter(c => c.folder === folder));
  }

  conversation(id: number): Observable<Conversation> {
    return this.state.map(s => s.conversations.filter(c => c.id === id)[0]).take(1);
  }

  messageTitles(conversationId: number): Observable<Message[]> {
    return this.state.map(s => s.messages.filter(m => m.conversationId === conversationId));
  }

  message(id: number): Observable<Message> {
    return this.state.map(s => s.messages.filter(m => m.id === id)[0]).take(1);
  }

  private setUpEffects(actions: Actions) {
    this.state.skip(1).zip(actions).subscribe(p => p[1].onSuccess(p[0]));
  }

  private nextMessageId(): number { return this.id++; }

  private stateFn(actions: Observable<Action>): Observable<AppState> {
    const r = actions.scan((state, v) => {
      if (v.type === 'reply') {
        return {
          conversations: state.conversations,
          messages: this.reduceMessages(state.messages, v)
        };
      } else {
        return state;
      }
    }, this.initState);
    return wrapIntoBehavior(this.initState, r);
  }

  private reduceMessages(messages: Message[], v: Action): Message[] {
    if (v.type === 'reply') {
      const newMessage = {
        id: this.nextMessageId(),
        conversationId: v.conversationId,
        title: v.payload.title,
        body: v.payload.body,
        user: this.users[0]
      };
      return [...messages, newMessage];
    } else {
      return messages;
    }
  }
}

function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}