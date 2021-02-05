import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetMathService {

	timePunch_readable = [{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},{hour:0,minute:0},""];

  timePunch_writable = [0,0,0,0,""];

  constructor() { }

  displayTime(time){
    if(!time){
      return "0:00";
    } else if(isNaN(time) && !isNaN(time.hour) && !isNaN(time.minute)){
      return (time.hour ? time.hour : "0")+":"+(time.minute%60 ? time.minute%60 : "00");
    } else {
      return Math.floor(time/60)+":"+ (time%60 ? time%60 : "00");
    }
  }

  getWeek(date){
  	let month = this.getMonth(date);
  	if(date.date() < 8){
  		return month.slice(0,7);
  	} else if(date.date() < 15){
			return month.slice(7,14);
  	} else if(date.date() < 16){
  		return month.slice(14,15);
  	} else if(date.date() < 23){
  		return month.slice(15,22);
  	} else if(date.date() < 30){
  		return month.slice(22,29);
  	} else {
  		return month.slice(29);
  	}
  }

  getWorkWeek(week){
		if(week.length > 5){
  		return 5;
  	} else {
  		return week.length;
  	}
  }

  getMonth(date){
    let month = [];
    
    let _date = date.clone().startOf('month');

    for(var i = 0; i < date.daysInMonth(); i++){
      month[i] = _date.clone().add(i, 'days');
    }
    return month;
  }

  getYear(date){
    let year = [];
    let daysInYear = parseInt(moment('1231'+date.year(), 'MMDDYYYY').format('DDD'));
    for(var i = 0; i < daysInYear; i++){
      year[i] = date.clone().add(i, 'days');
    }
    return year;
  }

  readTimePunch(timePunch){
    let _timePunch;

    if(timePunch){
      _timePunch = timePunch.slice();
      _timePunch[0] = this.numToTime(timePunch[0]);
      _timePunch[1] = this.numToTime(timePunch[1]);
      _timePunch[2] = this.numToTime(timePunch[2]);
      _timePunch[3] = this.numToTime(timePunch[3]);

    } else {
      _timePunch = this.timePunch_readable.slice();
    }

    return _timePunch;
  }

  writeTimePunch(timePunch){
    if(!timePunch) return this.timePunch_writable.slice();

    let _timePunch = [];
    _timePunch[0] = this.timeToNum(timePunch[0]);
    _timePunch[1] = this.timeToNum(timePunch[1]);
    _timePunch[2] = this.timeToNum(timePunch[2]);
    _timePunch[3] = this.timeToNum(timePunch[3]);
    _timePunch[4] = timePunch[4];

    return _timePunch;
  }

  readVacationPunch(vacationPunch){
    let _vacationPunch;

    if(vacationPunch){
      _vacationPunch = vacationPunch.slice();
      _vacationPunch[0] = this.numToTime(vacationPunch[0]);
    } else {
      _vacationPunch = [{hour:0,minute:0}];
    }

    return _vacationPunch;
  }

  writeVacationPunch(vacationPunch){
    if(!vacationPunch) return [0];
    let _vacationPunch = [];
    _vacationPunch[0] = this.timeToNum(vacationPunch[0]);
    return _vacationPunch;
  }

  readDateRange(dateRange){
    let start = moment(dateRange.substring(0,6), 'YYMMDD');
    let end = moment(dateRange.substring(0,4)+dateRange.substring(7), 'YYMMDD');

    return start.format('MMMM D')+"-"+end.format('D, YYYY');
  }

  getLastDate(dateRange){
  	return moment(dateRange.substring(0,4)+dateRange.substring(7), 'YYMMDD');
  }

  numToTime(num){
    if(!num) return { hour: 0, minute: 0 };
    return { hour: Math.floor(num/60), minute: (num%60 ? num%60 : 0) };
  }

  timeToNum(time){
    if(!time) return 0;
    return parseInt(time.hour)*60 + parseInt(time.minute);
  }

  getDateRange(month, start, end){
    let dates = month.slice(start, end);
    let startDate = dates[0];
    let endDate = dates[dates.length-1];
    return startDate.format("YYMMDD")+"-"+endDate.format("DD");
  }

  getWeeklyTotal(week, timeCard){
    let overtime = 0;
    let regular = 0
    let workWeek = this.getWorkWeek(week);
    let name = "sixthWeek";

    if(week[0]){
			let startDate = week[0].date();

			if(startDate < 8){
	    	name = "firstWeek";
	    } else if(startDate < 15){
	    	name = "secondWeek";
	    } else if(startDate < 16){
	    	name = "thirdWeek";
	    } else if(startDate < 23){
	    	name = "fourthWeek";
	    } else if(startDate < 30){
	    	name = "fifthWeek";
	    }
    }

    week.forEach((day)=>{
      let timePunch = timeCard.punchData[day.format('YYMMDD')];
      if(timePunch){
        regular += timePunch[3];
      }
    });

    if(regular > workWeek*480){
      overtime = regular - (workWeek*480);
      regular = workWeek*480;
    }

    return {
    	name: name,
    	days: week,
      regular: regular,
      overtime: overtime,
      workWeek: workWeek
    };
  }

  getPeriodTotal(month, start, end, timeCard){
    let dates = month.slice(start, end);
    let startDate = dates[0];
    let endDate = dates[dates.length-1];
    let dateRange = startDate.format("YYMMDD")+"-"+endDate.format("DD");
    let week1 = this.getWeeklyTotal(dates.slice(0,7), timeCard);
    let week2 = this.getWeeklyTotal(dates.slice(7,14), timeCard);
    let week3 = this.getWeeklyTotal(dates.slice(14), timeCard);
    
    let regular = week1.regular + week2.regular + week3.regular;
    let overtime = week1.overtime + week2.overtime + week3.overtime;
    let vacation = timeCard.punchData[dateRange] ? timeCard.punchData[dateRange][0] : 0;

    return {
      startDate: startDate,
      endDate: endDate,
      dateRange: dateRange,
      week1: week1,
      week2: week2,
      week3: week3,
      regular: regular,
      overtime: overtime,
      vacation: vacation
    }
  }

  getYearlyTotals(date, timeCard){
    let total = {
      year: date.year(),
      regular: 0,
      overtime: 0,
      vacation: 0,
      firstDay: {}, 
      lastDay: {}
    };

    let year = date.year();
    let regular = 0;
    let overtime = 0;
    let vacation = 0;

    for(var i = 1; i < 12; i++){
      let month = this.getMonth(moment(year+','+i+',1', 'YYYY,MM,DD'))
      let period1 = this.getPeriodTotal(month, 0, 15, timeCard);
      let period2 = this.getPeriodTotal(month, 15, month.length+1, timeCard);

      total.regular += period1.regular + period2.regular;
      total.overtime += period1.overtime + period2.overtime;
      total.vacation += period1.vacation + period2.vacation;

      total[period1.dateRange] = period1;
      total[period2.dateRange] = period2;
    }

    total.firstDay = moment(year-1+',12,16', 'YYYY,MM,DD');
    total.lastDay = moment(year+',12,01', 'YYYY,MM,DD');

    let firstMonth = this.getMonth(total.firstDay);
    let lastMonth = this.getMonth(total.lastDay);

    let firstPeriod = this.getPeriodTotal(firstMonth, 15, 31, timeCard);
    let lastPeriod = this.getPeriodTotal(lastMonth, 0, 15, timeCard);

    let nextPeriod = this.getPeriodTotal(lastMonth, 15, 31, timeCard);

    total[firstPeriod.dateRange] = firstPeriod;
    total[lastPeriod.dateRange] = lastPeriod;
    total[nextPeriod.dateRange] = nextPeriod;

    total.regular += firstPeriod.regular + lastPeriod.regular;
    total.overtime += firstPeriod.overtime + lastPeriod.overtime;
    total.vacation += firstPeriod.vacation + lastPeriod.vacation;

    return total;
  }

  checkDate(date){
    let hourDiff = moment().diff(date, 'hours');
    let dayDiff = moment().diff(date, 'days');
    let weekday = moment().day()+1;

    let gracePeriod = 3;

    if(weekday < 3){
      gracePeriod += weekday;
    }

    if(hourDiff > gracePeriod*24){
      return "disabled-previous";
    } else if(hourDiff < 0){
      return "disabled-upcoming";
    } else if(dayDiff===0){
      return "today";
    } else {
      return "";
    }
  }

  checkDateRange(dateRange){

    let start = moment(dateRange.substring(0,6), 'YYMMDD');
    let end = moment(dateRange.substring(0,4)+dateRange.substring(7), 'YYMMDD');
  
    if(moment().isSameOrAfter(start, 'day') && moment().isSameOrBefore(end, 'day')){
      return "text-primary hoverOutline pokable";
    } else {
      return "disabled";
    }
  }

  getCurrentTotal(timeCard, date?){

  	if(!date){
  		date = moment();
  	} else if(moment().isBefore(date)){
  		date = moment();
  	}

  	let week = this.getWeek(date);

  	let total = this.getWeeklyTotal(week, timeCard);

  	let workDays = this.getWorkDays(week, date);

  	return {
  		regular: total.regular,
  		overtime: total.overtime,
  		workWeek: total.workWeek,
  		workDays: workDays
  	};

  }

  getWorkDays(week, date){

  	let start = week[0];

  	let daysDiff = date.date() - start.date() + 1;

  	let workDays = daysDiff;

  	if(week.length > 5){
  		for(var i = 0; i < daysDiff; i++){
	  		if(week[i].day()===0 || week[i].day()===6){
	  			workDays--;
	  		}
	  	}
  	}
  	
  	return workDays;

  }
}
