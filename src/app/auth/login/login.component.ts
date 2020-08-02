import { State } from './../../app.reducer';
import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.shared';
import { Subscription, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  // loadingSubs: Subscription;
  // isLoading = false;
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}
  ngOnDestroy(): void {
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.createLoginForm();
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (loading: boolean) => {
    //     this.isLoading = loading;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
