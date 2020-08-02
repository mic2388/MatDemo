import { AuthService } from 'src/app/auth/auth.service';
import { MaterialModule } from './material.module';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  openSideNav = false;
  title = 'MatApp';
  @ViewChild('sideNav') sideNavElement: MatSidenav;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.initAuthListener();
  }

  onToggle(event: any) {
    this.sideNavElement.opened = !this.sideNavElement.opened;
  }
}
