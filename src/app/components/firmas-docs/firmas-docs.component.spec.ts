import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmasDocsComponent } from './firmas-docs.component';

describe('FirmasDocsComponent', () => {
  let component: FirmasDocsComponent;
  let fixture: ComponentFixture<FirmasDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmasDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirmasDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
