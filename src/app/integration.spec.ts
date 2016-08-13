import {MailModule} from './mail.module';
import { addProviders, async, inject } from '@angular/core/testing';

describe('integration specs', () => {
  it('should work', () => {
    console.log("lala", MailModule);

    expect(1).toEqual(2);
  });
});