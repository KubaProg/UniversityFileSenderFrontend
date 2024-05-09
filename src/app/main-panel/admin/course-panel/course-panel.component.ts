import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {TaskElementShortComponent} from "../../shared/task-element-short/task-element-short.component";

@Component({
  selector: 'app-course-panel',
  standalone: true,
  imports: [
    TopBarComponent,
    MatList,
    MatListItem,
    MatButton,
    NgForOf,
    NgIf,
    TaskElementShortComponent,
  ],
  templateUrl: './course-panel.component.html',
  styleUrls: ['./course-panel.component.scss']
})
export class CoursePanelComponent implements OnInit {
  course: string | null = '';
  showNotifications = false;
  notifications: string[] = ["Notification 1", "Notification 2"]; // Example notifications
  tasks: string[] = ["Task 1", "Task 2", "Task 3"]; // Example tasks

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
