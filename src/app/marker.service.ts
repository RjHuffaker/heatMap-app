import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Marker } from './marker';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  private markersUrl = `https://rjhuffaker.github.io/residential.csv`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMarkerString(){
    return this.http.get(this.markersUrl, {responseType: 'text'}).pipe(
      tap(_ => this.log(`fetched markerString`)),
      catchError(this.handleError(`getMarkerString`, []))
    );
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
  
  private log(message: string) {
    this.messageService.add(`MarkerService: ${message}`);
  }

}