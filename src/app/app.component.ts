import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {StartComponent} from "./start-screen/start/start.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,StartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UniversityFileSender';
}
