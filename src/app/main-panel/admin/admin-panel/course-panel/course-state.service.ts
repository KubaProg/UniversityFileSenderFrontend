import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseDto } from "../../../../api";

@Injectable({
  providedIn: 'root'
})
export class CourseStateService {
  private courseSubject = new BehaviorSubject<CourseDto | null>(this.loadInitialCourse());
  currentCourse = this.courseSubject.asObservable();

  constructor() {}

  updateCurrentCourse(course: CourseDto | undefined) {
    if(course){
      localStorage.setItem('currentCourse', JSON.stringify(course));
      this.courseSubject.next(course);
    }
  }

  private loadInitialCourse(): CourseDto | null {
    const courseJson = localStorage.getItem('currentCourse');
    return courseJson ? JSON.parse(courseJson) : null;
  }


}
