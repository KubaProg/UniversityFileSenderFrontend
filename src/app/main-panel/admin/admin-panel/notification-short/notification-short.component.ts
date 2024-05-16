import {Component, Input} from '@angular/core';
import {MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle} from "@angular/material/button-toggle";

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

  @Input() notification = '';

  onStudentAccept() {
    console.log('Notification clicked:', this.notification);
  }
}
