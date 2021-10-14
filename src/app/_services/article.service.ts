import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from '@/_models';

import { AuthenticationService } from '@/_services';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
  	private http: HttpClient
  ) { }

  private _baseUrl = "https://azpestcontrol.services/api";

  getAll(){
    return this.http.get<Article[]>(`${this._baseUrl}/_articles.php`);
  }

  getById(id: number){
    return this.http.get(`${this._baseUrl}/_articles.php?id=${id}`);
  }

  create(article: Article){
    return this.http.post(`${this._baseUrl}/_articles.php`, article);
  }

  update(article: Article){
    return this.http.put(`${this._baseUrl}/_articles.php`, article);
  }

  delete(id: number){
    return this.http.delete(`${this._baseUrl}/_articles.php?id=${id}`);
  }
}
