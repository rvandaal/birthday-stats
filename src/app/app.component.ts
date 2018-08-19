import { AantalKeerOuderService } from './services/aantal-keer-ouder.service';
import { SamenZoveelDagenOudService } from './services/samen-zoveel-dagen-oud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Gebeurtenis } from './gebeurtenis.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
      this.generateOutputList(value);
    });
  }

  createPersonInput(i) {
    if (i === 0) {
      return this.fb.group({
        name: 'Peter',
        birthdate: new NgbDate(1947, 10, 28)
      });
    }
    if (i === 1) {
      return this.fb.group({
        name: 'Marian',
        birthdate: new NgbDate(1949, 4, 4)
      });
    }
    if (i === 2) {
      return this.fb.group({
        name: 'Rob',
        birthdate: new NgbDate(1975, 6, 19)
      });
    }
    if (i === 3) {
      return this.fb.group({
        name: 'Frank',
        birthdate: new NgbDate(1977, 1, 15)
      });
    }
    if (i === 4) {
      return this.fb.group({
        name: 'Paul',
        birthdate: new NgbDate(1982, 7, 14)
      });
    }
    if (i === 5) {
      return this.fb.group({
        name: 'Raf',
        birthdate: new NgbDate(2012, 11, 25)
      });
    }
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

    for (let k = 10000; k <= 44000; k += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        const g = SamenZoveelDagenOudService.getGebeurtenis(k, [ p0 ]);
        if (g != null) {
          this.gebeurtenissen.push(g);
        }
      }
    }

    for (let k = 10000; k <= 2 * 44000; k += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          const g = SamenZoveelDagenOudService.getGebeurtenis(k, [ p0, p1 ]);
          if (g != null) {
            this.gebeurtenissen.push(g);
          }
        }
      }
    }

    for (let l = 10000; l <= 3 * 44000; l += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          for (let k = j + 1; k < iedereen.length; k++) {
            const p2 = iedereen[k];
            const g = SamenZoveelDagenOudService.getGebeurtenis(l, [ p0, p1, p2 ]);
            if (g != null) {
              this.gebeurtenissen.push(g);
            }
          }
        }
      }
    }

    for (let l = 10000; l <= 4 * 44000; l += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          for (let k = j + 1; k < iedereen.length; k++) {
            const p2 = iedereen[k];
            for (let p = k + 1; p < iedereen.length; p++) {
              const p3 = iedereen[p];
              const g = SamenZoveelDagenOudService.getGebeurtenis(l, [ p0, p1, p2, p3 ]);
              if (g != null) {
                this.gebeurtenissen.push(g);
              }
            }
          }
        }
      }
    }

    for (let l = 10000; l <= 5 * 44000; l += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          for (let k = j + 1; k < iedereen.length; k++) {
            const p2 = iedereen[k];
            for (let p = k + 1; p < iedereen.length; p++) {
              const p3 = iedereen[p];
              for (let q = p + 1; q < iedereen.length; q++) {
                const p4 = iedereen[q];
                const g = SamenZoveelDagenOudService.getGebeurtenis(l, [ p0, p1, p2, p3, p4 ]);
                if (g != null) {
                  this.gebeurtenissen.push(g);
                }
              }
            }
          }
        }
      }
    }

    for (let l = 10000; l <= 6 * 44000; l += 1000) {
      for (let i = 0; i < iedereen.length; i++) {
        const p0 = iedereen[i];
        for (let j = i + 1; j < iedereen.length; j++) {
          const p1 = iedereen[j];
          for (let k = j + 1; k < iedereen.length; k++) {
            const p2 = iedereen[k];
            for (let p = k + 1; p < iedereen.length; p++) {
              const p3 = iedereen[p];
              for (let q = p + 1; q < iedereen.length; q++) {
                const p4 = iedereen[q];
                for (let r = q + 1; r < iedereen.length; r++) {
                  const p5 = iedereen[r];
                  const g =
                    SamenZoveelDagenOudService.getGebeurtenis(l, [ p0, p1, p2, p3, p4, p5 ]);
                  if (g != null) {
                    this.gebeurtenissen.push(g);
                  }
                }
              }
            }
          }
        }
      }
    }

    // use before, then the order is correct if events fall on the same day
    this.gebeurtenissen.sort((a: Gebeurtenis, b: Gebeurtenis) => a.datum.isBefore(b.datum) ? -1 : 1);

  }
}
