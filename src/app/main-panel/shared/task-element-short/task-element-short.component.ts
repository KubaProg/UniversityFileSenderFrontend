import { Component, Input } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

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
}
