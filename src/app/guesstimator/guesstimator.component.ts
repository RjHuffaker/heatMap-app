import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Subscription } from 'rxjs';

import { AuthenticationService, ZillowService } from '@/_services';

@Component({
  selector: 'app-guesstimator',
  templateUrl: './guesstimator.component.html',
  styleUrls: [ './guesstimator.component.scss' ]
})
export class GuesstimatorComponent implements OnInit {

  @ViewChild('search', { static: true }) public searchElement: ElementRef;

  currentUserSubscription: Subscription;

  currentUser;

  PRICE_INCREMENT = 10;

  CURRENT_HOME_SIZE = 2000;
  AVERAGE_HOME_MIN = 1500;
  AVERAGE_HOME_MAX = 3000;
  HOME_SQFT_INCREMENT = 500;

  CURRENT_LOT_SIZE = 7000;
  AVERAGE_LOT_MIN = 5445;       // 1/8 Acre
  AVERAGE_LOT_MAX = 10890;      // 1/4 Acre
  LOT_SQFT_INCREMENT = 10890;   // 1/4 Acre

  INITIAL = 1;
  ONETIME = 1.3;
  QUARTERLY = .95;
  BIMONTHLY = .7;
  MONTHLY = .5;

  guesstimate = {
  	base: 100,
  	oneTime: 129,
  	initial: 99,
  	monthly: 49,
  	bimonthly: 69,
  	quarterly: 95
  };

  zillowData;

  validated;

  placeData: google.maps.places.PlaceResult;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private mapsAPIWrapper: GoogleMapsAPIWrapper,
    private ngZone: NgZone,
    public zillowService: ZillowService
  ){ }

  ngOnInit(){
  	this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            this.placeData = autocomplete.getPlace();
            
            this.zillowService.getZillowData(this.placeData).subscribe(data => {
              
              var xmlData = new DOMParser().parseFromString(data, "text/xml");

              this.zillowData = this.zillowService.xmlToJson(xmlData.getElementsByTagName("result")[0]);

              console.log(this.zillowData);

              return this.zillowData;

            });

            if( this.placeData.geometry === undefined || this.placeData.geometry === null ){
              return;
            }

          });
        });

      }
    )

  }

  getBase(){

    var basePrice = 100;

    var homeSqFt = this.CURRENT_HOME_SIZE;

    var lotSqFt = this.CURRENT_LOT_SIZE;

    if(this.zillowData){
    	homeSqFt = this.zillowData.finishedSqFt;
    	lotSqFt = this.zillowData.lotSizeSqFt;
    }

    if(homeSqFt < this.AVERAGE_HOME_MIN && lotSqFt < this.AVERAGE_LOT_MIN){
      basePrice -= 10;
    }

    if(homeSqFt > this.AVERAGE_HOME_MAX){
      basePrice += Math.ceil((homeSqFt - this.AVERAGE_HOME_MAX) / this.HOME_SQFT_INCREMENT) * this.PRICE_INCREMENT;
    }

    if(lotSqFt < this.AVERAGE_LOT_MIN && homeSqFt < this.AVERAGE_HOME_MIN){
      basePrice -= 10;
    }

    if(lotSqFt > this.AVERAGE_LOT_MAX){
      basePrice += Math.ceil((lotSqFt - this.AVERAGE_LOT_MAX) / this.LOT_SQFT_INCREMENT) * this.PRICE_INCREMENT;
    }

    return basePrice;

  }

  getOneTime(){
  	return this.prettifyPrice(this.getBase() * this.ONETIME);
  }

  getInitial(){
  	return this.prettifyPrice(this.getBase() * this.INITIAL);
  }

  getMonthly(){
  	return this.prettifyPrice(this.getBase() * this.MONTHLY);
  }

  getBimonthly(){
  	return this.prettifyPrice(this.getBase() * this.BIMONTHLY);
  }

  getQuarterly(){
  	return this.prettifyPrice(this.getBase() * this.QUARTERLY);
  }

  prettifyPrice(price){
    var roundedPrice = Math.round(price/5)*5;

    var priceString = roundedPrice.toString();

    if(priceString.substr(priceString.length-1) === "0"){
      return parseInt(priceString)-1;
    } else {
      return parseInt(priceString);
    }

  }

}
