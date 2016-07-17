import {AppModule} from '@angular/core';
import {RouterModule, provideRoutes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Conversation} from './conversation/conversation.component';
import {Conversations} from './conversations/conversations.component';

@AppModule({
  providers: [
    provideRoutes([
      { path: '', pathMatch: 'full', redirectTo: '/conversations' },
      {
        path: 'conversations',
        children: [
          { path: '', component: Conversations },
          { path: ':id', component: Conversation }
        ]
      }
    ])
  ],
  modules: [RouterModule, FormsModule]
})
export class MailModule {
}