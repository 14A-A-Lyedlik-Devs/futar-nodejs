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

    public UtolsóÚt(): number {
        const utolsóNap = Math.max(...this._távok.map(t => t.nap));
        const utolsóSorszám = Math.max(...this._távok.filter(t => t.nap === utolsóNap).map(t => t.sorszám));

        return this._távok.find(t => t.nap === utolsóNap && t.sorszám === utolsóSorszám)?.megtettÚt ?? 0;
    }
}
