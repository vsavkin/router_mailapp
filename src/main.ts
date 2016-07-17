import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MailApp, MailModule, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(MailApp, {
  modules: [MailModule]
});
