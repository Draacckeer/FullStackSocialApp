import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = req.clone({
      setHeaders:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(token);
  }
}
