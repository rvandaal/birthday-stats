import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-dates',
  templateUrl: './input-dates.component.html',
  styleUrls: ['./input-dates.component.scss']
})
export class InputDatesComponent {

  @Input()
  model: FormGroup | undefined;

  get personFormArray(): FormArray<FormGroup> {
    return this.model!.get('persons') as FormArray;
  }

  constructor() { }

}
