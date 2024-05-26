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
import {addTaskDialogData} from "../../admin-panel.component";

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
    provideNativeDateAdapter()
  ],
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  attachments: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addTaskDialogData,
    private formBuilder: FormBuilder
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


}
