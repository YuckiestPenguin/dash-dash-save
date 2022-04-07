import {Injectable} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {LoginForm} from "../models/login-form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public async isAuthenticated(): Promise<any> {
    try {
       await Auth.currentAuthenticatedUser()
      return true

    } catch (e) {
      return false
    }

  }


  async login(creds: LoginForm) {
    return await Auth.signIn(creds.username, creds.password)
  }
}
