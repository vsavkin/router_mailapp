import {ComposeCmp} from './compose';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * This is an example of an isolate test. There is nothing router-specific here.
 * We instantiate a component, without rendereing its template, and exercises it direclty.
 */
describe('ComposeCmp', () => {
  it('submits an action', () => {
    const actions = new BehaviorSubject(null);

    const route = {
      snapshot: {
        root: {
          firstChild: {
            firstChild: { params: { id: 11 } }
          }
        }
      }
    };

    const c = new ComposeCmp(<any>route, null, actions);
    c.form.setValue({title: 'actualTitle', body: 'actualBody'});
    c.onSubmit();

    expect(actions.value.conversationId).toEqual(11);
    expect(actions.value.payload).toEqual({title: 'actualTitle', body: 'actualBody'});
  });
});