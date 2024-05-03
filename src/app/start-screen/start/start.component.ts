import {Component, Inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {Router} from "@angular/router";
import {LoginComponent} from "../../login-screen/login/login.component";
import {MatIcon} from "@angular/material/icon";

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
export class StartComponent {
  constructor(private router: Router) { }

  navigateLogin(type: string) {
    this.router.navigate(['login', type]);
  }

  navigateRegister() {
    this.router.navigate(['register'])
  }
}
