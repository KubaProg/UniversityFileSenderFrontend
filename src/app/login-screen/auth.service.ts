import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  user = new BehaviorSubject<UserDto>(null!);

  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user.next(JSON.parse(userData));
    }
  }

  logIn(authRequest: AuthenticationRequest): Observable<void> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/public/login`, authRequest).pipe(
      map(response => {
        const token = response.token;
        this.getCurrentUser(token).subscribe(user => {
          this.setUserInStorage(user,token);
          this.user.next(user);
        });
      })
    );
  }

  getCurrentUser(token: string): Observable<UserDto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserDto>(`${this.baseUrl}/api/user/current`, { headers });
  }

  setUserInStorage(user: UserDto, token: string): void {
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('jwtToken', JSON.stringify(token));
  }

  logoutUser(): void {
    this.user.next(null!);
    localStorage.removeItem('userData');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['start']);
  }
}
