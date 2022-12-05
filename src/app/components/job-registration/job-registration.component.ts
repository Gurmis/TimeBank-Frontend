import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job, NewJob } from 'src/app/types';
import { JobsService } from 'src/app/services/jobs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-job-registration',
  templateUrl: './job-registration.component.html',
  styleUrls: ['./job-registration.component.scss'],
})
export class JobRegistrationComponent implements OnInit {
  loggedUserId: number = 0;
  descriptionInput: string = '';
  newJob: NewJob | any;

  constructor(
    private jobsService: JobsService,
    private snackbarService: SnackbarService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
  this.loggedUserId = this.userService.loggedUser.id;
  }
  
  onSubmit(jobRegistration: NgForm) {
    // adding user to Job
    this.newJob = jobRegistration.value;
    this.newJob.userId = this.loggedUserId;
    this.jobsService.registerJob(this.newJob).subscribe({
      error: (error) =>
        this.snackbarService.errorMessage('Oops, something went wrong'),
      // error: err => this.errorText = "Server not available!"
    });
  }
}
