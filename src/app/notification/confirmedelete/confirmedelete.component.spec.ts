import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedeleteComponent } from './confirmedelete.component';

describe('ConfirmedeleteComponent', () => {
  let component: ConfirmedeleteComponent;
  let fixture: ComponentFixture<ConfirmedeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
