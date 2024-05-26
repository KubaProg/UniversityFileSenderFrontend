import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { CourseDto } from '../../../api';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { CourseElementShortComponent } from '../../shared/course-element-short/course-element-short.component';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    CourseElementShortComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.scss']
})
export class StudentPanelComponent implements OnInit {
  courses: CourseDto[] = [];
  basePath = '/api/user/current/courses'

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    this.httpClient.get<CourseDto[]>(environment.apiUrl + this.basePath).subscribe(
      courses => {
        this.courses = courses;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
