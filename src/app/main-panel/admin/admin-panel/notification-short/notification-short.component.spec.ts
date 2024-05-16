import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationShortComponent } from './notification-short.component';

describe('NotificationShortComponent', () => {
  let component: NotificationShortComponent;
  let fixture: ComponentFixture<NotificationShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
