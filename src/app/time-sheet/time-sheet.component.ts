import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AuthenticationService, IndicatorService, TimeSheetService, TimeSheetMathService, UserService } from '@/_services';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {

  @ViewChild('timeSheetModal', { static: true }) timeSheetModal: TemplateRef<any>;

	timeCardList;

	currentTimeCard;

  tabList = ["Pay Period 1", "Pay Period 2", "Yearly Total", "Time Sheet Settings"];

  currentTab = 0;

	selectId;

  authUser;

  authUserSubscription: Subscription;

  currentDate = moment();

  moment = moment;

  firstOfMonth;

  firstOfGrid;

  month = [];

  year = [];

  days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  modalData;

  timePunch_readable = [{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},""];

  timePunch_writable = [0,0,0,0,""];

  yearlyTotal;

  dateRange1;

  dateRange2;

  timeCardName = "";
  timeCardSettings = {};
  timeCardPunchData = {};

  constructor(
    private modal: NgbModal,
    public authenticationService: AuthenticationService,
    public indicatorService: IndicatorService,
    public timeSheetMathService: TimeSheetMathService,
    public timeSheetService: TimeSheetService,
    public userService: UserService
  ){
    this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });

    this.setMonth(this.currentDate);
  }

  ngOnInit() {
    this.browseTimeCards();
  }

  selectTimeCard(timeCard){
    
    if(timeCard){
      this.currentTimeCard = timeCard;
      this.selectId = this.currentTimeCard.id;
      this.setMonth(this.currentDate);
      this.yearlyTotal = this.timeSheetMathService.getYearlyTotals(this.currentDate, this.currentTimeCard);
      this.timeCardName = timeCard.name;
      this.timeCardSettings = timeCard.settings;
      this.timeCardPunchData = timeCard.punchData;
    } else {
      this.currentTimeCard = null;
      this.selectId = 0;
      this.timeCardName = "";
      this.timeCardSettings = {};
      this.timeCardPunchData = {};
    }
  }

  prevMonth(){
    this.currentDate.subtract(1, 'months');
    this.setMonth(this.currentDate);
    this.yearlyTotal = this.timeSheetMathService.getYearlyTotals(this.currentDate, this.currentTimeCard);
  }

  nextMonth(){
    this.currentDate.add(1, 'months');
    this.setMonth(this.currentDate);
    this.yearlyTotal = this.timeSheetMathService.getYearlyTotals(this.currentDate, this.currentTimeCard);
  }

  setMonth(date){
    this.month.length = 0;
    this.firstOfMonth = date.startOf('month').day();

    let daysInMonth = date.daysInMonth()

    for(var i = 0; i < daysInMonth; i++){
      this.month[i] = date.clone().add(i, 'days');
    }

    this.dateRange1 = this.timeSheetMathService.getDateRange(this.month, 0, 15);
    this.dateRange2 = this.timeSheetMathService.getDateRange(this.month, 15, this.month.length+1);
  }

  timeChange(){
    let _timePunch = this.timeSheetMathService.writeTimePunch(this.modalData.timePunch);

    let _total = _timePunch[1] - _timePunch[0] - _timePunch[2];

    this.modalData.timePunch[3] = this.timeSheetMathService.numToTime(_total > 0 ? _total : 0);

  }

  totalChange(){
    this.modalData.timePunch[0] = {hour:0,minute:0};
    this.modalData.timePunch[1] = {hour:0,minute:0};
    this.modalData.timePunch[2] = {hour:0,minute:0};
  }

  toggleModal(modalData){

    if(modalData.mode === "timePunch"){
      let enabled = this.timeSheetMathService.checkDate(modalData.date);
      if(enabled==="disabled-previous" || enabled==="disabled-upcoming"){
        return;
      }
    } else if(modalData.mode === "vacationPunch"){
      let enabled = this.timeSheetMathService.checkDateRange(modalData.dateRange);
      if(enabled==="disabled"){
        return;
      }
    }

    if(modalData.mode === "timePunch"){
      modalData.timePunch = this.timeSheetMathService.readTimePunch(
        this.currentTimeCard.punchData[modalData.date.format('YYMMDD')]
      );
      modalData.timePunchCopy = Object.assign({}, modalData.timePunch);
      this.modal.open(this.timeSheetModal, { size: 'lg' });
    } else if(modalData.mode === "vacationPunch"){
      modalData.vacationPunch = this.timeSheetMathService.readVacationPunch(
        this.currentTimeCard.punchData[modalData.dateRange]
      );
      modalData.vacationPunchCopy = Object.assign({}, modalData.vacationPunch);      
      this.modal.open(this.timeSheetModal, { size: 'sm' });
    } else if(modalData.mode === "uploadCSV"){
      this.modal.open(this.timeSheetModal, { size: 'lg' });
    }

    this.modalData = modalData;

  }

  confirmPunch(){
    if(this.modalData.mode === "timePunch"){
      let oldPunch = this.currentTimeCard.punchData[this.modalData.date.format('YYMMDD')];
      let newPunch = this.timeSheetMathService.writeTimePunch(this.modalData.timePunch);

      if(oldPunch)
      if(oldPunch[0]===newPunch[0]&&
        oldPunch[1]===newPunch[1]&&
        oldPunch[2]===newPunch[2]&&
        oldPunch[3]===newPunch[3]&&
        oldPunch[4]===newPunch[4]){
        return;
      }

      newPunch.push(this.authUser.username);

      newPunch.push(moment().format('YYYY-MM-DD, h:mm a'));
      
      if(oldPunch){
        newPunch.push(oldPunch.slice(0,7));

        let length = oldPunch.length < 10 ? oldPunch.length : 10;

        for(var i = 0; i < length; i++){
          if(Array.isArray(oldPunch[i])){
            newPunch.push(oldPunch[i]);
          }
        }
      }

      this.currentTimeCard.punchData[this.modalData.date.format('YYMMDD')] = newPunch;

    } else if(this.modalData.mode === "vacationPunch"){
      console.log('this.vacationPunch', this.modalData.vacationPunch);

      let oldVacation = this.currentTimeCard.punchData[this.modalData.dateRange];

      let newVacation = [
        this.timeSheetMathService.timeToNum(this.modalData.vacationPunch[0]),
        this.authUser.username,
        moment().format('YYYY-MM-DD, h:mm a')
      ];

      if(oldVacation)
      if(oldVacation[0]===newVacation[0]){
        return;
      }

      if(oldVacation){
        newVacation.push(oldVacation.slice(0,3));

        let length = oldVacation.length < 6 ? oldVacation.length : 6;

        for(var i = 0; i < length; i++){
          if(Array.isArray(oldVacation[i])){
            newVacation.push(oldVacation[i]);
          }
        }
      }
      console.log('newVacation', newVacation);

      this.currentTimeCard.punchData[this.modalData.dateRange] = newVacation;
    }
    
    this.timeSheetService.update(this.currentTimeCard).pipe(first()).subscribe( res => {
      this.yearlyTotal = this.timeSheetMathService.getYearlyTotals(this.currentDate, this.currentTimeCard);
    });

  }

  deletePunch(){
    if(this.modalData.mode==="timePunch"){
      delete this.currentTimeCard.punchData[this.modalData.date.format('YYMMDD')];
    } else {
      delete this.currentTimeCard.punchData[this.modalData.dateRange];
    }
    
    this.timeSheetService.update(this.currentTimeCard).pipe(first()).subscribe( res => {
      this.yearlyTotal = this.timeSheetMathService.getYearlyTotals(this.currentDate, this.currentTimeCard);
    });
  }

  browseTimeCards(){
    this.timeSheetService.getAll().subscribe( timeCardList => {
      this.timeCardList = timeCardList.sort(this.timeSheetService.alphabetize);
    });
  }

  readTimeCard(id){
    this.timeSheetService.getById(id).subscribe( timeCard => {
      this.currentTimeCard = timeCard;
      this.selectId = id;
    });
  }
c 
  editTimeCard(timeCard){
    timeCard.name = this.timeCardName;
    timeCard.settings = this.timeCardSettings;
    timeCard.punchData = this.timeCardPunchData;
    this.timeSheetService.update(timeCard).subscribe( timeCard => {
      console.log(timeCard);
      this.browseTimeCards();
    });
  }

  addTimeCard(){
    if(this.timeCardName){

      var timeCard = {
        name: this.timeCardName,
        settings: this.timeCardSettings,
        punchData: this.timeCardPunchData
      };

      this.timeSheetService.create(timeCard).subscribe( timeCardId => {
        console.log(timeCardId);
        this.selectId = timeCardId;
        this.currentTimeCard = this.readTimeCard(timeCardId);

        this.timeCardName = "";
        this.timeCardSettings = {};
        this.timeCardPunchData = {};
        this.browseTimeCards();
      });
    }
  }

  deleteTimeCard(timeCard){
    if(confirm("Delete "+timeCard.name+"?")){
      this.timeSheetService.delete(timeCard.id).subscribe( timeCard => {
        console.log(timeCard);
        this.browseTimeCards();
      });
    }
  }

}
