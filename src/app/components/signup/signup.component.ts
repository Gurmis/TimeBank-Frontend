import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { NewUser, User } from 'src/app/types';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;

  user: NewUser | any;

  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.minLength(13),
      Validators.required,
      Validators.pattern("\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d\\|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}\$"),
    ]),
    firstName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.minLength(3),
      Validators.required,

    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(3),
      Validators.required,

    ]),
  },this.passwordsMatchValidator);

  constructor(
    private usersService: UsersService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
    }
    console.log(this.user);
    this.usersService.createUser(this.user).subscribe({
      error: (error) => {this.snackbarService.errorMessage(error.error.message);
    },
  });
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null{
      const password = control.get("password");
      const confirmPassword = control.get("confirmPassword");

      if (password?.value=== confirmPassword?.value){
        confirmPassword?.setErrors(null);
        return null;
      }else{
        const err = {"differentPasswords":"Passwords do not match"};
        confirmPassword?.setErrors(err);
        return err;
      }

     
  }


}
