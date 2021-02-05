import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, interval } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { User } from '@/_models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://azpestcontrol.services/api/users.php";

  public mapLat: number = 33.448171;

  public mapLng: number = -112.073894;

  public mapZoom: number = 10;

  constructor(
  	private http: HttpClient,
    private messageService: MessageService
 	) { }

  private _baseUrl = "https://azpestcontrol.services/api";

  getAll(){
    return this.http.get<User[]>(`${this._baseUrl}/_users.php`);
  }

  getById(id: number){
    return this.http.get(`${this._baseUrl}/_users.php?id=${id}`);
  }

  register(user){
    return this.http.post(`${this._baseUrl}/_users.php`, user);
  }

  update(user: User){
    return this.http.put(`${this._baseUrl}/_users.php`, user);
  }

  delete(id: number){
    return this.http.delete(`${this._baseUrl}/_users.php?id=${id}`);
  }

  resetPassword(user: User, oldPassword, newPassword){
    return this.http.put(`${this._baseUrl}/_users.php`, { id: user.id, oldPassword: oldPassword, newPassword: newPassword });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`userService: ${message}`);
  }

  alphabetize(a,b){
    const nameA = a.username.toUpperCase();
    const nameB = b.username.toUpperCase();

    let comparison = 0;

    if(nameA > nameB){
      comparison = 1;
    } else if (nameA < nameB){
      comparison = -1;
    }
    return comparison;
  }

}