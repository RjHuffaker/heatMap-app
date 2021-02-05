import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs';

import { AuthenticationService, MessageService, SetupDataService, TechMarkerService, UserService } from '@/_services';

@Component({
	selector: 'app-tech-map',
	templateUrl: './tech-map.component.html',
	styleUrls: ['./tech-map.component.scss']
})
export class TechMapComponent implements OnInit {

	@ViewChild('search', { static: true }) public searchElement: ElementRef;

	techMap;

  currentUserSubscription: Subscription;

  currentUser;

	lat: number = 33.448171;

	lng: number = -112.073894;

	zoom: number = 10;

	setupList;

	markerList;

  techList;

	objectKeys = Object.keys;

	colorScale;

	expandTabs = false;

	activeTab = "DAILYTOTAL";

	constructor(
		public mapsAPILoader: MapsAPILoader,
		public mapsAPIWrapper: GoogleMapsAPIWrapper,
    private ngZone: NgZone,
    public authenticationService: AuthenticationService,
    public messageService: MessageService,
		public setupDataService: SetupDataService,
    public techMarkerService: TechMarkerService,
		public userService: UserService
	){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

	ngOnInit(){
    this.lat = parseFloat(this.currentUser.preferences["lat"]);
    this.lng = parseFloat(this.currentUser.preferences["lng"]);
    this.zoom = parseInt(this.currentUser.preferences["zoom"]);

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();

            if( place.geometry === undefined || place.geometry === null ){
              return;
            }

          });
        });

      }
    )
  }

	onMapReady(map){
    map.setOptions({
			mapTypeControl: false,
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			},
			scaleControl: true,
			fullscreenControlOptions: {
				position: google.maps.ControlPosition.RIGHT_TOP
			}
		});
		if(this.currentUser.preferences.allTechs){
      
      this.techMarkerService.getAllMarkers();

    } else {

      this.techMarkerService.getMarkersByTech(this.currentUser.techList);
      
    }
	}

	onCenterChange(event){
		this.currentUser.preferences['lat'] = parseFloat(event.lat.toFixed(6));
		this.currentUser.preferences['lng'] = parseFloat(event.lng.toFixed(6));
    this.userService.update(this.currentUser).subscribe(res => {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    });
  }

  onZoomChange(event){
    this.currentUser.preferences['zoom'] = parseInt(event);
    this.userService.update(this.currentUser).subscribe(res => {
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    });
  }

  navToggle(tab){
  	console.log("navToggle");
  	this.activeTab = tab;
  	if(tab === "TEST" || tab === this.techMarkerService.groupBy){
  		this.expandTabs = !this.expandTabs;
  	} else if(tab !== "TEST"){
  		this.techMarkerService.setGroupBy(tab);
  	}
  	
  }

  getBorderRadius(){
  	if(this.activeTab === "DAILYTOTAL"){
  		return "10px 10px 10px 0";
  	} else if(this.activeTab === "AGE"){
  		return "10px 10px 0 10px";
  	} else {
  		return "10px 10px 10px 10px";
  	}
  }

  getTechList(){
  	this.techMarkerService.getTechList();
  }

}
