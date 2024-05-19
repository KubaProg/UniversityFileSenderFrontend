import { Component, Input } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskModalComponent} from "../../admin/admin-panel/modals/edit-task-modal/edit-task-modal.component";
import {DeleteTaskModalComponent} from "../../admin/admin-panel/modals/delete-task-modal/delete-task-modal.component";

@Component({
  selector: 'app-task-element-short',
  standalone: true,
  templateUrl: './task-element-short.component.html',
  imports: [
    MatButton,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./task-element-short.component.scss']
})
export class TaskElementShortComponent {
  @Input() task = '';

  constructor(private dialog: MatDialog) {}


  openTaskEditModal() {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      data: {newTask: this.task},
    });

    dialogRef.afterClosed().subscribe(editedTaskResult => {
      this.task = editedTaskResult;
    });
  }

  openDeleteTaskModal() {
  const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
    data: {taskToDelete: this.task},
  });

  dialogRef.afterClosed().subscribe(result => {
    this.task = result;
    console.log('deleting task')
  });
}

}
