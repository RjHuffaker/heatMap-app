export class Technician {
	public name;
	public excluded;
	public dailyStops;
	public dailyTotals;

	constructor(name){
		this.name = name;
		this.excluded = false;
		this.dailyStops = {
			"1MON": 0, "1TUE": 0, "1WED": 0, "1THU": 0, "1FRI": 0,
			"2MON": 0, "2TUE": 0, "2WED": 0, "2THU": 0, "2FRI": 0,
			"3MON": 0, "3TUE": 0, "3WED": 0, "3THU": 0, "3FRI": 0,
			"4MON": 0, "4TUE": 0, "4WED": 0, "4THU": 0, "4FRI": 0
		};
		this.dailyTotals = {
			"1MON": 0, "1TUE": 0, "1WED": 0, "1THU": 0, "1FRI": 0,
			"2MON": 0, "2TUE": 0, "2WED": 0, "2THU": 0, "2FRI": 0,
			"3MON": 0, "3TUE": 0, "3WED": 0, "3THU": 0, "3FRI": 0,
			"4MON": 0, "4TUE": 0, "4WED": 0, "4THU": 0, "4FRI": 0
		};
	}
}