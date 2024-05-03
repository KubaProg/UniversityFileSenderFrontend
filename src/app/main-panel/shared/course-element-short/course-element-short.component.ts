import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-course-element-short',
  standalone: true,
  imports: [],
  templateUrl: './course-element-short.component.html',
  styleUrl: './course-element-short.component.scss'
})
export class CourseElementShortComponent {

  @Input() course = 'Course Name'

}
