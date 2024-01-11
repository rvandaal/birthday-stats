import { NumberOfTimesOlderService } from './services/numberOfTimesOlder.service';
import { TogetherNumberOfDaysOldService } from './services/together-number-of-days-old';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Event } from './event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Birthday-stats';

  model: FormGroup | undefined;

  events: Array<Event> = [];

  constructor(
    private fb: FormBuilder,
    private numberOfTimesOlderService: NumberOfTimesOlderService,
    private togetherNumberOfDaysOldService: TogetherNumberOfDaysOldService
  ) {
    this.model = new FormGroup({
      persons: new FormArray<FormGroup>([])
    });
    const personsArray = this.model.get('persons') as FormArray;
    for (let i = 0; i < 8; i++) {
      personsArray.push(this.createPersonInput(i));
    }
    this.model.valueChanges.subscribe(value => {
      setTimeout(() => this.generateOutputList(value));
    });
  }

  ngOnInit() {
  }

  createPersonInput(i: number) {
    // if (i === 0) {
    //   return this.fb.group({
    //     name: 'Peter',
    //     birthdate: new Date(1947, 9, 28),
    //     display: true
    //   });
    // }
    // if (i === 1) {
    //   return this.fb.group({
    //     name: 'Marian',
    //     birthdate: new Date(1949, 3, 4),
    //     display: true
    //   });
    // }
    // if (i === 2) {
    //   return this.fb.group({
    //     name: 'Rob',
    //     birthdate: new Date(1975, 5, 19),
    //     display: true
    //   });
    // }
    // if (i === 3) {
    //   return this.fb.group({
    //     name: 'Frank',
    //     birthdate: new Date(1977, 0, 15),
    //     display: true
    //   });
    // }
    // if (i === 4) {
    //   return this.fb.group({
    //     name: 'Paul',
    //     birthdate: new Date(1982, 6, 14),
    //     display: true
    //   });
    // }
    // if (i === 5) {
    //   return this.fb.group({
    //     name: 'Raf',
    //     birthdate: new Date(2012, 10, 25),
    //     display: true
    //   });
    // }
    // if (i === 6) {
    //   return this.fb.group({
    //     name: 'Ilse',
    //     birthdate: new Date(1985, 2, 20),
    //     display: true
    //   });
    // }
    // if (i === 7) {
    //   return this.fb.group({
    //     name: 'Marli',
    //     birthdate: new Date(2022, 5, 20),
    //     display: true
    //   });
    // }
    return this.fb.group({
      name: '',
      birthdate: undefined,
      display: true
    });
  }

  generateOutputList(value: string) {
    const persons = this.model!.get('persons') as FormArray;
    const visiblePersons = persons.value.filter((person: any) => {
      return person.name !== '' && person.birthdate != null && person.display === true;
    });

    // sort people from oldest to youngest
    visiblePersons.sort((a: any, b: any) => a.birthdate < b.birthdate ? -1 : 1);

    const maxNumberOfDaysInLife = 44000; // 120.5 jaar

    const eventArray = new Array<Event>();

    const self = this;

    for (let k = 2; k <= 5.0; k += 1) {
      for (let i = 0; i < visiblePersons.length; i++) {
        const p0 = visiblePersons[i];
        for (let j = i + 1; j < visiblePersons.length; j++) {
          const p1 = visiblePersons[j];
          eventArray.push(this.numberOfTimesOlderService.getEvent(k, p0, p1));
        }
      }
    }


    const f = function (
      startIndex: number,
      nestedLevel: number,
      numberOfPersons: number,
      numberOfDays: number,
      personsToConsider: any[]
    ) {
      // nestedLevel = depth in for loops. 0 = about to begin with first for loop.
      if (nestedLevel < numberOfPersons) {
        for (let index = startIndex; index < visiblePersons.length; index++) {
          const p = visiblePersons[index];
          // Niet nodig om de jongste persoon uit te sluiten bij nestedLevel 0,
          // f wordt nog een keer aangeroepen maar de for loop zal meteen aborten. Wat we ook willen.
          f(index + 1, nestedLevel + 1, numberOfPersons, numberOfDays, [...personsToConsider, p]);
        }
      } else {
        const g =
          self.togetherNumberOfDaysOldService.getGebeurtenis(numberOfDays, personsToConsider);
        if (g != null) {
          eventArray.push(g);
        }
      }
    };


    //const tim = timer();
    //console.log('time: ', tim.ms);



    for (let numberOfPersons = 1; numberOfPersons <= visiblePersons.length; numberOfPersons++) {
      for (let numberOfDays = 10000; numberOfDays <= numberOfPersons * maxNumberOfDaysInLife; numberOfDays += 1000) {
        f(0, 0, numberOfPersons, numberOfDays, []);

        // Dit geeft weer wat f() doet:

        // for (let i = 0; i < iedereen.length; i++) {
        //   const p0 = iedereen[i];
        //   for (let j = i + 1; j < iedereen.length; j++) {
        //     const p1 = iedereen[j];
        //     for (let k = j + 1; k < iedereen.length; k++) {
        //       const p2 = iedereen[k];
        //       for (let p = k + 1; p < iedereen.length; p++) {
        //         const p3 = iedereen[p];
        //         for (let q = p + 1; q < iedereen.length; q++) {
        //           const p4 = iedereen[q];
        //           for (let r = q + 1; r < iedereen.length; r++) {
        //             const p5 = iedereen[r];
        //             const g =
        //               SamenZoveelDagenOudService.getGebeurtenis(l, [p0, p1, p2, p3, p4, p5].slice(0, aantalPersonen));
        //             if (g != null) {
        //               this.gebeurtenissen.push(g);
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }
    // //console.log('time: ', tim.ms);

    this.events = eventArray;
    // use before, then the order is correct if events fall on the same day
    this.events.sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());

  }
}
