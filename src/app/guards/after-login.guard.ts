import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AfterLoginGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.usersService.loggedIn()) {
      return true;
    }

    this.usersService.redirectAfterLogin = state.url;
    this.snackBarService.errorMessage('You are already logged in!');
    this.router.navigateByUrl('/jobs');
    return false;
  }
}
