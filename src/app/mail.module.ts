import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, provideRoutes} from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import {ConversationsRepo} from './shared/model';
import {MailAppCmp} from './mail';
import {ConversationCmp, ConversationsCmp, MessageCmp, MessagesCmp} from './conversations/index';

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
            resolve: { messages: 'messagesResolver' },
          },
          {
            path: 'messages/:id',
            component: MessageCmp,
            resolve: { messages: 'messagesResolver', message: 'messageResolver'},
          }
        ]
      }
    ]
  }
];
// clang-format on

// helper to generate a resolver
function resolver(name: string, fn: Function): any {
  return {
    provide: name,
    useFactory: (repo) => (route) => fn(repo, route),
    deps: [ConversationsRepo]
  };
}

@NgModule({
  declarations: [],
  providers: [
    ConversationsRepo,
    resolver('conversationsResolver', (repo, route) => repo.conversations(route.params.folder)),
    resolver('conversationResolver', (repo, route) => repo.conversation(route.params.id)),
    resolver('messagesResolver', (repo, route) => {
      //TODO: we should be able to use the parent's resolved data
      return repo.conversation(route.parent.params.id).
        mergeMap(c => repo.messageTitles(c.messages));
    }),
    resolver('messageResolver', (repo, route) => repo.message(route.params.id))
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule
  ],
  bootstrap: [MailAppCmp]
})
export class MailModule {
}