import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCourseModalComponent } from './join-course-modal.component';

describe('JoinCourseModalComponent', () => {
  let component: JoinCourseModalComponent;
  let fixture: ComponentFixture<JoinCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCourseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
