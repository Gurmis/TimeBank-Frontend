import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Job, Login } from 'src/app/types';
import { JobsService } from 'src/app/services/jobs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  login!: Login;
  token: string = '';
  
  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(login: NgForm) {
    this.userService.login(login.value).subscribe((loginOK) => {
      if (loginOK) {
        this.router.navigateByUrl('/jobs');
      }
    });
  }
}
