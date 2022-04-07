import {Component} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {MatDialog} from '@angular/material/dialog';
import {NewPostDialogComponent} from "./components/new-post-dialog/new-post-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dash-dash-save';
  currentUser: String | undefined;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
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
    this._auth.currentUserInfo().then(user => this.currentUser = user.username).catch(error => {
      this.currentUser = '';
    })
  }

  async signOut() {
    try {
      await Auth.signOut()

    } catch (e) {

    }
  }
}


