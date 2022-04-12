import {Component} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {MatDialog} from '@angular/material/dialog';
import {NewPostDialogComponent} from "./components/new-post-dialog/new-post-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dash-dash-save';
  isAuthenticated=false;
  currentUser: any;
  isLoggedIn = false;
  user: { id: string; username: string; email: string; } | undefined;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService, private router: Router, public location: Location) {
  }


  async ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    );
    this.authService.auth$.subscribe(({ id, username, email }) => {
      // @ts-ignore
      this.user = { id, username, email };
    });

    this.isAuthenticated = await this.authService.isAuthenticated()

    this.currentUser = await this.authService.isAuthenticated()

  }

  async signOut() {
    try {
      await Auth.signOut()
      await this.router.navigate(['/login'])
      this.location.replaceState('/login')

    } catch (e) {

    }
  }


}


