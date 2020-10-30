import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Master } from '../model/master.model';
import { Filter } from '../model/filter.model';

/**
 * Various services used to insert, update, retrive and delete the db data
 */
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/';

  getMaster(filter: Filter) : Observable<Master[]> {
    return this.http.get<Master[]>(this.baseUrl+JSON.stringify(filter))
    .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


}
