import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, provideRoutes} from '@angular/router';

import {ConversationsRepo} from './shared/conversations_repo';
import {MailAppCmp} from './mail.component';
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
        resolve: {
          conversations: 'conversationsResolver'
        }
      },
      {
        path: ':id',
        component: ConversationCmp,
        children: [
          {path: '', component: MessagesCmp},
          {path: ':id', component: MessageCmp}
        ]
      }
    ]
  }
];
// clang-format on

@NgModule({
  declarations: [],
  providers: [
    ConversationsRepo,
    {
      provide: 'conversationsResolver',
      useFactory: (repo) => (route) => repo.conversations(route.params.folder),
      deps: [ConversationsRepo]
    }
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