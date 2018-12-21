import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

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
const sessionKey = 'sessionTimes';
const usernameKey = 'username';
const routes = {
  login: () => `/login/`
};

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  private _tokenData: TokenData | null;

  constructor(private http: Http) {
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

    const body = {"username": context.username, "password": context.password};
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(routes.login(), body, options)
      .map((res: Response) => res.json())
      .map((body: any) => {
        const token = body;
        if (token) {
          this.setCredentials(token, true);
          this._tokenData = token;
          console.log(this._tokenData);
          const storage = localStorage;
          storage.setItem(usernameKey, JSON.stringify({ username: context.username }));
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
    const timeNow = localStorage.getItem(sessionKey) ? new Date() : null;
    const sessionEnd = localStorage.getItem(sessionKey) ? new Date(JSON.parse(localStorage.getItem(sessionKey)).end) : null;
    return sessionStorage.getItem(credentialsKey) && timeNow && sessionEnd && sessionEnd > timeNow || localStorage.getItem(credentialsKey) && sessionEnd > timeNow ? true : false;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  private setSessionsTimes(expiresInSeconds: number) {
    const start = new Date();
    const end = new Date();
    end.setMinutes(start.getMinutes() + expiresInSeconds / 60); // % 60 to get minutes
    localStorage.setItem(sessionKey, JSON.stringify({ start: start, end: end }));
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
      this.setSessionsTimes(this._credentials.expiresInSeconds);
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);

      this._tokenData = null;
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
