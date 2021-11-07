import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRowComponent } from './element-row.component';

describe('ElementRowComponent', () => {
  let component: ElementRowComponent;
  let fixture: ComponentFixture<ElementRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
