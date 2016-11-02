import 'rxjs/add/operator/mergeMap';

import {NgModule, Provider} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, provideRoutes} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {of } from 'rxjs/observable/of';

import {ComposeCmp, ConversationCmp, ConversationsCmp, MessageCmp, MessagesCmp} from './conversations/index';
import {MailAppCmp} from './mail';
import {Actions, Repo} from './shared/model';

import 'rxjs/add/operator/map';


// clang-format off
const routes = [
  {path: '', pathMatch: 'full', redirectTo: '/inbox'},
  {
    path: ':folder',
    children: [
      {
        path: '',
        component: ConversationsCmp,
        resolve: { conversations: 'conversationsResolver' }
      },
      {
        path: ':id',
        component: ConversationCmp,
        resolve: { conversation: 'conversationResolver' },
        children: [
          {
            path: '',
            component: MessagesCmp,
            resolve: { messages: 'messagesResolver'},
          },
          {
            path: 'messages/:id',
            component: MessageCmp,
            resolve: { messages: 'messagesResolver', message: 'messageResolver'},
          }
        ]
      }
    ]
  },
  {
    path: 'compose',
    component: ComposeCmp,
    outlet: 'popup'
  }
];
// clang-format on

// helper to generate a resolver
function resolver(name: string, fn: Function): any {
  return {provide: name, useFactory: (repo) => (route) => of (fn(repo, route)), deps: [Repo]};
}

@NgModule({
  declarations:
      [MailAppCmp, ConversationCmp, ConversationsCmp, MessageCmp, MessagesCmp, ComposeCmp],
  providers: [
    Repo, Actions,
    resolver('conversationsResolver', (repo, route) => repo.conversations(route.params.folder)),
    resolver('conversationResolver', (repo, route) => repo.conversation(+route.params.id)),
    resolver('messagesResolver', (repo, route) => repo.messageTitles(+route.parent.params.id)),
    resolver('messageResolver', (repo, route) => repo.message(+route.params.id))
  ],
  imports: [
    RouterModule.forRoot(routes), ReactiveFormsModule, BrowserModule, MaterialModule
  ],
  bootstrap: [MailAppCmp]
})
export class MailModule {
}