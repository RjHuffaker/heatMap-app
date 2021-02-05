import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { AuthenticationService } from './authentication.service';
import { SetupDataService } from './setup-data.service';

import { Technician, ActiveSetup } from '@/_models';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TechMarkerService {

	private currentUser;

  private currentUserSubscription: Subscription;

	private activeSetupsUrl = 'https://azpestcontrol.services/api/_activeSetups.php';

	private techniciansUrl = 'https://azpestcontrol.services/api/_technicians.php';

	public groupBy = "DAILYTOTAL";

	public currentFilterList;

	public colorScale;

	public markerScale;

	public setupList;

	public markerList;

	public listLoading = true;

	public labelRotation;

	public labelWidth;

  constructor(
		private http: HttpClient,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
		private setupDataService: SetupDataService
	){
  	this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
	}

	getAllMarkers(){
		console.log("getAllMarkers");
		this.listLoading = true;
  	this.getAllActiveSetups()
			.then(()=>this.setFilterScale())
				.then(()=>this.getAllTechs())
					.then(()=>this.updateTechList())
						.then(()=>this.updateSetupList())
							.then(()=>this.updateMarkerList());
	}

  getMarkersByTech(techList){
  	this.listLoading = true;
  	this.getActiveSetupsByTech(techList)
			.then(()=>this.setFilterScale())
				.then(()=>this.setTechList(techList))
					.then(()=>this.updateTechList())
						.then(()=>this.updateSetupList())
							.then(()=>this.updateMarkerList());
  }

	getActiveSetupsByTech(techList){
		let url = this.activeSetupsUrl+"?techList=";
  	for(var i = 0; i < techList.length; i++){
  		url = url+encodeURI(techList[i]);
  		if(i < techList.length-1){
  			url = url+",";
  		}
  	}
  	
		return new Promise((resolve, reject)=>{
			this.http.get(url, httpOptions).subscribe(
				activeSetups => {
					this.setupList = activeSetups;
					resolve(1);
				}
			);
		});
	}

	getAllActiveSetups(){
		return new Promise((resolve, reject)=>{
			this.http.get(this.activeSetupsUrl, httpOptions).subscribe(
				activeSetups => {
					this.setupList = activeSetups;
					console.log(activeSetups);
					resolve(1);
				}
			);
		});
	}

	setGroupBy(groupBy){
		if(this.listLoading){
			alert("loading....");
		} else {
			this.groupBy = groupBy;
			this.setFilterScale().then(()=>this.updateMarkerList());
		}
	}

	getTechList(){
		return this.http.get(this.techniciansUrl, httpOptions);
	}

	getAllTechs(){
		return new Promise((resolve, reject)=>{
			
			this.http.get(this.techniciansUrl, httpOptions).subscribe(techList => {
				this.setTechList(techList);
				resolve(1);
			});

		});
	}

	setTechList(techList){
		return new Promise((resolve, reject)=>{
			
			this.setupDataService.TECHNICIANS = {};

			techList.forEach((tech)=>{
				if(tech.name){
					this.setupDataService.TECHNICIANS[tech.name] = new Technician(tech.name);
				} else {
					this.setupDataService.TECHNICIANS[tech] = new Technician(tech);
				}
			});

			resolve(1);

		});
		
	}

	updateTechList(){
		return new Promise((resolve, reject)=>{
			var _techList = [];
			var i = 0;

			while(i < this.setupList.length && i < 10000){
				var addTech = true;
				var setup = this.setupList[i];
				
				for(var key in this.setupDataService.TECHNICIANS){
					var _tech = this.setupDataService.TECHNICIANS[key];
					if(setup.tech === _tech.name){
						addTech = false;
						var multiplier;
						if(setup.schedule[4] === "M"){
							multiplier = 1;
						} else if(setup.schedule[4] === "B"){
							multiplier = 0.5;
						} else if(setup.schedule[4] === "Q"){
							multiplier = 0.33;
						}
						if(setup.schedule){
							_tech.dailyTotals[setup.schedule.substring(0,4)] += Math.ceil(parseInt(setup.total) * multiplier);
							_tech.dailyStops[setup.schedule.substring(0,4)] += multiplier;
						} else {
							console.error("No setup.schedule", setup);
						}
					}
				}
				i++;
				if(i === this.setupList.length){
					console.log("updateSetupList: "+i);

					resolve(1);
				}
			}
			console.log("updateTechList",this.setupDataService.TECHNICIANS);
		});
	}

	updateSetupList(){
		return new Promise((resolve, reject)=>{
			console.log("updateSetupList");
			var i = 0;

			while(i < this.setupList.length && i < 10000){
				var _setup = this.setupList[i];
				for(var key in this.setupDataService.TECHNICIANS){
					var _tech = this.setupDataService.TECHNICIANS[key];
					if(_tech.name === _setup.tech){
						if(_setup.schedule){
							_setup.dailyTotal = _tech.dailyTotals[_setup.schedule.substring(0,4)];
							_setup.dailyStops = _tech.dailyStops[_setup.schedule.substring(0,4)];
						}
					}
				}
				i++;
				if(i === this.setupList.length){
					console.log("updateSetupList: "+i);
					resolve(1);
				}
			}
			
		});
	}

	updateMarkerList(){
		return new Promise((resolve, reject)=>{
			console.log("setMarkers");

			var i = 0;
			this.markerList = [];

			if(this.setupList.length===0) return;

			while(i < this.setupList.length && i < 10000){
				var setup = this.setupList[i];
				if(this.setupFilter(setup)){
					var key = this.getMarkerKey(setup);
					this.setupList[i].icon = createMarker(this.markerScale[key]);
					this.setupList[i].title = createTitle(setup);
					this.markerList.push(this.setupList[i]);
				}
				i++;
				if(i === this.setupList.length){
					console.log("updateSetupList: "+i);
					resolve(1);
				}
			}

			

			function createMarker(url){
				return {
					url: url,
					size: new google.maps.Size(32, 32),
					scaledSize: new google.maps.Size(32, 32),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(15, 31)
				}
			}

			function createTitle(setup){
				var titleText = setup.schedule
					+"\n  Location: "+setup.account
					+"\n  Division: "+setup.division
					+"\n  Service: "+setup.service
					+"\n  Tech: "+setup.tech
					+"\n  Age: "+setup.age
					+"\n  Total: "+setup.total
					+"\n  Months: "+setup.month;

				return titleText;
			}
		});
	}

	setupFilter(setup){
		let dailyTotal = Math.floor(setup.dailyTotal/50)*50;
    dailyTotal = dailyTotal > 400 ? dailyTotal : 450;
    let passed = true;

    if(!this.setupDataService.AGES[setup.age]){
    	console.log(setup);
    }

    let filters = [
    	this.setupDataService.DAILYTOTALS[dailyTotal],
    	this.setupDataService.SCHEDULES[setup.schedule.substring(0,4)],
    	this.setupDataService.WEEKS[setup.week],
    	this.setupDataService.WEEKDAYS[setup.weekDay],
    	this.setupDataService.TECHNICIANS[setup.tech],
    	this.setupDataService.AGES[setup.age]
    ];

    filters.forEach((filter)=>{
    	if(!filter || filter.excluded){
    		passed = false;
    	}
    });

    return passed;

	}

	getMarkerKey(setup){
		if(this.groupBy === "DAILYTOTAL"){
			var dailyTotal = Math.floor(setup.dailyTotal/50)*50;
			return dailyTotal > 449 ? dailyTotal : 450;
		} else if(this.groupBy === "SCHEDULE"){
			return setup.schedule.substring(0,4);
		} else if(this.groupBy === "WEEK"){
			return setup.schedule.substring(0,1);
		} else if(this.groupBy === "WEEKDAY"){
			return setup.schedule.substring(1,4);
		} else if(this.groupBy === "TECHNICIAN"){
			return setup.tech;
		} else if(this.groupBy === "AGE"){
			return setup.age;
		}
	}

	setFilterScale(){
		return new Promise((resolve, reject)=>{
			if(this.groupBy === "DAILYTOTAL"){
				this.currentFilterList = this.setupDataService.DAILYTOTALS;
			} else if(this.groupBy === "SCHEDULE"){
				this.currentFilterList = this.setupDataService.SCHEDULES;
			} else if(this.groupBy === "WEEK"){
				this.currentFilterList = this.setupDataService.WEEKS;
			} else if(this.groupBy === "WEEKDAY"){
				this.currentFilterList = this.setupDataService.WEEKDAYS;
			} else if(this.groupBy === "TECHNICIAN"){
				this.currentFilterList = this.setupDataService.TECHNICIANS;
			} else if(this.groupBy === "AGE"){
				this.currentFilterList = this.setupDataService.AGES;
			}
		
			var colorScale = {};
			var markerScale = {};
			var keyList = Object.keys(this.currentFilterList);
			var conversionRate = this.setupDataService.MARKERLIST.length/keyList.length;

			keyList.forEach((key, index)=>{

				var newIndex = Math.round(conversionRate * index);

				colorScale[key] = "rgb("+this.setupDataService.COLORLIST[newIndex]+")";

				markerScale[key] = "https://azpestcontrol.services/assets/markers/"+this.setupDataService.MARKERLIST[newIndex]+".png";

			});

			this.colorScale = colorScale;
			this.markerScale = markerScale;
			this.labelRotation = "rotate("+Math.round(Object.keys(this.currentFilterList).length*2.5)+"deg)";
			this.labelWidth = Math.round(100/Object.keys(this.currentFilterList).length)+"%";

			this.listLoading = false;

			resolve(1);
		});
	}

}
