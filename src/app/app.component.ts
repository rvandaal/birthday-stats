import { AantalKeerOuderService } from './services/aantal-keer-ouder.service';
import { SamenZoveelDagenOudService } from './services/samen-zoveel-dagen-oud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Gebeurtenis } from './gebeurtenis.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { timer } from './timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  model: FormGroup;

  gebeurtenissen: Array<Gebeurtenis>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.model = new FormGroup({
      persons: new FormArray([])
    });
    const personsArray = this.model.get('persons') as FormArray;
    for (let i = 0; i < 6; i++) {
      personsArray.push(this.createPersonInput(i));
    }
    this.model.valueChanges.subscribe(value => {
      setTimeout(() => this.generateOutputList(value));
    });
  }

  createPersonInput(i) {
    // if (i === 0) {
    //   return this.fb.group({
    //     name: 'Peter',
    //     birthdate: new NgbDate(1947, 10, 28)
    //   });
    // }
    // if (i === 1) {
    //   return this.fb.group({
    //     name: 'Marian',
    //     birthdate: new NgbDate(1949, 4, 4)
    //   });
    // }
    // if (i === 4) {
    //   return this.fb.group({
    //     name: 'Rob',
    //     birthdate: new NgbDate(1975, 6, 19)
    //   });
    // }
    // if (i === 2) {
    //   return this.fb.group({
    //     name: 'Frank',
    //     birthdate: new NgbDate(1977, 1, 15)
    //   });
    // }
    // if (i === 3) {
    //   return this.fb.group({
    //     name: 'Paul',
    //     birthdate: new NgbDate(1982, 7, 14)
    //   });
    // }
    // if (i === 5) {
    //   return this.fb.group({
    //     name: 'Raf',
    //     birthdate: new NgbDate(2012, 11, 25)
    //   });
    // }
    return this.fb.group({
      name: '',
      birthdate: null
    });
  }

  generateOutputList(value) {
    const persons = this.model.get('persons') as FormArray;
    const iedereen = persons.value.filter(person => {
      return person.name !== '' && person.birthdate != null;
    });

    // sort people from oldest to youngest
    iedereen.sort((a: any, b: any) => a.birthdate.before(b.birthdate) ? -1 : 1);

    const maxAantalLevensDagen = 44000; // 120.5 jaar

    const gebeurtenisArray = new Array<Gebeurtenis>();

    const f = function (startIndex: number, nestedLevel: number, aantalPersonen: number, aantalDagen: number, personsToConsider: any[]) {
      // nestedLevel = depth in for loops. 0 = about to begin with first for loop.
      if (nestedLevel < aantalPersonen) {
        for (let i = startIndex; i < iedereen.length; i++) {
          const p = iedereen[i];
          // Niet nodig om de jongste persoon uit te sluiten bij nestedLevel 0,
          // f wordt nog een keer aangeroepen maar de for loop zal meteen aborten. Wat we ook willen.
          f(i + 1, nestedLevel + 1, aantalPersonen, aantalDagen, [...personsToConsider, p]);
        }
      } else {
        const g =
          SamenZoveelDagenOudService.getGebeurtenis(aantalDagen, personsToConsider);
        if (g != null) {
          gebeurtenisArray.push(g);
        }
      }
    };


    //const tim = timer();
    //console.log('time: ', tim.ms);
    for (let aantalPersonen = 1; aantalPersonen <= iedereen.length; aantalPersonen++) {
      for (let l = 10000; l <= aantalPersonen * maxAantalLevensDagen; l += 1000) {
        f(0, 0, aantalPersonen, l, []);

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
    //console.log('time: ', tim.ms);

    this.gebeurtenissen = gebeurtenisArray;
    // use before, then the order is correct if events fall on the same day
    this.gebeurtenissen.sort((a: Gebeurtenis, b: Gebeurtenis) => a.datum.isBefore(b.datum) ? -1 : 1);

  }
}
