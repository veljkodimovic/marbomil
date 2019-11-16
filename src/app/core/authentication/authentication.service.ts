import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { PersistenceService } from '../persistence.service';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  accessToken: string;
  issued: number;
  expires: string;
  expiresInSeconds: number;
  isValid: boolean;
  errorMessage: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface TokenData {
  accessToken: string;
  issued: number;
  expires: string;
  expiresInSeconds: number;
  isValid: boolean;
  errorMessage: string;
}

const credentialsKey = 'credentials';
const userDetailsKey = 'username';

const routes = {
  login: () => `/login/`,
  userContext: () => `/users/context`
};

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  private _tokenData: TokenData | null;
  apiOptions: any;
  activeStorage = sessionStorage;

  constructor(private http: Http, private persistenceService:  PersistenceService) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: context.password
    };

    const body = { 'username': context.username, 'password': context.password };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(routes.login(), body, options)
      .map((res: Response) => res.json())
      // tslint:disable-next-line:no-shadowed-variable
      .map((body: any) => {
        const token = body;
        if (token) {
          this.setCredentials(token, true);
          this._tokenData = token;
        }
        return token;
      });
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this._credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      sessionStorage.removeItem(userDetailsKey);
      localStorage.removeItem(userDetailsKey);
      this._tokenData = null;
    }
  }

  getUserContext(): Observable<any> {
    return this.http.get(routes.userContext(), this.persistenceService.getApiHeader()).map((res: Response) => res.json());
  }

}
