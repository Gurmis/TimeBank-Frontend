import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Job } from 'src/app/types';

//Import pre identifikaciu IDcka
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss'],
})
export class JobUpdateComponent implements OnInit {
  loggedUserId: number = 3;
  descriptionInput: string = '';
  currentJob: Job | any;

  constructor(
    private router: Router,
    private jobsService: JobsService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.userService.loggedUser.id;
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = this.jobsService.currentJobId;
    this.jobsService.getJobById(id).subscribe({
      next: (job) => {
        this.currentJob = job[0];
      },
    });
  }

  onSubmit(jobUpdate: NgForm) {
    const updatedJob = {
      name: jobUpdate.value.name,
      description: jobUpdate.value.description,
      duration: jobUpdate.value.timeEstimate,
      userId: this.currentJob.user.id,
    };

    this.jobsService.updateJob(updatedJob, this.currentJob.id).subscribe({
      next: () => {
        this.snackbarService.successMessage('Job updated successfully');
        this.router.navigate(['/user-section']);
      },
      error: (error) =>
        this.snackbarService.errorMessage('Oops, something went wrong'),
    });
  }
}
