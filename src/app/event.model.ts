export class Event {
    public date: Date;
    public info: string;

    constructor(datum: Date, info: string) {
        this.date = datum;
        this.info = info;
    }

    get isInPast() {
        return this.date < new Date();
    }
}
