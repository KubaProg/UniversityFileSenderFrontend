import { Component } from '@angular/core';
import {TopBarComponent} from "../../shared/top-bar/top-bar.component";
import {CourseElementShortComponent} from "../../shared/course-element-short/course-element-short.component";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    CourseElementShortComponent,
    MatButton,
    NgForOf,
    RouterLink,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './student-panel.component.html',
  styleUrl: './student-panel.component.scss'
})
export class StudentPanelComponent {
  courses = ['Course1', 'Course2', 'Course3', 'Course4', 'Course5', 'Course6', 'Course7', 'Course8', 'Course9', 'Course10']

}
