import {Component} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {MatDialog} from '@angular/material/dialog';
import {NewPostDialogComponent} from "./components/new-post-dialog/new-post-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dash-dash-save';
  currentUser:any;


  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private authService:AuthService, private router: Router ) {
  }

  openDialog() {
    const ref = this.dialog.open(NewPostDialogComponent);
    ref.componentInstance.onSubmitEmitter.subscribe((res) => {
      this._snackBar.open('New Post Added!', 'Ok');
      ref.close()
    });
  }

  _auth = Auth;


  async ngOnInit() {

    this.currentUser = await this.authService.isAuthenticated()

  }

  async signOut() {
    try {
      await Auth.signOut()
      await this.router.navigate(['/login'])

    } catch (e) {

    }
  }
}


