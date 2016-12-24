import 'rxjs/add/operator/mergeMap';

import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, ActivatedRouteSnapshot} from '@angular/router';
import {MaterialModule} from '@angular/material';

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

export function conversationsResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) => repo.conversations(route.params['folder']);
}

export function conversationResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) => repo.conversation(+route.params['id']);
}

export function messagesResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) =>  repo.messageTitles(+route.parent.params['id']);
}

export function messageResolver(repo: Repo) {
  return (route: ActivatedRouteSnapshot) => repo.message(+route.params['id']);
}

@NgModule({
  declarations:
      [MailAppCmp, ConversationCmp, ConversationsCmp, MessageCmp, MessagesCmp, ComposeCmp],
  providers: [
    Repo, Actions,
    {provide: 'conversationsResolver', useFactory: conversationsResolver, deps: [Repo]},
    {provide: 'conversationResolver', useFactory: conversationResolver, deps: [Repo]},
    {provide: 'messagesResolver', useFactory: messagesResolver, deps: [Repo]},
    {provide: 'messageResolver', useFactory: messageResolver, deps: [Repo]}
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true}), ReactiveFormsModule, BrowserModule, MaterialModule.forRoot()
  ],
  bootstrap: [MailAppCmp]
})
export class MailModule {
}