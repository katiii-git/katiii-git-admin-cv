import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEducationComponent } from './admin-education.component';

describe('AdminEducationComponent', () => {
  let component: AdminEducationComponent;
  let fixture: ComponentFixture<AdminEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
