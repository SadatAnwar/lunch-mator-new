import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CalenderService} from '../../services/calander.service';
import {LunchDto} from '../../types';

@Component({
  selector: 'lunch-item',
  templateUrl: './lunch-item.component.html'
})
export class LunchItemComponent implements OnInit {
  @Input()
  lunch: LunchDto;

  @Input()
  myLunch: boolean;

  @Output()
  requestJoined = new EventEmitter();

  @Output()
  requestLeave = new EventEmitter();

  startTime: string;
  title: string;

  constructor(private router: Router, private calenderService: CalenderService) {
  }

  ngOnInit(): void {
    this.title = `${this.lunch.lunchName ? this.lunch.lunchName : "Lunch"} at ${this.lunch.restaurant.name}`;
  }

  ngAfterContentInit() {
    this.startTime = this.calenderService.format(new Date(this.lunch.startTime));
  }

  join(lunch: LunchDto) {
    this.requestJoined.emit(lunch);
  }

  details(lunch: LunchDto) {
    this.router.navigate(['s/lunch', lunch.id]);
  }

  leave(lunch: LunchDto) {
    this.requestLeave.emit(lunch);
  }
}
