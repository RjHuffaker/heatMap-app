import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '@/_models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
  	private http: HttpClient
  ) { }

  private _baseUrl = "https://azpestcontrol.services/api";

  getAll(){
    return this.http.get<Task[]>(`${this._baseUrl}/_tasks.php`);
  }

  getById(id: number){
    return this.http.get(`${this._baseUrl}/_tasks.php?id=${id}`);
  }

  create(task: Task){
    return this.http.post(`${this._baseUrl}/_tasks.php`, task);
  }

  update(task: Task){
    return this.http.put(`${this._baseUrl}/_tasks.php`, task);
  }

  delete(id: number){
    return this.http.delete(`${this._baseUrl}/_tasks.php?id=${id}`);
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
