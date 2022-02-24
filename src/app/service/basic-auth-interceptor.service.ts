import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken: any = sessionStorage.getItem('token');
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        // Authorization: authToken
        headers: req.headers.set('Authorization', authToken)
      });
    }

    return next.handle(req);

  }
}
