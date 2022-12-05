import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input('rating') public rating: number = 0;
  @Input('starCount') public starCount: number = 0;
  @Input('ratingDisabled') public ratingDisabled: boolean = true;
  
  @Output() public ratingUpdated = new EventEmitter();

  public ratingArr: number[] = [];

  constructor() {}

  ngOnInit() {
    //console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star_';
    } else {
      return 'star_border';
    }
  }
}
