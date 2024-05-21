import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursePanelComponent } from './student-course-panel.component';

describe('StudentCoursePanelComponent', () => {
  let component: StudentCoursePanelComponent;
  let fixture: ComponentFixture<StudentCoursePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCoursePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentCoursePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
