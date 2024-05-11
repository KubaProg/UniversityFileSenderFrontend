import { Component } from '@angular/core';
import {TopBarComponent} from "../../shared/top-bar/top-bar.component";
import {CourseElementShortComponent} from "../../shared/course-element-short/course-element-short.component";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateCourseModalComponent} from "./create-course-modal/create-course-modal.component";

export interface addCourseDialogData {
  name: string;
}

export interface addTaskDialogData {
  newTask: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    CourseElementShortComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})

export class AdminPanelComponent {
  name = '';

  constructor(public dialog: MatDialog) {}

  courses = ['Course1', 'Course2', 'Course3', 'Course4', 'Course5', 'Course6', 'Course7', 'Course8', 'Course9', 'Course10']

  openCreateCourseModal() {
    const dialogRef = this.dialog.open(CreateCourseModalComponent, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
    });
  }

  }

