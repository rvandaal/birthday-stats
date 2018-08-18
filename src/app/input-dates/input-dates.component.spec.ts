import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatesComponent } from './input-dates.component';

describe('InputDatesComponent', () => {
  let component: InputDatesComponent;
  let fixture: ComponentFixture<InputDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
