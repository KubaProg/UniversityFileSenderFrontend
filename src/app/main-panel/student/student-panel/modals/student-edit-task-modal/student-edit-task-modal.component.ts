import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from "@angular/material/dialog";
import {DatePipe, NgForOf} from "@angular/common";
import { AssignmentService } from "../../../../../services/assignment.service";
import { AssignmentGetDto } from "../../../../../api";
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-student-edit-task-modal',
  standalone: true,
  templateUrl: './student-edit-task-modal.component.html',
  styleUrls: ['./student-edit-task-modal.component.scss'],
  imports: [
    MatDialogContent,
    DatePipe,
    NgForOf,
    MatChip,
    MatChipListbox,
    MatButton,
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatLabel
  ],
  providers: [DatePipe]
})
export class StudentEditTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  attachments: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<StudentEditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignmentData: AssignmentGetDto },
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const assignmentData = this.data.assignmentData;

    console.log(assignmentData);

    this.taskForm = this.formBuilder.group({
      newTask: [{ value: assignmentData.assignmentName || '', disabled: true }],
      deadline: [{ value: assignmentData.deadlineDate, disabled: true }],
      description: [{ value: assignmentData.description || '', disabled: true }],
      attachment: [null]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event) {
    const inputNode = event.target as HTMLInputElement;
    if (inputNode.files && inputNode.files.length > 0) {
      const filesArray = Array.from(inputNode.files);
      this.attachments.push(...filesArray);
      this.taskForm.patchValue({ attachment: this.attachments });
      this.taskForm.get('attachment')?.updateValueAndValidity();
    }
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  onDownloadAssignementData(assignmentId: number) {
    this.assignmentService.downloadAssignmentAndSave(assignmentId);
  }
}
