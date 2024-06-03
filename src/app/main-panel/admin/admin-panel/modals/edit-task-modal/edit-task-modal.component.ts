import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatChip, MatChipListbox, MatChipRemove } from "@angular/material/chips";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import {NgForOf, DatePipe, NgIf} from "@angular/common";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle } from "@angular/material/expansion";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {
  AssignmentGetDto,
  StudentAndAssignmentStatusDto,
} from "../../../../../api";
import {AssignmentService} from "../../../../../services/assignment.service";

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatChip,
    MatChipListbox,
    MatChipRemove,
    MatDatepicker,
    MatDatepickerInput,
    MatExpansionModule,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    NgForOf,
    ReactiveFormsModule,
    MatDialogClose,
    MatExpansionPanelTitle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    NgIf
  ],
  providers: [
    provideNativeDateAdapter(),
    DatePipe
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  attachments: File[] = [];
  displayedColumns: string[] = ['name', 'surname', 'status', 'submission'];
  assignedPeople = new MatTableDataSource<StudentAndAssignmentStatusDto>();

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignmentData: AssignmentGetDto },
    private formBuilder: FormBuilder,
    private assignmentService: AssignmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const assignmentData = this.data.assignmentData;

    const formattedDeadlineDate = this.datePipe.transform(assignmentData.deadlineDate, 'yyyy-MM-dd') || '';

    this.taskForm = this.formBuilder.group({
      newTask: [assignmentData.assignmentName || '', Validators.required],
      deadline: [formattedDeadlineDate, Validators.required],
      description: [assignmentData.description || '', Validators.required],
      attachment: [null]
    });

    if (assignmentData.id) {
      this.assignmentService.getStudentsByAssignmentIdUsingGET(assignmentData.id).subscribe(
        (students: StudentAndAssignmentStatusDto[]) => {
          this.assignedPeople.data = students;
        },
        (error) => {
          console.error('Failed to get students by assignment id', error);
        }
      );
    }
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

  onDownloadSubmission(assignmentId: number, student: StudentAndAssignmentStatusDto) {
    this.assignmentService.downloadStudentAttachmentAndSave(student.student?.id!,assignmentId);
  }

  onSubmit(formValue: any) {
    const formattedDeadline = this.datePipe.transform(formValue.deadline, 'yyyy-MM-ddTHH:mm:ss') || '';

    const formData = new FormData();
    formData.append('assignmentName', formValue.newTask);
    formData.append('deadlineDate', formattedDeadline);
    formData.append('description', formValue.description);
    this.attachments.forEach(file => formData.append('files', file));

    this.assignmentService.updateAssignmentUsingPUT(
      this.data.assignmentData.id!,
      formData
    ).subscribe(
      response => {
        console.log('Assignment updated successfully', response);
        this.dialogRef.close();
      },
      error => {
        console.error('Failed to update assignment', error);
      }
    );
  }

  onDownloadAssignementData(assignmentId: number) {
  this.assignmentService.downloadAssignmentAndSave(assignmentId);
  }
}
