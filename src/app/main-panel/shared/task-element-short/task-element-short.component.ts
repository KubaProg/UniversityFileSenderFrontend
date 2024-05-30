import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { EditTaskModalComponent } from "../../admin/admin-panel/modals/edit-task-modal/edit-task-modal.component";
import { DeleteTaskModalComponent } from "../../admin/admin-panel/modals/delete-task-modal/delete-task-modal.component";
import { StudentEditTaskModalComponent } from "../../student/student-panel/modals/student-edit-task-modal/student-edit-task-modal.component";
import { AssignmentControllerService, AssignmentGetDto } from "../../../api";

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
  @Input() task: AssignmentGetDto | undefined;
  @Input() isStudentMode = false;
  @Output() taskDeleted = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private assignmentService: AssignmentControllerService
  ) {}

  openTaskEditModal() {
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      data: { assignmentData: this.task },
    });

    console.log(this.task)

    dialogRef.afterClosed().subscribe(editedTaskResult => {
      this.taskDeleted.emit();
    });
  }

  openDeleteTaskModal(task: AssignmentGetDto | undefined) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (task) {
        if (result && task.assignmentName === result) {
          if (task.id) {
            this.assignmentService.deleteAssignmentUsingDELETE(task.id).subscribe(
              () => {
                console.log('Task deleted successfully');
                this.taskDeleted.emit();
              },
              error => {
                console.error('Failed to delete task', error);
              }
            );
          }
        }
      }
    });
  }

  openStudentTaskEditModal() {
    const dialogRef = this.dialog.open(StudentEditTaskModalComponent, {
      data: { newTask: this.task },
    });

    dialogRef.afterClosed().subscribe(editedTaskResult => {
      this.task = editedTaskResult;
    });
  }
}
