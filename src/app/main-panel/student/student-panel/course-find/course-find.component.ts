import { Component } from '@angular/core';
import { CourseElementShortComponent } from '../../../shared/course-element-short/course-element-short.component';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../../../shared/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-course-find',
  standalone: true,
  imports: [
    CourseElementShortComponent,
    MatButton,
    NgForOf,
    RouterLink,
    TopBarComponent,
    FormsModule,
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './course-find.component.html',
  styleUrls: ['./course-find.component.scss']
})
export class CourseFindComponent {
  courses = ['Course1', 'Course2', 'Course3', 'Course4', 'Course5', 'Course6', 'Course7', 'Course8', 'Course9', 'Course10'];
  searchTerm: string = '';
  filteredCourses: string[] = this.courses;

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
