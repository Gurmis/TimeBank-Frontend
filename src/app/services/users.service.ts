import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  Subscriber,
  tap,
} from 'rxjs';
import { Login, NewUser, User } from '../types';
import { JwtService } from './jwt.service';
import { SnackbarService } from './snackbar.service';
// import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

export const DEFAULT_REDIRECT_AFTER_LOGIN = '/jobs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  // serverUrl: string = 'https://localhost:5000/';
  serverUrl: string = 'https://concise-upgrade-370310.lm.r.appspot.com/';
  token: string = '';
  username: string = '';
  loggedUser: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private userSubscriber?: Subscriber<any>;
  public redirectAfterLogin = DEFAULT_REDIRECT_AFTER_LOGIN;

  // header = {
  //   headers: new HttpHeaders(),
  //   // .set('Authorization',  `Bearer ${this.usersService.token}`)
  //   // .set('Authorization', `Bearer ${this.newToken}`),
  // };

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router,
    private jwtHelper: JwtService,
    private cookieService: CookieService
  ) {
    const cookieToken = this.cookieService.get('token');
    const decoded = this.jwtHelper.DecodeToken(cookieToken!);
    this.currentUserSubject = new BehaviorSubject<any>(decoded);
    this.currentUser = this.currentUserSubject.asObservable();
    if (cookieToken) {
      this.loggedUser = decoded;
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getData(query: string) {
    return this.sendRequest(this.serverUrl + query);
  }

  //GET SINGLE USER
  getSingleUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.serverUrl}users/${id}`, {
      withCredentials: true,
    });
  }

  private get newToken(): string {
    return localStorage.getItem('token') || '';
  }

  private get userName(): string {
    return localStorage.getItem('user') || '';
  }

  // loggedUserSubscriber(): Observable<string> {
  //   this.userSubscriber?.next('sevas');

  //   return new Observable((subscriber: Subscriber<string>) => {
  //     this.userSubscriber = subscriber;
  //     subscriber.next();
  //   });
  // }

  sendRequest(url: string): Observable<User[]> {
    return this.httpClient.get<User[]>(url, { withCredentials: true });
  }

  // CREATE USER
  createUser(newUser: NewUser): Observable<NewUser> {
    return this.httpClient
      .post<NewUser>(`${this.serverUrl}users`, newUser)
      .pipe(
        tap((data) => {
          this.snackbarService.successMessage(
            'Registration successful, please login'
          );
          this.router.navigateByUrl('/login');
          catchError((error) => this.handleError(error));
          catchError((error) => {
            if (error) {
              this.snackbarService.errorMessage('Wrong input');
            }
            return EMPTY;
          });
        })
      );
  }

  //UPDATE USER
  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient
      .put<User>(`${this.serverUrl}users/${id}`, user, {
        withCredentials: true,
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  login(login: Login): Observable<any> {
    return this.httpClient
      .post(this.serverUrl + 'login', login, {
        responseType: 'text',
        withCredentials: true,
      })
      .pipe(
        map((token) => {
          const decoded = this.jwtHelper.DecodeToken(token);
          this.snackbarService.successMessage(
            'User with phone number: ' + login.phoneNumber + ' logged in'
          );
          this.currentUserSubject.next(decoded);
          this.currentUser = this.currentUserSubject.asObservable();
          this.loggedUser = decoded;

          return true;
        }),
        catchError((error) => this.handleError(error)),
        catchError((error) => {
          if (error) {
            this.snackbarService.errorMessage('Wrong phone number or password');
          }
          return EMPTY;
        })
      );
  }

  logout(): Observable<any> {
    if (this.currentUser) {
      this.currentUserSubject.next('');
      this.currentUser = this.currentUserSubject.value;
      this.loggedUser = '';
      this.router.navigateByUrl('/login');
      this.cookieService.remove('token');
      return this.httpClient.post(`${this.serverUrl}logout`, {
        responseType: 'text',
        withCredentials: true,
      });
    }
    return EMPTY;
  }

  loggedIn(): boolean {
    return !!this.loggedUser;
  }

  handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.snackbarService.errorMessage('Server is unreachable');
      } else {
        if (error.status >= 400 && error.status < 500) {
          const message =
            error.error.errorMessage || JSON.parse(error.error).errorMessage;
          this.snackbarService.errorMessage(
            message.substring(0, 1).toUpperCase() + message.substring(1)
          );
        } else {
          this.snackbarService.errorMessage(
            'Server error, please contanct administrator '
          );
          console.error(error);
        }
      }
    } else {
      this.snackbarService.errorMessage(
        "Programmer's error : " + JSON.stringify(error)
      );
    }
    console.error('Server error: ', error);
    return EMPTY;
  }
}
