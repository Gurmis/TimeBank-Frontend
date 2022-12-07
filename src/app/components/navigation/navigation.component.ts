import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import {
  Router,
  Route,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  currentUser: any;
  navigationVisible: boolean = true;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          this.navigationVisible = false;
        } else {
          this.navigationVisible = true;
        }
      }
    });
    this.usersService.currentUser.subscribe((data) => {
      if (data) {
        this.currentUser = `${data.firstName} ${data.lastName}`;
      } else {
        this.currentUser = '';
      }
    });
  }

  logout(): any {
    this.usersService.logout().subscribe((item) => console.log(item));
  }
}
