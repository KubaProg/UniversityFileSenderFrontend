import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { addTaskDialogData } from '../../../../admin/admin-panel/admin-panel.component';
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatChip, MatChipListbox, MatChipRemove} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-student-edit-task-modal',
  standalone: true,
  templateUrl: './student-edit-task-modal.component.html',
  styleUrls: ['./student-edit-task-modal.component.scss'],
  imports: [
    DatePipe,
    MatDialogContent,
    MatButton,
    NgForOf,
    MatChip,
    MatChipListbox,
    MatIcon,
    MatDialogActions,
    MatDialogClose,
    MatLabel,
    MatChipRemove
  ]
})
export class StudentEditTaskModalComponent implements OnInit {
  attachments: File[] = [];
  sourceAttachments: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<StudentEditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: addTaskDialogData
  ) {}

  ngOnInit(): void {
    if (this.data.attachments && this.data.attachments.length > 0) {
      this.attachments = [...this.data.attachments];
    }

    this.sourceAttachments = [
      new File([''], 'source1.pdf'),
      new File([''], 'source2.docx')
    ];
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event) {
    const inputNode = event.target as HTMLInputElement;
    if (inputNode.files && inputNode.files.length > 0) {
      const filesArray = Array.from(inputNode.files);
      this.attachments.push(...filesArray);
    }
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  downloadSourceAttachment(file: File) {
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
