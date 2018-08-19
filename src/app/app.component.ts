import { AantalKeerOuderService } from './services/aantal-keer-ouder.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Gebeurtenis } from './gebeurtenis.model';

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
      personsArray.push(this.createPersonInput());
    }
    this.model.valueChanges.subscribe(value => {
      this.generateOutputList(value);
    });
  }

  createPersonInput() {
    return this.fb.group({
      name: '',
      birthdate: null
    });
  }

  generateOutputList(value) {
    this.gebeurtenissen = new Array<Gebeurtenis>();
    const persons = this.model.get('persons') as FormArray;
    const iedereen = persons.value.filter(person => {
      return person.name !== '' && person.birthdate != null;
    });

    for (let k = 2; k <= 5.0; k += 1) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          this.gebeurtenissen.push(AantalKeerOuderService.getGebeurtenis(k, p0, p1));
        }
      }
    }

    // for (let k = 10000; k <= 100000; k += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     const g = SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0 }, k);
    //     if (g != null) {
    //       this.gebeurtenissen.push(g);
    //     }
    //   }
    // }

    // for (let k = 10000; k <= 100000; k += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     for (let j = i + 1; j < iedereen.length; j++) {
    //       const p1 = iedereen[j];
    //       const g = SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0, p1 }, k);
    //       if (g != null) {
    //         this.gebeurtenissen.push(g);
    //       }
    //     }
    //   }
    // }

    // for (let l = 10000; l <= 100000; l += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     for (let j = i + 1; j < iedereen.length; j++) {
    //       const p1 = iedereen[j];
    //       for (let k = j + 1; k < iedereen.length; k++) {
    //         const p2 = iedereen[k];
    //         const g = SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0, p1, p2 }, l);
    //         if (g != null) {
    //           this.gebeurtenissen.push(g);
    //         }
    //       }
    //     }
    //   }
    // }

    // for (let l = 10000; l <= 100000; l += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     for (let j = i + 1; j < iedereen.length; j++) {
    //       const p1 = iedereen[j];
    //       for (let k = j + 1; k < iedereen.length; k++) {
    //         const p2 = iedereen[k];
    //         for (const p = k + 1; p < iedereen.length; p++) {
    //           const p3 = iedereen[p];
    //           const g = SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0, p1, p2, p3 }, l);
    //           if (g != null) {
    //             this.gebeurtenissen.push(g);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // for (let l = 10000; l <= 100000; l += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     for (let j = i + 1; j < iedereen.length; j++) {
    //       const p1 = iedereen[j];
    //       for (let k = j + 1; k < iedereen.length; k++) {
    //         const p2 = iedereen[k];
    //         for (const p = k + 1; p < iedereen.length; p++) {
    //           const p3 = iedereen[p];
    //           for (let q = p + 1; q < iedereen.length; q++) {
    //             const p4 = iedereen[q];
    //             const g = SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0, p1, p2, p3, p4 }, l);
    //             if (g != null) {
    //               this.gebeurtenissen.push(g);
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // for (let l = 10000; l <= 100000; l += 1000) {
    //   for (let i = 0; i < iedereen.length; i++) {
    //     const p0 = iedereen[i];
    //     for (let j = i + 1; j < iedereen.length; j++) {
    //       const p1 = iedereen[j];
    //       for (let k = j + 1; k < iedereen.length; k++) {
    //         const p2 = iedereen[k];
    //         for (const p = k + 1; p < iedereen.length; p++) {
    //           const p3 = iedereen[p];
    //           for (let q = p + 1; q < iedereen.length; q++) {
    //             const p4 = iedereen[q];
    //             for (let r = q + 1; r < iedereen.length; r++) {
    //               const p5 = iedereen[r];
    //               const g =
    //                 SamenZoveelDagenOud.GetGebeurtenis(new List < Persoon > { p0, p1, p2, p3, p4, p5 }, l);
    //               if (g != null) {
    //                 this.gebeurtenissen.push(g);
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // use before, then the order is correct if events fall on the same day
    this.gebeurtenissen.sort((a: Gebeurtenis, b: Gebeurtenis) => a.datum.isBefore(b.datum) ? -1 : 1);

  }
}
