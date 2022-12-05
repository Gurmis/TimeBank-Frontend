import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  currentUser: any;

  constructor(private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.usersService.currentUser.subscribe((data) => {
      if (data) {
        this.currentUser = `${data.firstName} ${data.lastName}`;
        console.log(data)
      } else {
        this.currentUser = "";
      }
    });
  }

  logout(): any {
    this.usersService.logout().subscribe((item) => console.log(item));
  }
}
