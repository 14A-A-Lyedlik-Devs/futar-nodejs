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
}
