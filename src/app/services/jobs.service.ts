import { Injectable, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Job, User } from '../types';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { EMPTY, tap, Subject, BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { UserSectionComponent } from '../components/user-section/user-section.component';

@Injectable({ providedIn: 'root' })
export class JobsService {
  public messageSubject = new Subject();
// serverUrl: string = 'https://localhost:5000/';
serverUrl: string = 'https://concise-upgrade-370310.lm.r.appspot.com/';
  currentJobId: number = 0;

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private router: Router,
    private usersService: UsersService
  ) {}

  // GET All JOBS
  // getData(query: string): Observable<Job[]> {
  //   return this.httpClient.get<Job[]>(this.serverUrl + query, this.usersService.header);
  // }
  getData(query: string): Observable<Job[] | any> {
    return this.httpClient.get<Job[] | any>(this.serverUrl + query, {withCredentials: true});
  }

  // POST Method
  // registerJob(job: Job): Observable<Job> {

  //   return this.httpClient.post<Job>(this.serverUrl + 'jobs', job);
  // }

  //GET requests
  getJobById(id: number): Observable<Job[] | any> {
    return this.httpClient
      .get<Job[]>(this.serverUrl + 'jobs/' + id, {withCredentials: true})
      .pipe(catchError((error) => this.handleError(error)));
  }

  getUserJobs(userId: number): Observable<Job[]> {
    // console.log(userId)
    return this.httpClient
      .get<Job[]>(
        `${this.serverUrl}users/${userId}/jobs`, {withCredentials: true} )
      .pipe(catchError((error) => this.handleError(error)));
  }

  //POST request
  registerJob(job: Job): Observable<Job> {
    return this.httpClient
      .post<Job>(this.serverUrl + 'jobs', job, {withCredentials: true})
      .pipe(
        tap((data) => {
          this.snackbarService.successMessage(
            'Job has been successfully added'
          );
          this.router.navigateByUrl('/jobs');
          catchError((error) => this.handleError(error));
          catchError((error) => {
            if (error) {
              this.snackbarService.errorMessage('Wrong username or password');
            }
            return EMPTY;
          });
        })
      );
  }

  //PUT request
  updateJob(job: Job | any, id: number): Observable<Job> {
    return this.httpClient.put<Job>(
      this.serverUrl + 'jobs/' + id,
      job,
      {withCredentials: true}
    )
    .pipe(catchError((error) => this.handleError(error)));
  }

  //DELETE request
  deleteJob(id: number): Observable<Job> {
    return this.httpClient.delete<Job>(
      this.serverUrl + 'jobs/' + id,
      {withCredentials: true}
    ).pipe(catchError((error) => this.handleError(error)));
  }

  handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.snackbarService.errorMessage('Server is unreachable');
        console.log('chyba 0');
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

  setCurrentJobId(jobId: any) {
    this.currentJobId = jobId;
  }


}
