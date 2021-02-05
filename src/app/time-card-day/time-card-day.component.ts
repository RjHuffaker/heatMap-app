import { Component, OnInit, Input } from '@angular/core';
import { TimeCardService } from '@/_services';
import * as moment from 'moment';

@Component({
  selector: 'app-time-card-day',
  templateUrl: './time-card-day.component.html',
  styleUrls: ['./time-card-day.component.scss']
})
export class TimeCardDayComponent implements OnInit {

	@Input() date;
	
	@Input() week;

	@Input() timePunch;

  constructor(
    public timeCardService: TimeCardService
  ) {

  }

  ngOnInit() {
  }

}
