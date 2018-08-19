import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  model: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.model = new FormGroup({
      persons: new FormArray([])
    });
    const personsArray = this.model.get('persons') as FormArray;
    for (let i = 0; i < 6; i++) {
      personsArray.push(this.createPersonInput());
    }
  }

  createPersonInput() {
    return this.fb.group({
      name: '',
      birthdate: null
    });
  }
}
