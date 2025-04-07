import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificatesComponent } from './admin-certificates.component';

describe('AdminCertificatesComponent', () => {
  let component: AdminCertificatesComponent;
  let fixture: ComponentFixture<AdminCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
