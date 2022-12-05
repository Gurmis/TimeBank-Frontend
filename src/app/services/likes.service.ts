import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
// serverUrl: string = 'https://localhost:5000/';
serverUrl: string = 'https://concise-upgrade-370310.lm.r.appspot.com/';
  
  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService
  ) {}

  postLike(jobId): Observable<any> {
    return this.httpClient.post<any>(
      this.serverUrl + 'jobs/' + jobId + '/likes', "",
      {withCredentials: true}
    );
  }

  getLikesCountPerJob(jobId: number): Observable<any> {
    return this.httpClient.get<any>(
      this.serverUrl + 'jobs/' + jobId + '/likes',
      {withCredentials: true}
    );
  }
}
