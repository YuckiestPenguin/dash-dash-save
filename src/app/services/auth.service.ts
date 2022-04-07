import {Injectable} from '@angular/core';
import Amplify, {Auth, Hub} from 'aws-amplify';
import {LoginForm} from "../models/login-form";
import {BehaviorSubject, map} from "rxjs";

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
}

const initialAuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );

  /** AuthState as an Observable */
  readonly auth$ = this._authState.asObservable();

  /** Observe the isLoggedIn slice of the auth state */
  readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));

  constructor() {
    // Get the user on creation of this service
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.setUser(user),
      _err => this._authState.next(initialAuthState)
    );

    // Use Hub channel 'auth' to get notified on changes
    Hub.listen('auth', ({payload: {event, data, message}}) => {
      if (event === 'signIn') {
        // On 'signIn' event, the data is a CognitoUser object
        this.setUser(data);
      } else {
        this._authState.next(initialAuthState);
      }
    });
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

  private setUser(user: any) {
    if (!user) {
      return;
    }

    const {
      attributes: {sub: id, email},
      username
    } = user;

    this._authState.next({isLoggedIn: true, id, username, email});
  }
}
