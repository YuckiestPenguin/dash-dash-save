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
      return await Auth.currentAuthenticatedUser()

    } catch (e) {
      throw e
    }

  }


  async login(creds: LoginForm) {
    return await Auth.signIn(creds.username, creds.password)
  }
}
