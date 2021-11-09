import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitShootingScheduleComponent } from './init-shooting-schedule.component';

describe('InitShootingScheduleComponent', () => {
  let component: InitShootingScheduleComponent;
  let fixture: ComponentFixture<InitShootingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitShootingScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitShootingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
