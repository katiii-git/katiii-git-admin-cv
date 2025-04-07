import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkexperienceComponent } from './admin-workexperience.component';

describe('AdminWorkexperienceComponent', () => {
  let component: AdminWorkexperienceComponent;
  let fixture: ComponentFixture<AdminWorkexperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWorkexperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
