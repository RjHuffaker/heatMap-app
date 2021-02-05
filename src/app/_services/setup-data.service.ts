import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetupDataService {

  constructor() { }

  public TECHNICIANS = {};

  public WEEKDAYS = {
		"MON": { name: "Monday", excluded: false },
		"TUE": { name: "Tuesday", excluded: false },
		"WED": { name: "Wednesday", excluded: false },
		"THU": { name: "Thursday", excluded: false },
		"FRI": { name: "Friday", excluded: false }
	};

	public WEEKS = {
		"1": { name: "Week 1", excluded: false },
		"2": { name: "Week 2", excluded: false },
		"3": { name: "Week 3", excluded: false },
		"4": { name: "Week 4", excluded: false }
	};

	public MONTHFILTER = {
		name: "Month",
		options: {
			"Any": { name: "Any", checked: true },
			"Odd": { name: "Odd", checked: false },
			"Even": { name: "Even", checked: false },
			"Specific": {
				name: "Specific",
				checked: false,
				options: {
					"JAN": { name: "JAN", checked: true },
					"FEB": { name: "FEB", checked: false },
					"MAR": { name: "MAR", checked: false },
					"APR": { name: "APR", checked: false },
					"MAY": { name: "MAY", checked: false },
					"JUN": { name: "JUN", checked: false },
					"JUL": { name: "JUL", checked: false },
					"AUG": { name: "AUG", checked: false },
					"SEP": { name: "SEP", checked: false },
					"OCT": { name: "OCT", checked: false },
					"NOV": { name: "NOV", checked: false },
					"DEC": { name: "DEC", checked: false }
				}
			}
		}
	};

	public SCHEDULES = {
		"1MON": {name: "1MON", excluded: false },
		"1TUE": {name: "1TUE", excluded: false },
		"1WED": {name: "1WED", excluded: false },
		"1THU": {name: "1THU", excluded: false },
		"1FRI": {name: "1FRI", excluded: false },
		"2MON": {name: "2MON", excluded: false },
		"2TUE": {name: "2TUE", excluded: false },
		"2WED": {name: "2WED", excluded: false },
		"2THU": {name: "2THU", excluded: false },
		"2FRI": {name: "2FRI", excluded: false },
		"3MON": {name: "3MON", excluded: false },
		"3TUE": {name: "3TUE", excluded: false },
		"3WED": {name: "3WED", excluded: false },
		"3THU": {name: "3THU", excluded: false },
		"3FRI": {name: "3FRI", excluded: false },
		"4MON": {name: "4MON", excluded: false },
		"4TUE": {name: "4TUE", excluded: false },
		"4WED": {name: "4WED", excluded: false },
		"4THU": {name: "4THU", excluded: false },
		"4FRI": {name: "4FRI", excluded: false }
	};

	public DAILYTOTALS = {
		"450": {name: "450", excluded: false },
		"500": {name: "500", excluded: false },
		"550": {name: "550", excluded: false },
		"600": {name: "600", excluded: false },
		"650": {name: "650", excluded: false },
		"700": {name: "700", excluded: false },
		"750": {name: "750", excluded: false },
		"800": {name: "800", excluded: false },
		"850": {name: "850", excluded: false },
		"900": {name: "900", excluded: false },
		"950": {name: "950", excluded: false },
		"1000": {name: "1000", excluded: false },
		"1050": {name: "1050", excluded: false },
		"1100": {name: "1100", excluded: false },
		"1150": {name: "1150", excluded: false },
		"1200": {name: "1200", excluded: false },
		"1250": {name: "1250", excluded: false },
		"1300": {name: "1300", excluded: false },
		"1350": {name: "1350", excluded: false },
		"1400": {name: "1400", excluded: false },
		"1450": {name: "1450", excluded: false },
		"1500": {name: "1500", excluded: false },
		"1550": {name: "1550", excluded: false },
		"1600": {name: "1600", excluded: false }
	};

	public AGES = {
		"> 5 Years": {name: "> 5 Years", excluded: false },
		"< 5 Years": {name: "< 5 Years", excluded: false },
		"< 4 Years": {name: "< 4 Years", excluded: false },
		"< 3 Years": {name: "< 3 Years", excluded: false },
		"< 2 Years": {name: "< 2 Years", excluded: false },
		"< 1 Year": {name: "< 1 Year", excluded: false },
		"< 9 Months": {name: "< 9 Months", excluded: false },
		"< 6 Months": {name: "< 6 Months", excluded: false },
		"< 3 Months": {name: "< 3 Months", excluded: false },
		"< 1 Month": {name: "< 1 Month", excluded: false }
	};

	public MARKERLIST = [
		"0_0_255",
		"0_63_255",
		"0_127_255",
		"0_191_255",
		"0_255_255",
		"0_255_191",
		"0_255_127",
		"0_255_63",
		"0_255_0",
		"63_255_0",
		"127_255_0",
		"191_255_0",
		"255_255_0",
		"255_191_0",
		"255_127_0",
		"255_63_0",
		"255_0_0",
		"255_0_63",
		"255_0_127",
		"255_0_191",
		"255_0_255",
		"191_0_255",
		"127_0_255",
		"63_0_255"
	];

	public COLORLIST = [
			"0,0,255",
			"0,63,255",
			"0,127,255",
			"0,191,255",
			"0,255,255",
			"0,255,191",
			"0,255,127",
			"0,255,63",
			"0,255,0",
			"63,255,0",
			"127,255,0",
			"191,255,0",
			"255,255,0",
			"255,191,0",
			"255,127,0",
			"255,63,0",
			"255,0,0",
			"255,0,63",
			"255,0,127",
			"255,0,191",
			"255,0,255",
			"191,0,255",
			"127,0,255",
			"63,0,255"
	];
}
