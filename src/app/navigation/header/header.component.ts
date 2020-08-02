import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // authObservable$: Observable<boolean>;
  // authSubscription: Subscription;
  isAuth: boolean;
  @Output() toggleclickEvent = new EventEmitter();
  isAuth$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {}

  ngOnDestroy(): void {
    // if (this.authSubscription) {
    //   this.authSubscription.unsubscribe();
    // }
  }

  ngOnInit(): void {

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authSubject.subscribe(
    //   (response) => {
    //     this.isAuth = response;
    //   }
    // );
    // this.authObservable$ = this.authService.authObservable$;
  }
  onToggle() {
    this.toggleclickEvent.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
