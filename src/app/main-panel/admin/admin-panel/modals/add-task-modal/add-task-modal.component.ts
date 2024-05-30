import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatChip, MatChipListbox, MatChipRemove} from "@angular/material/chips";
import {NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import { addTaskDialogData } from "../../admin-panel.component";
import { DatePipe } from '@angular/common';
import {AssignmentService} from "../../../../../services/assignment.service";
import {AssignmentGetDto, CourseDto} from "../../../../../api";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatLabel,
    MatChipListbox,
    MatChip,
    NgForOf,
    MatIcon,
    MatSuffix,
    MatChipRemove
  ],
  providers: [
    provideNativeDateAdapter(),
    DatePipe
  ],
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  attachments: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: CourseDto },
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      newTask: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['', Validators.required],
      attachment: ['']
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

  onSubmit() {
    const formValue = this.taskForm.value;
    const formattedDeadline = this.datePipe.transform(formValue.deadline, 'yyyy-MM-ddTHH:mm:ss') || '';

    const formData = new FormData();
    formData.append('assignmentName', formValue.newTask);
    formData.append('deadlineDate', formattedDeadline);
    formData.append('description', formValue.description);
    this.attachments.forEach(file => formData.append('files', file));


    if(this.data.course.id){

      this.assignmentService.saveAssignmentUsingPOST(
        this.data.course.id,
        formData
      ).subscribe(
        response => {
          console.log('Assignment created successfully', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Failed to create assignment', error);
        }
      );
    }

    }

}
