import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import {SpinnerService} from '../service/spinner/spinner.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { requestAnimationFrame } from '@progress/kendo-angular-grid/dist/es2015/utils';
@Injectable({
  providedIn: 'root'
})
export class JWThttpInterceptorService implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      })
    }
this.spinnerService.requestStarted();
    return this.handler(next,req);

  }
  handler(next,req){
    return next.handle(req)
    .pipe(
      tap(
        (event)=>{
          if(event instanceof HttpResponse){
this.spinnerService.requestEnded();
          }
        },
        (error:HttpErrorResponse)=>{
          this.spinnerService.resetSpinner();
          throw error;
        }

      )
    )
  }
}

