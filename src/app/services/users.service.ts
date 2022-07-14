import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../models/user";
import {UserPublication} from "../models/userPublication";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // Endpoint
  basePath = 'https://full-stack-social-app-api.herokuapp.com/api/v1/users/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  authenticateUser(item: any): Observable<User> {
    return this.http.post<User>(`${this.basePath}/sign-in`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  registerUser(item: any): Observable<User> {
    return this.http.post<User>(`${this.basePath}/sign-up`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getUserPublicationByToken(): Observable<UserPublication> {
    return this.http.get<UserPublication>(`${this.basePath}/get-user-publication-by-token`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getUserIdByToken(): Observable<Number> {
    return this.http.get<Number>(`${this.basePath}/get-user-id-by-token`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this.basePath}/get-all`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
