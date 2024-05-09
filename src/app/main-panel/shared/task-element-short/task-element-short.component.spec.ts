import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskElementShortComponent } from './task-element-short.component';

describe('TaskElementShortComponent', () => {
  let component: TaskElementShortComponent;
  let fixture: ComponentFixture<TaskElementShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskElementShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskElementShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
