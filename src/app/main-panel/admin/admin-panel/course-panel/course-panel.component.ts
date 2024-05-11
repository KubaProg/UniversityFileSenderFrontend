import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopBarComponent } from "../../../shared/top-bar/top-bar.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {TaskElementShortComponent} from "../../../shared/task-element-short/task-element-short.component";
import {CreateCourseModalComponent} from "../create-course-modal/create-course-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-course-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    MatList,
    MatListItem,
    MatButton,
    NgForOf,
    NgIf,
    TaskElementShortComponent,
  ],
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  course: string | null = '';
  showNotifications = false;
  notifications: string[] = ["Notification 1", "Notification 2"];
  tasks: string[] = ["Task 1", "Task 2", "Task 3"];
  newTask = ''

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      data: {newTask: this.newTask},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newTask = result;
    });
  }

}
