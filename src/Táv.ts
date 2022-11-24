export default class Táv {
    public nap: number;
    public sorszám: number;
    public megtettÚt: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.nap = parseInt(m[0]);
        this.sorszám = parseInt(m[1]);
        this.megtettÚt = parseInt(m[2]);
    }
}
