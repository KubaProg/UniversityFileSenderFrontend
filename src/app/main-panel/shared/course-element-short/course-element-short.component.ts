import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-course-element-short',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './course-element-short.component.html',
  styleUrl: './course-element-short.component.scss'
})
export class CourseElementShortComponent {

  @Input() course = 'Course Name'
  @Input() isStudent = false;

}
