export default class Táv {
    nap: number;
    sorszám: number;
    megtettÚt: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.nap = parseInt(m[0]);
        this.sorszám = parseInt(m[1]);
        this.megtettÚt = parseInt(m[2]);
    }
}
