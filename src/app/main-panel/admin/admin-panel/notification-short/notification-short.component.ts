import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {CourseEnrollmentDetailsDto} from "../../../../api";
import {CustomCourseService} from "../course-panel/custom-course.service";

@Component({
  selector: 'app-notification-short',
  standalone: true,
  imports: [
    MatListItem,
    MatButton,
    MatButtonToggle
  ],
  templateUrl: './notification-short.component.html',
  styleUrl: './notification-short.component.scss'
})
export class NotificationShortComponent {

  @Input() notification: CourseEnrollmentDetailsDto | undefined;
  @Output() enrollmentAccepted = new EventEmitter<number>();

  constructor(private courseService: CustomCourseService) {}

  onStudentAccept( ) {
    if(this.notification?.enrollmentId){
      this.courseService.acceptEnrollment(this.notification.enrollmentId).subscribe(
        () => {
          console.log('Enrollment accepted successfully.');
          this.enrollmentAccepted.emit(this.notification?.enrollmentId);
        },
        error => {
          console.error('Error accepting enrollment:', error);
        }
      )
    }
  }

}
