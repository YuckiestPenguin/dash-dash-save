import {Injectable} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';

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
}
