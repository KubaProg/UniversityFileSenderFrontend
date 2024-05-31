import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthenticationRequest, UserDto } from "../api";
import { Router } from "@angular/router";

interface AuthenticationResponse {
  token: string;
}

@Injectable({
  providedIn: 'any',
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  user = new BehaviorSubject<UserDto | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user.next(JSON.parse(userData));
      console.log('User data loaded from local storage:', JSON.parse(userData));
    }
  }

  logIn(authRequest: AuthenticationRequest): Observable<UserDto> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/public/login`, authRequest).pipe(
      tap(() => {
        this.clearUserData();
      }),
      switchMap(response => {
        const token = response.token;
        return this.getCurrentUser(token).pipe(
          tap(user => {
            this.setUserInStorage(user, token);
            this.user.next(user);
          })
        );
      })
    );
  }

  getCurrentUser(token: string): Observable<UserDto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserDto>(`${this.baseUrl}/api/users/current`, { headers });
  }

  setUserInStorage(user: UserDto, token: string): void {
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('jwtToken', token); // Store the token as string
  }

  logoutUser(): void {
    this.clearUserData();
    this.router.navigate(['start']);
  }

   clearUserData(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('jwtToken');
  }


  public getUserById(userId: number): Observable<UserDto> {
    const url = `${this.baseUrl}/api/users/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get<UserDto>(url, { headers });
  }

}
