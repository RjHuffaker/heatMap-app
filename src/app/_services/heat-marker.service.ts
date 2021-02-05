import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { HeatMarker } from '@/_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeatMarkerService {
	
	private activeSetupsUrl = 'https://azpestcontrol.services/api/_heatMarkers.php';

  public lat: number = 33.448171;

  public lng: number = -112.073894;

  public zoom: number = 10;

  constructor(
  	private http: HttpClient
  ){}

  getHeatMarkerList<HeatMarker>(){
  	return this.http.get(this.activeSetupsUrl, httpOptions);	
  }
}
