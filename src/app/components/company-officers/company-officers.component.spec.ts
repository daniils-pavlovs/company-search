import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficersComponent } from './company-officers.component';

describe('CompanyOfficersComponent', () => {
  let component: CompanyOfficersComponent;
  let fixture: ComponentFixture<CompanyOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOfficersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
