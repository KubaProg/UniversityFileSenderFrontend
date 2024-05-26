import {Component, OnInit} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewChild } from '@angular/core';
import { AuthService } from '../../../login-screen/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit
{

  user_name = '';
  user_type = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.user_name = `${user.firstName} ${user.lastName}`;
        this.user_type = user.role === 'ROLE_STUDENT' ? 'Student' : 'Teacher';
      }
    });
  }


  onLogout() {
    this.authService.logoutUser();
  }
}
