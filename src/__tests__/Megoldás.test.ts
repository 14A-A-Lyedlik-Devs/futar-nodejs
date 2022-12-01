import Megoldás from "../Megoldás";
import fs from "fs";

describe("Megoldás osztály unit tesztek", () => {
    // JSON esetén txt helyett:
    // const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás.json");
    const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás.txt");

    it("1. feladat: Megoldás osztálypéldány ellenőrzése", () => {
        expect(m).toBeInstanceOf(Megoldás);
    });

    it("2. feladat: Legelső út ellenőrzése", () => {
        expect(m.LegelsőÚtKm).toBe(3);
    });

    it("3. feladat: Utolsó út ellenőrzése", () => {
        expect(m.UtolsóÚt).toBe(25);
    });

    it("4. feladat: Szabad napok ellenőrzése", () => {
        expect(m.SzabadNapok).toBe(`2, 6`);
    });

    it("5. feladat: Nap a legtöbb fuvarral ellenőrzése", () => {
        expect(m.NapALegtöbbFuvarral).toBe(5);
    });

    it("6. feladat: Egyes napokon megtett távolságok ellenőrzése", () => {
        expect(m.NapokStat).toStrictEqual([0, 65, 0, 69, 62, 74, 0, 75]);
    });

    it("6. feladat: Egyes napokon megtett távolságok kimenetének ellenőrzése", () => {
        expect(m.NapokStatStr).toBe(`1. nap: 65 km\n2. nap: 0 km\n3. nap: 69 km\n4. nap: 62 km\n5. nap: 74 km\n6. nap: 0 km\n7. nap: 75 km\n`);
    });

    it("7. feladat: Díjazás táv után ellenőrzése", () => {
        expect(m.DíjazásTávUtán(0)).toBe(0);
        expect(m.DíjazásTávUtán(2)).toBe(500);
        expect(m.DíjazásTávUtán(3)).toBe(700);
        expect(m.DíjazásTávUtán(6)).toBe(900);
        expect(m.DíjazásTávUtán(11)).toBe(1400);
        expect(m.DíjazásTávUtán(21)).toBe(2000);
        expect(m.DíjazásTávUtán(31)).toBe(0);
    });

    it("8. feladat állományok összehasonlítása", async () => {
        m.FájlbaÍrás("dijazas.txt");
        expect(fs.readFileSync("dijazas.txt", "utf8").toString()).toBe(fs.readFileSync("dijazas_ref.txt", "utf8").toString());
    });

    it("9. feladat: Heti fizetés ellenőrzése", () => {
        expect(m.HetiFizetés).toBe(48500);
    });
});
