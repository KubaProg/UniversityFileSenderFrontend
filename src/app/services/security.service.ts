import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  logIn(data: any) {
    return this.http.post(`${this.apiUrl}/path/to/your/api`, data);
  }
}
