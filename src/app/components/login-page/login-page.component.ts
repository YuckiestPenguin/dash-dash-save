import { Component, OnInit } from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
