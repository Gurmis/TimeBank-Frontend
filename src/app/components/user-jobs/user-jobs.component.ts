import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Job, Rating, User } from 'src/app/types';
import { DataSource } from '@angular/cdk/collections';
import { AbstractFormGroupDirective } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { JobsDialogComponent } from '../jobs-dialog/jobs-dialog.component';
import { LikesService } from 'src/app/services/likes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { RatingService } from 'src/app/services/rating.service';
import { UsersService } from 'src/app/services/users.service';
//import { StarRatingColor } from '../rating/rating.component';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserJobsComponent implements OnInit {
  public dialogComponent!: JobsDialogComponent;

  // userId: number = 1;
  // user?: User;
  loggedUserId: number = 1;

  rating: number = 0;
  initialRating: number = 0;
  starCount: number = 5;
  ratingDisabled: boolean = true;
  newRating: Rating = { rating: 0 };
  formattedJob: Job | any;
  likes: number = 0

  job: Job | any;
  user: User | any;
  userJobsDataSource = new MatTableDataSource<Job>();
  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Job | null;
  selectedJobs: Job | any;

  defaultUserName: string = '';

  constructor(
    private jobsService: JobsService,
    public dialog: MatDialog,
    private likesService: LikesService,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.userService.loggedUser.id;
    this.route.paramMap.subscribe((params) => {
      this.fetchData(params.get('userId'));
    });
    
    this.setColumsToFilter();
  }

  fetchData(userId: number | any) {
    this.jobsService.getUserJobs(userId).subscribe({
      next: (data) => {

        this.job = this.userJobsDataSource.data = data.map(
          (item) =>
            ({
              id: item.id,
              name: item.name,
              description: item.description,
              duration: item.duration,
              averageRating: Math.ceil(item.averageRating),
              likesCount: item.likesCount,
              user: item.user
            })
            
        );
        this.user = this.job[0].user;
      },
      error: (error) => console.log('Server not available!'),
    });
  }

  applyFilter(event: any) {
    const filterStr = event.target.value.trim().toLowerCase();
    this.userJobsDataSource.filter = filterStr;
  }

  setColumsToFilter() {
    this.userJobsDataSource.filterPredicate = (
      job: Job,
      filter: string
    ): boolean => {
      if (job.name.toLowerCase().includes(filter)) return true;
      return false;
    };
  }

  openDialog(
    element: Job,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.job = element;
    const dialogRef = this.dialog.open(JobsDialogComponent, {
      data: { job: this.job },
      width: '230px',
      // height: '320px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.componentInstance.starSelect.subscribe((dialogRating) => {
      this.rating = dialogRating;
    });

    dialogRef.componentInstance.newLikes.subscribe(
      (newLikes) => this.job.likesCount = newLikes
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (this.rating !== 0) {
        this.sendRating();
        this.resetRating();
      }
      return;
    });
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  sendRating() {
    this.newRating = {
      rating: this.rating,
    };
    this.ratingService.postRating(this.newRating, this.job.id).subscribe();
  }

  resetRating() {
    this.rating = 0;
    this.newRating = { rating: 0 };
  }

  loadLikes(element: Job) {
    this.likesService.getLikesCountPerJob(element.id).subscribe({
      next: (data) => {
        this.likes = data;
      },
    });
  }
}
