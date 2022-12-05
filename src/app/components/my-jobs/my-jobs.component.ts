import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
//import { StarRatingColor } from '../rating/rating.component';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss'],
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
export class MyJobsComponent implements OnInit {
  public jobDialogComponent!: JobsDialogComponent;
  public deleteDialogComponent!: DeleteDialogComponent;

  userId: number = 0;
  user?: User;
  loggedUser: number = 0;

  rating: number = 0;
  initialRating: number = 0;
  starCount: number = 5;
  ratingDisabled: boolean = true;
  newRating: Rating = { rating: 0 };
  formattedJob: Job | any;
  dataReceived: boolean = false;

  job: Job | any;
  userJobsDataSource = new MatTableDataSource<Job>();
  columnsToDisplay = ['name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Job | null;
  selectedJobs: Job | any;

  defaultUserName: string = '';
  currentJobId: number = 0;
  deleteDone: boolean = false;

  constructor(
    private jobsService: JobsService,
    public dialog: MatDialog,
    private likesService: LikesService,
    private ratingService: RatingService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      (user) => (this.loggedUser = user.id)
    );
    this.fetchData(this.loggedUser);
    this.setColumsToFilter();
    
  }

  fetchData(loggedUser: number) {
    this.jobsService.getUserJobs(loggedUser).subscribe({
      next: (data) => {
        this.userJobsDataSource.data = data;

        if (this.userJobsDataSource.data[0].id != null) {
          this.dataReceived = true;
        }else {
          this.dataReceived = false;
        }
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.job,
      width: '500px',

      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.deletionDone.subscribe(
      (deletion) => (this.deleteDone = deletion)
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (this.deleteDone) {
        this.fetchData(this.loggedUser);
      }
    });
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  setJobId(jobId) {
    this.jobsService.currentJobId = jobId;
  }
}
