import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

/**
 * Data
 */
export type User = {
  id: number;
  name: string;
  email: string;
};

export type Conversation = {
  id: number,
  title: string,
  user: User;
  messages: number[],
  folder: string
};

export type Message = {
  id: number;
  title: string;
  body: string;
  user: User;
};

export type AuthToken = string;

export class Repo {
  static users = [
    { id: 0, name: 'Victor', email: 'victors@example.com' },
    { id: 1, name: 'Kate', email: 'katez@example.com' },
    { id: 2, name: 'Someone Else', email: 'someoneelse@example.com' }
  ];

  static conversations = [
    {
      id: 0,
      user: Repo.users[0],
      title: "The Myth of Sisyphus",
      messages: [0, 1],
      folder: 'inbox'
    },
    {
      id: 1,
      user: Repo.users[1],
      title: "The Nicomachean Ethics",
      messages: [2, 3],
      folder: 'inbox'
    },
    {
      id: 2,
      user: Repo.users[0],
      title: 'A Fraft Conversation',
      messages: [4],
      folder: 'drafts'
    }
  ];

  static messages = [
    {
      id: 0,
      title: 'The Path of the Absurd Man',
      body: 'The absurd man embraces the principles of revolt, freedom, and passion. What does it mean by freedom?',
      user:  Repo.users[0]
    },
    {
      id: 1,
      title: 'Re: The Path of the Absurd Man',
      body: 'He means leaving without the appeal.',
      user:  Repo.users[1]
    },

    {
      id: 2,
      title: 'Virtue as the Mean',
      body: 'Does he mean it is not a goal or that it is intermediate?',
      user:  Repo.users[0]
    },
    {
      id: 3,
      title: 'Re: Virtue as the Mean',
      body: 'He means it as "intermediate", a virtue lies between excess and defect',
      user:  Repo.users[2]
    },
    {
      id: 4,
      title: 'Draft Message',
      body: 'Draft Message Body',
      user:  Repo.users[0]
    }
  ];

  conversations(folder: string): Observable<Conversation[]> {
    return of(Repo.conversations.filter(c => c.folder === folder));
  }

  conversation(id: number): Observable<Conversation> {
    return of(Repo.conversations[id]);
  }

  messageTitles(ids: number[]): Observable<Message[]> {
    return of(Repo.messages.
      filter(m => ids.indexOf(m.id) > -1).
      map(b => ({id: b.id, title: b.title, user: b.user, body: null})));
  }

  message(id: number): Observable<Message> {
    return of(Repo.messages[id]);
  }
}