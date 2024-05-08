import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-panel',
  standalone: true,
  imports: [],
  templateUrl: './course-panel.component.html',
  styleUrl: './course-panel.component.scss'
})
export class CoursePanelComponent implements OnInit{

  course: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });
  }

}
