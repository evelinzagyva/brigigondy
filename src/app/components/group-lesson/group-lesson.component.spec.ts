import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLessonComponent } from './group-lesson.component';

describe('GroupLessonComponent', () => {
  let component: GroupLessonComponent;
  let fixture: ComponentFixture<GroupLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
