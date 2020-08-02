import { state } from '@angular/animations';
import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../shared/ui.shared';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  authSubject = new Subject<boolean>();
  authObservable$ = this.authSubject.asObservable();
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.store.dispatch(new Auth.SetAuthenticated());
        this.authSubject.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthencticated());
        this.authSubject.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
   // this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
        //this.store.dispatch(new UI.StopLoading());
        console.log(result);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
       // this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(result);
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, { duration: 3000 });
      });
  }

  logOut() {
    if (this.afAuth) {
      this.afAuth.signOut();
    }
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
