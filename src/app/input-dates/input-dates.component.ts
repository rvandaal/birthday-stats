import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-dates',
  templateUrl: './input-dates.component.html',
  styleUrls: ['./input-dates.component.css']
})
export class InputDatesComponent {

  @Input()
  model: FormGroup;

  get persons(): FormArray {
    return this.model.get('persons') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

}
