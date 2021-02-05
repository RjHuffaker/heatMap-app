import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TimeSheetService, TimeSheetMathService } from '@/_services';


@Component({
  selector: 'app-time-sheet-modal',
  templateUrl: './time-sheet-modal.component.html',
  styleUrls: ['./time-sheet-modal.component.scss']
})

export class TimeSheetModalComponent implements OnInit {

	@Input() modalData;

	@Output() onTimeChange = new EventEmitter();
	@Output() onTotalChange = new EventEmitter();
	@Output() onConfirmPunch = new EventEmitter();
	@Output() onDeletePunch = new EventEmitter();
	@Output() onCloseModal = new EventEmitter();

  constructor(
  	public timeSheetService: TimeSheetService,
  	public timeSheetMathService: TimeSheetMathService
  ) { }

  ngOnInit() {
  }

  timeChange(){
  	this.onTimeChange.emit({});
  }

  totalChange(){
  	this.onTotalChange.emit({});
  }

  confirmPunch(){
  	this.onConfirmPunch.emit({});
  }

  deletePunch(){
  	this.onDeletePunch.emit({});
  }

  closeModal(){
  	this.onCloseModal.emit();
  }

}
