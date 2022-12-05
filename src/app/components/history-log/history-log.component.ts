import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/types';
import { RatingService } from 'src/app/services/rating.service';
import { HoursService } from 'src/app/services/hours.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.scss'],
})
export class HistoryLogComponent implements OnInit {
  logs: any;
  loggedUser: any;
  rating: number = 0;
  starCount: number = 5;
  ratingDisabled: boolean = true;
  totalHours: number = 0;

  displayedColumns: string[] = [
    'name',
    'hours',
    'jobCompletionDate',
    'workedFor',
  ];
  dataSource = new MatTableDataSource<Log>();
  constructor(
    private hoursService: HoursService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.userService.loggedUser;
    this.fetchData(this.loggedUser.id);
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  fetchData(userId: number) {
    this.hoursService.getHoursPerUser(userId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.getTotalHours(this.loggedUser);
      },
      error: (error) => console.log('Server not available!'),
    });
  }

  getTotalHours(loggedUser: number) {
    const dataAmount = this.dataSource.data.map((item) => item.amount);
    if (dataAmount.length == 0) {
      this.totalHours = 0;
    } else {
      this.totalHours = dataAmount.reduce((total, num) => total + num);
    }
  }
}
