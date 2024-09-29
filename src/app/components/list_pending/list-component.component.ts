import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosPendientesComponent } from './list-pending';

describe('IngresosPendientesComponent', () => {
  let component: IngresosPendientesComponent;
  let fixture: ComponentFixture<IngresosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosPendientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
