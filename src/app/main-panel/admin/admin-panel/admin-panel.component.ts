import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TopBarComponent} from "../../shared/top-bar/top-bar.component";
import {CourseElementShortComponent} from "../../shared/course-element-short/course-element-short.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateCourseModalComponent} from "./modals/create-course-modal/create-course-modal.component";
import {CourseDto, SaveCourseRequest} from "../../../api";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment";
import {Observable} from "rxjs";

export interface addCourseDialogData {
  name: string;
}

export interface addTaskDialogData {
  newTask: string;
  deadline: string;
  description: string;
  status: string;
  attachments: File[];
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    CourseElementShortComponent,
    NgForOf,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  courses$: Observable<CourseDto[]> | undefined;
  basePath = '/api/users/current/courses'

  constructor(public dialog: MatDialog, private httpClient: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courses$ = this.httpClient.get<CourseDto[]>(environment.apiUrl + this.basePath);
  }

  openCreateCourseModal() {
    const dialogRef = this.dialog.open(CreateCourseModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const courseSaveRequestBody: SaveCourseRequest = {
          courseName: result
        };

        this.httpClient.post<CourseDto>(environment.apiUrl + this.basePath, courseSaveRequestBody).subscribe(
          () => {
            this.loadCourses();
          },
          error => {
            console.error('Error creating course:', error);
          }
        );
      }
    });
  }
}
