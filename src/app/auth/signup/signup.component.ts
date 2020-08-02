import { UIActions } from './../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.shared';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../shared/ui.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading$: Observable<boolean>;
  isLoadingBool: boolean;
  loadSubsciption: Subscription;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}
  ngOnDestroy(): void {
    this.loadSubsciption.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loadSubsciption = this.isLoading$.subscribe((t) => (this.isLoadingBool = t));

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(formValues: NgForm) {
    this.authService.registerUser({
      email: formValues.value.email,
      password: formValues.value.password,
    });
  }
}
