import * as moment from 'moment';

export class Gebeurtenis {
    datum: moment.Moment;
    info: string;

    constructor(datum: moment.Moment, info: string) {
        this.datum = datum;
        this.info = info;
    }

    get isInPast() {
        return this.datum.isBefore(moment());
    }
}
