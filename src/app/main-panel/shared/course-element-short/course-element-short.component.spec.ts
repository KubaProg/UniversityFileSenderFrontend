import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseElementShortComponent } from './course-element-short.component';

describe('CourseElementShortComponent', () => {
  let component: CourseElementShortComponent;
  let fixture: ComponentFixture<CourseElementShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseElementShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseElementShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
