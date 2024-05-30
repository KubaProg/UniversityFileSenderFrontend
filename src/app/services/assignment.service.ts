import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {AssignmentGetDto, StudentAndAssignmentStatusDto} from "../api";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private baseUrl = 'http://localhost:8080/api/assignments'; // Update the base URL if necessary

  private assignmentBaseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  public getStudentsByAssignmentIdUsingGET(assignmentId: number): Observable<Array<StudentAndAssignmentStatusDto>> {
    return this.http.get<Array<StudentAndAssignmentStatusDto>>(`${this.baseUrl}/${assignmentId}/users`);
  }


  public saveAssignmentUsingPOST(
    courseId: number,
    formData: FormData,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: '*/*', context?: HttpContext }
  ): Observable<AssignmentGetDto> {
    return this.http.post<AssignmentGetDto>(
      `${this.assignmentBaseUrl}/${courseId}/assignments`,
      formData,
      {
        observe,
        reportProgress,
        ...options
      }
    );
  }


  public updateAssignmentUsingPUT(
    assignmentId: number,
    formData: FormData,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined, context?: HttpContext }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${assignmentId}`, formData, {
      observe,
      reportProgress,
      ...options
    });
  }

}
