import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AuthenticationService, IndicatorService, TimeCardService, UserService } from '@/_services';

@Component({
  selector: 'app-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss']
})
export class TimeCardComponent implements OnInit {

  @ViewChild('timeCardModal', { static: true }) timeCardModal: TemplateRef<any>;

  userList;

  currentUser;
  
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

  modalData = { mode: '', dateRange: '' };

  timePunch;

  timePunchCopy;

  vacationPunch;

  vacationPunchCopy;

  timePunch_readable = [{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},""];

  timePunch_writable = [0,0,0,0,""];

  week1;
  week2;
  week3;
  week4;
  week5;
  week6;
  
  period1;
  period2;

  dateRange1;
  dateRange2;

  yearlyTotal;

  constructor(
    private modal: NgbModal,
    public authenticationService: AuthenticationService,
    public indicatorService: IndicatorService,
    public timeCardService: TimeCardService,
    public userService: UserService
  ) {
    this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });
  }

  ngOnInit(){
    this.userService.getAll().subscribe( userList => {
      this.userList = userList.sort(this.userService.alphabetize);
      userList.forEach((user) => {
        if(this.authUser.id === user.id){
          this.selectUser(user);
        }
      });
    });
  }

  setMonth(date){
    this.month.length = 0;
    this.firstOfMonth = date.startOf('month').day();

    let daysInMonth = date.daysInMonth()

    for(var i = 0; i < daysInMonth; i++){
      this.month[i] = date.clone().add(i, 'days');
    }

    this.dateRange1 = this.timeCardService.getDateRange(this.month, 0, 15);
    this.dateRange2 = this.timeCardService.getDateRange(this.month, 15, this.month.length+1);
  }

  selectUser(user){
    this.currentUser = user;
    this.selectId = user.id;
    this.setMonth(this.currentDate);
    this.yearlyTotal = this.timeCardService.getYearlyTotals(this.currentDate, this.currentUser);
  }

	prevMonth(){
		this.currentDate.subtract(1, 'months');
    this.setMonth(this.currentDate);
    this.yearlyTotal = this.timeCardService.getYearlyTotals(this.currentDate, this.currentUser);
	}

	nextMonth(){
		this.currentDate.add(1, 'months');
    this.setMonth(this.currentDate);
    this.yearlyTotal = this.timeCardService.getYearlyTotals(this.currentDate, this.currentUser);
	}

  timeChange(){
    let _timePunch = this.timeCardService.writeTimePunch(this.timePunch);

    let _total = _timePunch[1] - _timePunch[0] - _timePunch[2];

    this.timePunch[3] = this.timeCardService.numToTime(_total > 0 ? _total : 0);

  }

  totalChange(){
    this.timePunch[0] = {hour:0,minute:0};
    this.timePunch[1] = {hour:0,minute:0};
    this.timePunch[2] = {hour:0,minute:0};
  }

  toggleModal(mode, date, dateRange){
    
    this.currentDate = moment(date);

    if(mode === "timePunch"){
      let enabled = this.timeCardService.checkDate(date);
      if(enabled==="disabled-previous" || enabled==="disabled-upcoming"){
        return;
      }
    } else if(mode === "vacation"){
      let enabled = this.timeCardService.checkDateRange(dateRange);
      if(enabled==="disabled"){
        return;
      }
    }

    this.modalData = {
      mode: mode,
      dateRange: dateRange
    }

    if(mode === "timePunch"){

      this.timePunch = this.timeCardService.readTimePunch(this.currentUser.timeCard[date.format('YYMMDD')]);
      
      this.timePunchCopy = Object.assign({}, this.timePunch);

      this.modal.open(this.timeCardModal, { size: 'lg' });

    } else if(mode === "vacation"){
      
      this.vacationPunch = this.timeCardService.readVacationPunch(this.currentUser.timeCard[dateRange]);

      this.vacationPunchCopy = Object.assign({}, this.vacationPunch);

      this.timeCardService.readDateRange(dateRange);

      this.modal.open(this.timeCardModal, { size: 'sm' });
    }
  }

  confirmPunch(){
    if(this.modalData.mode === "timePunch"){
      let oldPunch = this.currentUser.timeCard[this.currentDate.format('YYMMDD')];
      let newPunch = this.timeCardService.writeTimePunch(this.timePunch);

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

      this.currentUser.timeCard[this.currentDate.format('YYMMDD')] = newPunch;

    } else if(this.modalData.mode === "vacation"){
      console.log('this.vacationPunch', this.vacationPunch);

      let oldVacation = this.currentUser.timeCard[this.modalData.dateRange];

      let newVacation = [
        this.timeCardService.timeToNum(this.vacationPunch[0]),
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

      this.currentUser.timeCard[this.modalData.dateRange] = newVacation;
    }
    
    this.userService.update(this.currentUser).pipe(first()).subscribe( res => {
      this.yearlyTotal = this.timeCardService.getYearlyTotals(this.currentDate, this.currentUser);
    });

  }

  deletePunch(){
    if(this.modalData.mode==="timePunch"){
      delete this.currentUser.timeCard[this.currentDate.format('YYMMDD')];
    } else {
      delete this.currentUser.timeCard[this.modalData.dateRange];
    }
    
    this.userService.update(this.currentUser).pipe(first()).subscribe( res => {
      this.yearlyTotal = this.timeCardService.getYearlyTotals(this.currentDate, this.currentUser);
    });
  }

}
