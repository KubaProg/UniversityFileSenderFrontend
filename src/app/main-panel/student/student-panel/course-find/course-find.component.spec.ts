import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFindComponent } from './course-find.component';

describe('CourseFindComponent', () => {
  let component: CourseFindComponent;
  let fixture: ComponentFixture<CourseFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
