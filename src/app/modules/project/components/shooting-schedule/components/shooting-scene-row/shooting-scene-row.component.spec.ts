import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingSceneRowComponent } from './shooting-scene-row.component';

describe('ShootingSceneRowComponent', () => {
  let component: ShootingSceneRowComponent;
  let fixture: ComponentFixture<ShootingSceneRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingSceneRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingSceneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
