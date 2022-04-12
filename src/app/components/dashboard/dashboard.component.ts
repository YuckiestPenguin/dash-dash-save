import {Component, OnInit} from '@angular/core';
import {NewPostDialogComponent} from "../new-post-dialog/new-post-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {APIService, Post} from "../../API.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = []
  private subscription: Subscription | null = null;


  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private api: APIService) {
  }


  openDialog() {
    const ref = this.dialog.open(NewPostDialogComponent);
    ref.componentInstance.onSubmitEmitter.subscribe((res) => {
      this._snackBar.open('New Post Added!', 'Ok', {duration: 2000});
      ref.close()
      this.api.ListPosts().then((event) => {
        this.posts = event.items as Post[]
      });
    });
  }

  async ngOnInit() {
    this.api.ListPosts().then((event) => {
      this.posts = event.items as Post[]
    });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

}
