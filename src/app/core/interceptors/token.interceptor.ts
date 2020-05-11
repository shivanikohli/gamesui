import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("inside interceptor----");
    this.spinner.show();
    return next.handle(request).pipe(
      tap(res=>{
        if(res instanceof HttpResponse){
          this.spinner.hide();
        }
      })
    );
  }
}
