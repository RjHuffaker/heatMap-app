import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-sheet-calendar',
  templateUrl: './time-sheet-calendar.component.html',
  styleUrls: ['./time-sheet-calendar.component.scss']
})
export class TimeSheetCalendarComponent implements OnInit {

	@Input() month;

	@Input() dateRange1;
	
	@Input() dateRange2;

	@Input() punchData;

	@Output() dayClicked = new EventEmitter();

	days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  constructor() { }

  ngOnInit() {
  }

  toggleModal(mode, date, dateRange){
  	this.dayClicked.emit({ mode: mode, date: date, dateRange: dateRange });
  }

}
