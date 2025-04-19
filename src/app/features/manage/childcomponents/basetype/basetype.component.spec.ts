import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasetypeComponent } from './basetype.component';

describe('BasetypeComponent', () => {
  let component: BasetypeComponent;
  let fixture: ComponentFixture<BasetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
