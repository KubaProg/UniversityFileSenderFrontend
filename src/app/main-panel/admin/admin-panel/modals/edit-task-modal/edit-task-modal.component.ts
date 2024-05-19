import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatChip, MatChipListbox, MatChipRemove} from "@angular/material/chips";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelTitle} from "@angular/material/expansion";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {addTaskDialogData} from "../../admin-panel.component";

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
    MatHeaderRowDef
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  attachments: File[] = [];

  displayedColumns: string[] = ['name', 'surname', 'status', 'submission'];
  assignedPeople = [
    { name: 'John', surname: 'Doe', status: 'Submitted', submission: 'Download' },
    { name: 'Jane', surname: 'Smith', status: 'Not submitted', submission: 'Download' }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addTaskDialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      newTask: [this.data.newTask || '', Validators.required],
      deadline: [this.data.deadline || '', Validators.required],
      description: [this.data.description || '', Validators.required],
      attachment: ['']
    });

    if (this.data.attachments && this.data.attachments.length > 0) {
      this.attachments = [...this.data.attachments];
      this.taskForm.patchValue({ attachment: this.attachments });
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

  onDownloadSubmission(person: any) {
    console.log("Downloading students submission if present")
  }
}
