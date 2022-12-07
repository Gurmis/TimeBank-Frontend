import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HoursService } from 'src/app/services/hours.service';
import { JobsService } from 'src/app/services/jobs.service';
import { LikesService } from 'src/app/services/likes.service';
import { RatingService } from 'src/app/services/rating.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { Hours, Job, Rating } from 'src/app/types';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
  selector: 'app-jobs-dialog',
  templateUrl: './jobs-dialog.component.html',
  styleUrls: ['./jobs-dialog.component.scss'],
})
export class JobsDialogComponent implements OnInit {
  // @Input() likes: number = 0;
  likes: number = 0;
  // @Output() likesChange = new EventEmitter<number>();

  job: any;
  //likes: number = 0;
  loggedUserId: number = 1;
  clicked = false;
  submitClicked = false;
  hours: Hours | any;
  rating: number = 0;
  starCount: number = 5;
  ratingDisabled: boolean = false;

  starSelect = new EventEmitter();
  @Output() newLikes = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JobsDialogComponent>,
    private likesService: LikesService,
    private hoursService: HoursService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UsersService
  ) {}

  hoursForm = new FormGroup({
    hoursLogged: new FormControl(this.data.job.duration, [Validators.min(1)]),
  });

  ngOnInit(): void {
    this.loggedUserId = this.userService.loggedUser.id;
    this.job = this.data.job;
    this.likes = this.data.job.likesCount;
    console.log(this.router.url)
    }

  sendHours(jobId: number) {
    this.hours = {
      userFromId: this.loggedUserId,
      amount: parseInt(this.hoursLogged.value),
    };
    this.hoursService.postHours(this.hours, jobId).subscribe({
      error: (error) =>
        this.snackbarService.errorMessage(error.error.errorMessage),
    });
  }

  get hoursLogged() {
    return this.hoursForm.get('hoursLogged') as FormControl;
  }

  sendLike(serviceId: number) {
    this.likesService.postLike(this.job.id).subscribe(
      (data) => {
        this.getLikes();
      }

      // error: (error) => console.log('Server not available!'),
      // error: err => this.errorText = "Server not available!"
    );
  }

  getLikes() {
    this.likesService.getLikesCountPerJob(this.job.id).subscribe({
      next: (data) => {
        this.likes = data[0].likes;
        this.newLikes.emit(this.likes);
      },

      // error: (error) => console.log('Server not available!'),
      // error: err => this.errorText = "Server not available!"
    });
  }

  onRatingChanged(rating: number) {
    // console.log(rating);
    this.rating = rating;
    this.starSelect.emit(this.rating);
  }
}
