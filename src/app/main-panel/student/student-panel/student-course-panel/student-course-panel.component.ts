import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {NotificationShortComponent} from "../../../admin/admin-panel/notification-short/notification-short.component";
import {TaskElementShortComponent} from "../../../shared/task-element-short/task-element-short.component";
import {TopBarComponent} from "../../../shared/top-bar/top-bar.component";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddTaskModalComponent} from "../../../admin/admin-panel/add-task-modal/add-task-modal.component";
import {AssignmentGetDto} from "../../../../api";

@Component({
  selector: 'app-student-course-panel',
  standalone: true,
  imports: [
    MatButton,
    MatList,
    NgForOf,
    NgIf,
    NotificationShortComponent,
    TaskElementShortComponent,
    TopBarComponent
  ],
  templateUrl: './student-course-panel.component.html',
  styleUrl: './student-course-panel.component.scss'
})
export class StudentCoursePanelComponent implements OnInit {

  course: string | null = '';
  tasks: AssignmentGetDto[] = [];
  newTask = ''

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });
  }

}
