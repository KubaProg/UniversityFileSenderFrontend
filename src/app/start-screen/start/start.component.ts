import {Component, Inject, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../../login-screen/auth.service";

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit{
  constructor(private authService: AuthService ,private router: Router) { }

  ngOnInit(): void {
        this.authService.clearUserData();
    }

  navigateLogin(type: string) {
    this.router.navigate(['login', type]);
  }

}
