import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})

export class MessagesService{

  // Endpoint
  basePath = 'https://fullstacksocialapp-api-lenco.onrender.com/api/v1/messages';

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

  getAll(): Observable<Message> {
    return this.http.get<Message>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByUserSenderIdAndUserReceiverId(userSenderId: number, userReceiverId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.basePath}/userSenderId/${userSenderId}/userReceiverId/${userReceiverId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<Message> {
    return this.http.post<Message>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Message> {
    return this.http.put<Message>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),catchError(this.handleError));
  }
}
