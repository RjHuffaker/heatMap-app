import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CallScript } from '@/_models';

import { AuthenticationService } from '@/_services';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CallScriptService {

  constructor(
  	private http: HttpClient
  ) { }

  private _baseUrl = "https://azpestcontrol.services/api";

  getAll(){
    return this.http.get<CallScript[]>(`${this._baseUrl}/_callScripts.php`);
  }

  getById(id: number){
    return this.http.get(`${this._baseUrl}/_callScripts.php?id=${id}`);
  }

  create(callScript: CallScript){
    return this.http.post(`${this._baseUrl}/_callScripts.php`, callScript);
  }

  update(callScript: CallScript){
    return this.http.put(`${this._baseUrl}/_callScripts.php`, callScript);
  }

  delete(id: number){
    return this.http.delete(`${this._baseUrl}/_callScripts.php?id=${id}`);
  }

}
