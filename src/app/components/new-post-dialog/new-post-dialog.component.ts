import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService, Post} from "../../API.service";

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss']
})
export class NewPostDialogComponent implements OnInit {
  public createForm: FormGroup;
  onSubmitEmitter = new EventEmitter();

  availablePostTypes: string[] = ['YouTube', 'Medium', 'StackOverflow', 'Blog', 'Other'];
  emailRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: [null, Validators.required],
      url: [null, Validators.required],
      postType: [null, Validators.required]
    });
  }

  public onCreate(post: Post) {
    this.api.CreatePost(post).then((event) => {
      this.createForm.reset()
      this.onSubmitEmitter.emit(event)
    }).catch((error) => {
      console.log(error)
    })
  }

  ngOnInit(): void {
  }

}
