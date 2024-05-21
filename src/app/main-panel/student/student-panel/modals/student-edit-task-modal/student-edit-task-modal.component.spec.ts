import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditTaskModalComponent } from './student-edit-task-modal.component';

describe('StudentEditTaskModalComponent', () => {
  let component: StudentEditTaskModalComponent;
  let fixture: ComponentFixture<StudentEditTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEditTaskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentEditTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
