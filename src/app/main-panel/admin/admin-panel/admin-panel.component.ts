import { Component } from '@angular/core';
import {TopBarComponent} from "../../shared/top-bar/top-bar.component";
import {CourseElementShortComponent} from "../../shared/course-element-short/course-element-short.component";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    CourseElementShortComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

  courses = ['Course1', 'Course2', 'Course3', 'Course4', 'Course5', 'Course6', 'Course7', 'Course8', 'Course9', 'Course10']

}
