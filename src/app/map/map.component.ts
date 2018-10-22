import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

import { Marker } from '../marker';
import { MarkerService } from '../marker.service';
import { ActiveSetup } from '../activeSetup';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

	agmMap;

	heatMap;

	lat: number = 33.448171;
  lng: number = -112.073894;

  markerList;

  coordList;

  blueToRed = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
	
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
  	public markerService: MarkerService
  ) {
  	
  }

  ngOnInit() {
  	this.markerService.getMarkerString().subscribe(markerString => this.coordList = this.getCoords(markerString));
  }

  onMapReady(map){

  	this.markerService.getMarkerString().subscribe(
  		markerString => this.markerList = this.createHeatMap(map, this.getLatLng(
  				this.getCoords(markerString))));
  	console.log(this.markerList);
  	/*
  	var latLngList = this.getLatLng(this.markerList);
  	
  	this.agmMap = map;

  	this.createHeatMap(map, latLngList);
		*/
  }

  onZoomChange(data){
  	console.log(data);
  	var newRadius;

  	switch(data) {
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

  	this.heatMap.setOptions({radius: newRadius})
  }

  createHeatMap(map, latLngList){
  	
		console.log(latLngList);

		this.heatMap = new google.maps.visualization.HeatmapLayer({
			data: latLngList,
			radius: 16,
			opacity: 0.5,
			gradient: this.yellowToPurple
		});

  	this.heatMap.setMap(map);

  }


  getCoords(tsv){
  	var lines = tsv.split('\n');
    var coordArray = [];

    for(var i = 0; i < lines.length;i++){
      var _current = lines[i].split("\t");
      if(_current.length > 10){

				var _weight = 2;

				var _service = _current[8];

				if(_service==="BIMONTHLY"){
					_weight = 1;
				} else if(_service==="QUARTERLY"){
					_weight = .5;
				}



        var coords = { lat: parseFloat(_current[5]), lng: parseFloat(_current[6]), weight: _weight };
        coordArray.push(coords);
      }
    }

		return coordArray;
	}

	getLatLng(list){
		var latLngArray = [];
		for(var i = 0; i < list.length;i++){
      latLngArray.push({ location: new google.maps.LatLng(list[i].lat, list[i].lng), weight: list[i].weight });
    }

    return latLngArray;
	}

}


