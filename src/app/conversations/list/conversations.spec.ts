import { CUSTOM_ELEMENTS_SCHEMA, SkipSelf, SecurityContext } from '@angular/core';
import { inject, getTestBed, TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Router, provideRoutes, ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ElementSchemaRegistry } from '@angular/compiler';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {addMatchers, advance, elementText} from '../../spec_utils';
import {ConversationsCmp} from './conversations';
import {MailModule} from '../../mail.module';
import {of} from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('ConversationsCmp', () => {
  let conversations: BehaviorSubject<any>;

  beforeEach(async(() => {
    addMatchers();

    conversations = new BehaviorSubject([
      { id: 1, title: 'Title1', user: {name: 'Kate', email: 'katez@example.com'} },
      { id: 2, title: 'Title2', user: {name: 'Corin', email: 'corin@example.com'} }
    ]);

    const params = of({folder: 'inbox'});
    const data = new BehaviorSubject<any>({conversations});

    TestBed.configureCompiler({
      providers: [{ provide: ElementSchemaRegistry, useClass: ElementSchemaRegistryWrapper }]
    })

    TestBed.configureTestingModule({
      declarations: [ConversationsCmp],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: {params, data} }
      ]
    });

    TestBed.compileComponents();
  }));

  it('renders a list of conversations', fakeAsync(() => {
    const f = TestBed.createComponent(ConversationsCmp);
    advance(f);

    expect(f.debugElement.nativeElement).toHaveText('Title1');
    expect(f.debugElement.nativeElement).toHaveText('Title2');
  }));

  it('updates the list of conversations', fakeAsync(() => {
    const f = TestBed.createComponent(ConversationsCmp);
    advance(f);

    conversations.next([
      { id: 3, title: 'Title3', user: {name: 'Someone Else', email: 'someonelse@example.com'} }
    ]);

    advance(f);
    expect(f.debugElement.nativeElement).toHaveText('Title3');
  }));
});

export class ElementSchemaRegistryWrapper implements ElementSchemaRegistry {
  hasProperty(tagName: string, propName: string, schemaMetas: any): boolean {
    return true;
  }

  securityContext(tagName: string, propName: string): any {
    return SecurityContext.NONE;
  }

  getMappedPropName(propName: string): string {
    return propName;
  }

  getDefaultComponentElementName(): string {
    return "DIV";
  }
}
