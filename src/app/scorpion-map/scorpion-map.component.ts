import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs';

import { AuthenticationService, HeatMarkerService, UserService } from '@/_services';
import { HeatMarker } from '@/_models';


@Component({
  selector: 'app-scorpion-map',
  templateUrl: './scorpion-map.component.html',
  styleUrls: ['./scorpion-map.component.css']
})
export class ScorpionMapComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchElement: ElementRef;

	heatMap;

  currentUser;

  currentUserSubscription: Subscription;

	lat: number = 33.448171;

  lng: number = -112.073894;

  zoom: number = 10;

  latLngList;

  zillowData;

  expandTabs = false;

  showHide(){
    console.log("showHide");
    this.expandTabs = !this.expandTabs;
  };

  testLog(data){
    console.log(data);
  }

  yellowToPurple= [
    'rgba(255, 255, 0, 0)',
    'rgba(255, 255, 0, 1)',
    'rgba(255, 223, 0, 1)',
    'rgba(255, 191, 0, 1)',
    'rgba(255, 159, 0, 1)',
    'rgba(255, 127, 0, 1)',
    'rgba(255, 95, 0, 1)',
    'rgba(255, 63, 0, 1)',
    'rgba(255, 31, 0, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(223, 0, 31, 1)',
    'rgba(191, 0, 63, 1)',
    'rgba(159, 0, 95, 1)',
    'rgba(127, 0, 127, 1)'
  ];

  constructor(
  	public mapsAPILoader: MapsAPILoader,
  	public mapsAPIWrapper: GoogleMapsAPIWrapper,
    private ngZone: NgZone,
    public heatMarkerService: HeatMarkerService,
    public userService: UserService,
    public authenticationService: AuthenticationService
  ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if(this.currentUser){
      this.lat = parseFloat(this.currentUser.preferences["lat"]);
      this.lng = parseFloat(this.currentUser.preferences["lng"]);
      this.zoom = parseInt(this.currentUser.preferences["zoom"]);
    } else {
      this.lat = this.heatMarkerService.lat;
      this.lng = this.heatMarkerService.lng;
      this.zoom = this.heatMarkerService.zoom;
    }

    if(window.location.href.includes("phoenix")){
      this.lat = 33.448171;
      this.lng = -112.073894;
      this.zoom = 11;
    } else if(window.location.href.includes("tucson")){
      this.lat = 32.221750;
      this.lng = -110.974562;
      this.zoom = 10;
    } else if(window.location.href.includes("mesa")){
      this.lat = 33.411758;
      this.lng = -111.831152;
      this.zoom = 12;
    } else if(window.location.href.includes("chandler")){
      this.lat = 33.303936;
      this.lng = -111.840765;
      this.zoom = 12;
    } else if(window.location.href.includes("gilbert")){
      this.lat = 33.351698;
      this.lng = -111.789080;
      this.zoom = 12;
    } else if(window.location.href.includes("scottsdale")){
      this.lat = 33.493539;
      this.lng = -111.925894;
      this.zoom = 11;
    }

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

    this.heatMarkerService.getHeatMarkerList().subscribe(
      heatMarkerList => {
        this.latLngList = this.getLatLng(heatMarkerList);
        this.createHeatMap(map, this.latLngList);
        this.onZoomChange(this.zoom);
      }
    );
  }

  createHeatMap(map, latLngList){

    this.heatMap = new google.maps.visualization.HeatmapLayer({
      data: latLngList,
      radius: 16,
      opacity: .5,
      gradient: this.yellowToPurple
    });

    this.heatMap.setMap(map);
  }
  
  getLatLng(list){
    var latLngArray = [];

    for(var i = 0; i < list.length; i++){
      var _lat = list[i].lat;
      var _lng = list[i].lng;
      if(_lat !== 0 && _lng !== 0){
        var latLng = new google.maps.LatLng(list[i].lat, list[i].lng);
        latLngArray.push({ location: latLng, weight: list[i].weight });
      }
    }

    return latLngArray;

  }

  onCenterChange(event){
    if(this.currentUser){
      this.currentUser.preferences['lat'] = parseFloat(event.lat.toFixed(6));
      this.currentUser.preferences['lng'] = parseFloat(event.lng.toFixed(6));
      this.userService.update(this.currentUser).subscribe(res => {
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      });
    } else {
      this.heatMarkerService.lat = parseFloat(event.lat.toFixed(6));
      this.heatMarkerService.lng = parseFloat(event.lng.toFixed(6));
    }
  }

  onZoomChange(event){
    if(this.currentUser){
      this.currentUser.preferences['zoom'] = parseInt(event);
      this.userService.update(this.currentUser).subscribe(res => {
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      });
    } else {
      this.heatMarkerService.zoom = parseInt(event);
    }

  	var newRadius;

  	switch(event) {
  		case 1:
  			newRadius = 0.5;
  			break;
  		case 2:
  			newRadius = 1;
  			break;
  		case 3:
  			newRadius = 1.5;
  			break;
  		case 4:
  			newRadius = 2;
  			break;
  		case 5:
  			newRadius = 3;
  			break;
  		case 6:
  			newRadius = 4;
  			break;
  		case 7:
  			newRadius = 6;
  			break;
  		case 8:
  			newRadius = 8;
  			break;
  		case 9:
  			newRadius = 12;
  			break;
  		case 10:
  			newRadius = 16;
  			break;
  		case 11:
  			newRadius = 24;
  			break;
  		case 12:
  			newRadius = 32;
  			break;
  		case 13:
  			newRadius = 48;
  			break;
  		case 14:
  			newRadius = 64;
  			break;
  		case 15:
  			newRadius = 96;
  			break;
  		case 16:
  			newRadius = 128;
  			break;
  		case 17:
  			newRadius = 192;
  			break;
  		case 18:
  			newRadius = 256;
  			break;
  		case 19:
  			newRadius = 386;
  			break;
  		case 20:
  			newRadius = 512;
  			break;
  	}
    if(this.heatMap){
      this.heatMap.setOptions({radius: newRadius});
    }
  }

}


