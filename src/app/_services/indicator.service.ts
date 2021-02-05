import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {


	YELLOW_TO_BLUE = [
		"191,223,0", "127,223,0", "63,223,0", "0,223,0",
		"0,223,63", "0,223,127", "0,223,191", "0,223,223",
		"0,191,223", "0,127,223", "0,63,223", "0,0,223"
	];

	YELLOW_TO_RED = [
		"223,191,0", "223,175,0", "223,159,0", "223,143,0",
		"223,127,0", "223,111,0", "223,95,0", "223,79,0",
		"223,63,0", "223,47,0", "223,31,0", "223,15,0",
		"223,0,0"
	];

  constructor() { }

  getHourly(total){

  	let target = 2400;

  	let adjustedTarget = (target / 5) * total.workDays;

  	let hoursLeft;

    let totalTotal = total.regular+total.overtime;

  	if(isNaN(totalTotal) || totalTotal === 0){
  	//	hoursLeft = 0;
    //  return "0 0 0 rgb(0,0,0)";
      return "null";
    } else {
  		hoursLeft = adjustedTarget-(total.regular+total.overtime);
  	}

  	let indicator;

  	if(hoursLeft === 0){
  		indicator = "223,223,0";
  	} else if(hoursLeft > 0){
  		indicator = this.getNumericScale(this.YELLOW_TO_BLUE, hoursLeft, 0, adjustedTarget);
  	} else {
  		indicator = this.getNumericScale(this.YELLOW_TO_RED, -hoursLeft, 0, 960);
  	}

  	return "1px 1px 5px rgb("+indicator+")";
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

  getNumericScale(valueList, keyNumber, scaleStart, scaleEnd){
  	if(valueList.length){
  		let scaleRange = scaleEnd-scaleStart;
  		let scaleRate = valueList.length/scaleRange;
  		let scaleKey = Math.round(scaleRate*keyNumber);
  		if(scaleKey < valueList.length){
  			return valueList[scaleKey];
  		} else {
  			return valueList[valueList.length-1];
  		}
  	}
  }


}
