import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTypeCardComponent } from './element-type-card.component';

describe('ElementTypeCardComponent', () => {
  let component: ElementTypeCardComponent;
  let fixture: ComponentFixture<ElementTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementTypeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
