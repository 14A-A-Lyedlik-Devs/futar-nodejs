import fs from "fs";
import Fizetés from "./Fizetés";
import Táv from "./Táv";

export default class Megoldás {
    private _fizetések: Fizetés[];
    private _távok: Táv[];

    constructor(fizetésFájl: string, távokFájl: string) {
        this._fizetések = JSON.parse(fs.readFileSync(fizetésFájl, "utf8"));
        this._távok = JSON.parse(fs.readFileSync(távokFájl, "utf8"));
    }

    public LegelsőÚtKm(): number {
        // 1. nap and 1. sorszám
        return this._távok.find(t => t.nap === 1 && t.sorszám === 1)?.megtettÚt ?? 0;
    }

    public SzabadNapok(): number[] {
        const szabadNapok: number[] = [1, 2, 3, 4, 5, 6, 7];
        return szabadNapok.filter(nap => !this._távok.map(t => t.nap).includes(nap));
    }
}
