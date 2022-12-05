import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) { }

  errorMessage(message: string) {
    this.snackBar.open(message, "ERROR", {panelClass: 'redSnackBar', duration: 10000})
  }

  successMessage(message: string) {
    this.snackBar.open(message, "SUCCESS", {panelClass: 'greenSnackBar', duration: 2000})
  }
}
