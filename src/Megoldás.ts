import fs from "fs";
import Fizetés from "./Fizetés";
import Táv from "./Táv";

export default class Megoldás {
    private _fizetések: Fizetés[];
    private _távok: Táv[] = [];

    private get _napok(): number[] {
        return this._távok.map(t => t.nap);
    }

    private get _napokSzáma(): number[] {
        return this._napok.map(nap => this._napok.filter(n => n === nap).length);
    }

    private get _napokSzámaMax(): number {
        return Math.max(...this._napokSzáma);
    }

    constructor(fizetésFájl: string, távokFájl: string) {
        this._fizetések = JSON.parse(fs.readFileSync(fizetésFájl, "utf8"));
        fs.readFileSync(távokFájl, "utf8")
            .toString()
            .trim()
            .split("\n")
            .forEach(sor => {
                const m: string[] = sor.split(" ");
                this._távok.push({
                    nap: parseInt(m[0]),
                    sorszám: parseInt(m[1]),
                    megtettÚt: parseInt(m[2]),
                });
            });
    }

    public get LegelsőÚtKm(): number {
        // 1. nap and 1. sorszám

        const futárElsőNapja = Math.min(...this._távok.map(t => t.nap));
        const futárElsőSorszáma = Math.min(...this._távok.filter(t => t.nap === futárElsőNapja).map(t => t.sorszám));

        return this._távok.find(t => t.nap === futárElsőNapja && t.sorszám === futárElsőSorszáma)?.megtettÚt ?? 0;
    }

    public get UtolsóÚt(): number {
        const utolsóNap = Math.max(...this._távok.map(t => t.nap));
        const utolsóSorszám = Math.max(...this._távok.filter(t => t.nap === utolsóNap).map(t => t.sorszám));

        return this._távok.find(t => t.nap === utolsóNap && t.sorszám === utolsóSorszám)?.megtettÚt ?? 0;
    }

    public get SzabadNapok(): string {
        const hétNapjai: number[] = [1, 2, 3, 4, 5, 6, 7];
        return hétNapjai.filter(nap => !this._távok.map(t => t.nap).includes(nap)).join(", ");
    }

    public get NapALegtöbbFuvarral(): number {
        const napok: number[] = this._távok.map(t => t.nap);
        const napokSzáma: number[] = napok.map(nap => napok.filter(n => n === nap).length);

        return napok[napokSzáma.indexOf(Math.max(...napokSzáma))];
    }

    public get NapokStat(): number[] {
        const napokKilométerei: number[] = new Array(8).fill(0);
        this._távok.forEach(t => (napokKilométerei[t.nap] += t.megtettÚt));
        return napokKilométerei;
    }

    public get NapokStatStr(): string {
        let eredmény = "";
        for (let i = 1; i < this.NapokStat.length; i++) {
            eredmény += `${i}. nap: ${this.NapokStat[i]} km\n`;
        }
        return eredmény;
    }

    public get HetiFizetés(): number {
        let szum = 0;
        for (const táv of this._távok) {
            const fizetés = this._fizetések.find(f => f.minKm <= táv.megtettÚt && f.maxKm >= táv.megtettÚt)?.összeg ?? 0;
            szum += fizetés;
        }
        return szum;
    }

    public DíjazásTávUtán(inputTáv: number): number {
        // find összeg where inputTáv is between minKm and maxKm
        const fizetés: Fizetés | undefined = this._fizetések.find(f => f.minKm <= inputTáv && f.maxKm >= inputTáv);

        return fizetés?.összeg ?? 0;
    }

    public FájlbaÍrás(fájlNév: string): string {
        // go through each day and út and write to file with the correct összeg

        let szöveg = "";
        for (let i = 0; i < this._napokSzámaMax; i++) {
            const nap: number = this._napok[i];
            const sorszám: number = i + 1;
            const táv: Táv | undefined = this._távok.find(t => t.nap === nap && t.sorszám === sorszám);
            if (táv) {
                const fizetés: Fizetés | undefined = this._fizetések.find(f => f.minKm <= táv.megtettÚt && f.maxKm >= táv.megtettÚt);
                if (fizetés) {
                    szöveg += `${nap}. nap ${sorszám}. út: ${fizetés.összeg} Ft\n`;
                }
            }
        }

        fs.writeFileSync(fájlNév, szöveg);
        return fájlNév;
    }
}
