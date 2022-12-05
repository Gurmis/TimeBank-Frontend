import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobsService } from 'src/app/services/jobs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  @Output() deletionDone = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private jobsService: JobsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
  }

  deleteJob() {
    this.jobsService.deleteJob(this.data.id).subscribe({
      next: () => {
        this.snackbarService.successMessage('Job has been deleted');
        this.deletionDone.emit(true);
      },
      error: (error) =>
        this.snackbarService.errorMessage('Ooops, something went wrong')
    });
  }
}
