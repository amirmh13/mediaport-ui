import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetShootingDayDateComponent } from './set-shooting-day-date.component';

describe('SetShootingDayDateComponent', () => {
  let component: SetShootingDayDateComponent;
  let fixture: ComponentFixture<SetShootingDayDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetShootingDayDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetShootingDayDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
