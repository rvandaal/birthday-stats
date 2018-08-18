import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDatesComponent } from './output-dates.component';

describe('OutputDatesComponent', () => {
  let component: OutputDatesComponent;
  let fixture: ComponentFixture<OutputDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
