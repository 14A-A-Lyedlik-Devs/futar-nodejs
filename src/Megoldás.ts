import fs from "fs";
import { resolve } from "path";

//import Kiszállítás from "./Kiszállítás";

interface Kiszállítás {
    _id: number;
    nap: number;
    sorszám: number;
    megtettÚt: number;
}

export default class Megoldás {
    private _kiszállítások: Kiszállítás[];

    constructor(forrás: string) {
        const json: string = fs.readFileSync(forrás, "utf-8");
        this._kiszállítások = JSON.parse(json);
        console.log(this._kiszállítások);
    }
}
