import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Job, NewJob, User } from 'src/app/types';
import { JobsService } from 'src/app/services/jobs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  loggedUserId: number = 1;
  descriptionInput: string = '';
  newJob: NewJob | any;
  user: User | any;

  updateUserForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.minLength(13),
      Validators.required,
      Validators.pattern(
        '\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d\\|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$'
      ),
    ]),
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.userService.loggedUser.id;
    this.setInitialValues(this.loggedUserId);
  }

  get phoneNumber() {
    return this.updateUserForm.get('phoneNumber') as FormControl;
  }
  get firstName() {
    return this.updateUserForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.updateUserForm.get('lastName') as FormControl;
  }

  onSubmit() {
    this.user = this.updateUserForm.value;
    this.userService.updateUser(this.loggedUserId, this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.snackbarService.successMessage('User data updated successfully');
        this.router.navigate(['/user-section']);
      },
      error: () => {
        this.snackbarService.errorMessage('Oops, something went wrong');
      },
    });
  }

  setInitialValues(id) {
    this.userService.getSingleUser(id).subscribe((data) => {
      this.user = data[0];
      this.updateUserForm.setValue({
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        phoneNumber: this.user.phone_number,
      });
    });
  }
}
