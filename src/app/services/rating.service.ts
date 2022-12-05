import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Rating } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
// serverUrl: string = 'https://localhost:5000/';
serverUrl: string = 'https://concise-upgrade-370310.lm.r.appspot.com/';
  
  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private usersService: UsersService
  ) {}

  postRating(rating: Rating, jobId: number): Observable<Rating> {
    return this.httpClient
      .post<Rating>(
        `${this.serverUrl}jobs/${jobId}/ratings`,
        rating,
        {withCredentials: true}
      )
      .pipe(
        tap((data) => {
          this.snackbarService.successMessage('Rating added, thanks!');
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
