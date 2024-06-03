import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {AssignmentGetDto, StudentAndAssignmentStatusDto} from "../api";
import {Injectable} from "@angular/core";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private baseUrl = 'http://localhost:8080/api/assignments';

  private assignmentBaseUrl = 'http://localhost:8080/api/courses';
  private userBaseUrl = 'http://localhost:8080/api/users';

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

  public submitAssignmentUsingPUT(assignmentId: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${assignmentId}/submit`, formData);
  }

  public downloadStudentAttachment(userId: number, assignmentId: number): Observable<Blob> {
    return this.http.get(`${this.userBaseUrl}/${userId}/assignments/${assignmentId}/download`, {
      responseType: 'blob'
    });
  }

  public downloadStudentAttachmentAndSave(userId: number, assignmentId: number): void {
    this.downloadStudentAttachment(userId, assignmentId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/zip' });
      const filename = `assignment_files.zip`;
      saveAs(blob, filename);
    }, error => {
      console.error('Download error:', error);
    });
  }

  public downloadAssignment(assignmentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${assignmentId}/download`, {
      responseType: 'blob'
    });
  }

  public downloadAssignmentAndSave(assignmentId: number): void {
    this.downloadAssignment(assignmentId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/zip' });
      const filename = `assignment_files.zip`;
      saveAs(blob, filename);
    }, error => {
      console.error('Download error:', error);
    });
  }


}
