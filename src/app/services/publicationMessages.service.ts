import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {PublicationComment} from "../models/publicationComment";

@Injectable({
  providedIn: 'root'
})
export class PublicationMessagesService {

  // Endpoint
  basePath = 'https://full-stack-social-app-api.herokuapp.com/api/v1/publication_comments';

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

  getAll(): Observable<PublicationComment> {
    return this.http.get<PublicationComment>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByPublicationId(publicationId: any): Observable<PublicationComment> {
    return this.http.get<PublicationComment>(`${this.basePath}/getByPublicationId/${publicationId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<PublicationComment> {
    return this.http.post<PublicationComment>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<PublicationComment> {
    return this.http.put<PublicationComment>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  deleteByPublicationId(id: any){
    return this.http.delete(`${this.basePath}/deleteByPublicationId/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  deleteByLevel1(level1: any){
    return this.http.delete(`${this.basePath}/deleteByLevel1/${level1}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  deleteByLevel1AndLevel2(level1: any, level2: any){
    return this.http.delete(`${this.basePath}/deleteByLevel1AndLevel2/${level1}/${level2}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  deleteByLevel1AndLevel2AndLevel3(level1: any, level2: any, level3: any){
    return this.http.delete(`${this.basePath}/deleteByLevel1AndLevel2/${level1}/${level2}/${level3}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
