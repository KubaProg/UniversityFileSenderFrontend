import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user || !localStorage.getItem('jwtToken')) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
