import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveToListComponent } from './move-to-list.component';

describe('MoveToListComponent', () => {
  let component: MoveToListComponent;
  let fixture: ComponentFixture<MoveToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
