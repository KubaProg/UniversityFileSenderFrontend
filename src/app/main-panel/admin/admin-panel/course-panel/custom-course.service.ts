import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AssignmentGetDto, CourseDto, CourseEnrollmentDetailsDto} from '../../../../api';
import {environment} from "../../../../../environment"; // Adjust path as necessary

@Injectable({
  providedIn: 'root'
})
export class CustomCourseService {
  constructor(private httpClient: HttpClient) {}

  getAssignments(courseId: number): Observable<AssignmentGetDto[]> {
    const url = `${environment.apiUrl}/api/courses/${courseId}/assignments`;
    return this.httpClient.get<AssignmentGetDto[]>(url);
  }

  getPendingEnrollments(courseId: number): Observable<CourseEnrollmentDetailsDto[]> {
    const url = `${environment.apiUrl}/api/courses/${courseId}/course-enrollments/pending`;
    return this.httpClient.get<CourseEnrollmentDetailsDto[]>(url);
  }

  acceptEnrollment(enrollmentId: number): Observable<void> {
    const url = `${environment.apiUrl}/api/course-enrollments/${enrollmentId}/accept`;
    return this.httpClient.put<void>(url, {});
  }

  getNotAssignedCourses(): Observable<CourseDto[]> {
    const url = `${environment.apiUrl}/api/users/current/courses/not-assigned`;
    return this.httpClient.get<CourseDto[]>(url);
  }

  createPendingEnrollment(courseId: number): Observable<void> {
    const url = `${environment.apiUrl}/api/courses/${courseId}/course-enrollments`;
    return this.httpClient.post<void>(url, {});
  }

}
