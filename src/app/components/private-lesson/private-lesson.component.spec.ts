import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLessonComponent } from './private-lesson.component';

describe('PrivateLessonComponent', () => {
  let component: PrivateLessonComponent;
  let fixture: ComponentFixture<PrivateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
