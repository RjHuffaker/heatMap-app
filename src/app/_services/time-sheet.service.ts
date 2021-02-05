import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { TimeCard } from '@/_models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(
  	private http: HttpClient
  ) { }

  private _baseUrl = "https://azpestcontrol.services/api";

  getAll(){
    return this.http.get<TimeCard[]>(`${this._baseUrl}/_timeCards.php`);
  }

  getById(id: number){
    return this.http.get(`${this._baseUrl}/_timeCards.php?id=${id}`);
  }

  create(timeCard: TimeCard){
    return this.http.post(`${this._baseUrl}/_timeCards.php`, timeCard);
  }

  update(timeCard: TimeCard){
    return this.http.put(`${this._baseUrl}/_timeCards.php`, timeCard);
  }

  delete(id: number){
    return this.http.delete(`${this._baseUrl}/_timeCards.php?id=${id}`);
  }

  alphabetize(a,b){
    const nameA = a.name;
    const nameB = b.name;

    let comparison = 0;
    
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
  
}
