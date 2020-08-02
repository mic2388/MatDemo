import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth/auth.service';
import * as fromRoot from '../app.reducer';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Input() sideNav: MatSidenav;
  authSubscription: Subscription;
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State> ) {}
  ngOnDestroy(): void {
    // this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authSubject.subscribe(
    //   (response) => {
    //     this.isAuth = response;
    //   }
    // );

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(){
    this.sideNav.close();
  }

  onLogout() {
    this.onClose();
    this.authService.logOut();
  }
}
