import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { CourseDto } from '../../../api';
import { TopBarComponent } from '../../shared/top-bar/top-bar.component';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {CourseElementShortComponent} from "../../shared/course-element-short/course-element-short.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    NgForOf,
    MatButton,
    CourseElementShortComponent,
    RouterLink
  ],
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.scss']
})
export class StudentPanelComponent implements OnInit {
  courses: CourseDto[] = [];
  basePath = '/api/users/current/courses'

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
