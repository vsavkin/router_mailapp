import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {addMatchers, advance } from '../../spec_utils';
import {ConversationsCmp} from './conversations';
import {of} from 'rxjs/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * This is an example of a "shallow" test.
 * We render a component without rendering any of its children.
 *
 * TODO: remove AllowAllElementSchemaRegistry
 */
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

    TestBed.configureTestingModule({
      declarations: [ConversationsCmp],
      providers: [
        { provide: ActivatedRoute, useValue: {params, data} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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