import { Component, OnInit, Input } from '@angular/core';
import { TimeSheetMathService } from '@/_services';

@Component({
  selector: 'app-time-sheet-calendar-day',
  templateUrl: './time-sheet-calendar-day.component.html',
  styleUrls: ['./time-sheet-calendar-day.component.scss']
})
export class TimeSheetCalendarDayComponent implements OnInit {

	@Input() date;
	
	@Input() week;

	@Input() timePunch;

  constructor(
  	public timeSheetMathService: TimeSheetMathService
  ) { }

  ngOnInit() {
  }

}
