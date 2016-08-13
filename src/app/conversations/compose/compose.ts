import 'rxjs/add/operator/pluck';

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Actions, Conversation} from '../../shared/model';

@Component({moduleId: module.id, templateUrl: 'compose.html', styleUrls: ['compose.css']})
export class ComposeCmp {
  form =
      new FormGroup({title: new FormControl('', Validators.required), body: new FormControl('')});

  constructor(private router: Router, private actions: Actions) {}

  onSubmit() {
    const conversationRoute = this.router.routerState.snapshot.root.firstChild.firstChild;
    const conversationId = +conversationRoute.params['id'];

    this.actions.next({
      type: 'reply',
      conversationId: conversationId,
      payload: this.form.value,
      onSuccess: () => this.hidePopup()
    });
  }

  private hidePopup() { this.router.navigate(['/', {outlets: {popup: null}}]); }
}