import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conversation, Actions} from '../../shared/model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  moduleId: module.id,
  templateUrl: 'compose.html',
  styleUrls: ['compose.css']
})
export class ComposeCmp {
  form = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(private router: Router, private actions: Actions) {}

  onSubmit() {
    const conversationRoute =
      this.router.routerState.snapshot.root.firstChild.firstChild;
    const conversationId = +conversationRoute.params['id'];

    this.actions.next({
      type: 'reply',
      conversationId: conversationId,
      payload: this.form.value
    });
  }
}