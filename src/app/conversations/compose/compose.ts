import 'rxjs/add/operator/pluck';

import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Actions} from '../../shared/model';


@Component({
  templateUrl: 'compose.html',
  styleUrls: ['compose.css']
})
export class ComposeCmp {
  form =
      new FormGroup({title: new FormControl('', Validators.required), body: new FormControl('')});

  constructor(private route: ActivatedRoute, private router: Router, private actions: Actions) {}

  onSubmit() {
    const conversationRoute = this.route.snapshot.root.firstChild.firstChild;
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