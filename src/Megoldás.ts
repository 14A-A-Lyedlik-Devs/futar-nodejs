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

        // min of nap
        const futárElsőNapja: number = this._távok.reduce((min, táv) => (táv.nap < min ? táv.nap : min), this._távok[0].nap);

        return this._távok.find(t => t.nap === futárElsőNapja && t.sorszám === futárElsőNapja)?.megtettÚt ?? 0;
    }
}
