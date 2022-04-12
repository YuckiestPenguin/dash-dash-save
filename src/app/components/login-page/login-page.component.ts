import {Component, OnInit} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  authenticating = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  async ngOnInit() {


  }

  async login(loginForm: any) {
    this.authenticating = true;
    this.authService.login(loginForm).then((res) => {
      this.router.navigate(['/dashboard'])
      this.authenticating = false;
    }).catch((error) => {
      this.authenticating = false;
      this.loginForm.reset()
      this._snackBar.open(error.message, 'OK', {duration: 2000});
    })
  }

}
