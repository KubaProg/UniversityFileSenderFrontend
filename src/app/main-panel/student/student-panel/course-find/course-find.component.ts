import { Component, OnInit } from '@angular/core';
import { CourseElementShortComponent } from '../../../shared/course-element-short/course-element-short.component';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../../../shared/top-bar/top-bar.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CourseDto } from '../../../../api';
import {CourseStateService} from "../../../admin/admin-panel/course-panel/course-state.service";
import {CustomCourseService} from "../../../admin/admin-panel/course-panel/custom-course.service";

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
export class CourseFindComponent implements OnInit {
  courses: CourseDto[] = [];
  searchTerm: string = '';
  filteredCourses: CourseDto[] = this.courses;

  constructor(private courseService: CustomCourseService) {}

  ngOnInit(): void {
      this.loadNotAssignedCourses();
  }

  loadNotAssignedCourses(){
    this.courseService.getNotAssignedCourses().subscribe(
      (courses) => {
        this.courses = courses;
        this.filteredCourses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.courseName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
