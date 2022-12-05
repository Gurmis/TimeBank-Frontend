import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss'],
})
export class UserSectionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const userSectionBtns = document.querySelectorAll('.userSection');

    userSectionBtns.forEach((item) =>
      item.addEventListener('click', this.setClassActive)
    );
  }

  setClassActive() {
    const userSectionNav = document.querySelector('.btn.user-section');
    userSectionNav?.classList.add('active');
    
  }
}
