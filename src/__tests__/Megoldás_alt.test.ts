import Megoldás from "../Megoldás";
import fs from "fs";

describe("Alternatív forrásfájllal megoldás osztály unit tesztek", () => {
    const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás_alternative.txt");

    it("1. feladat: Megoldás osztálypéldány ellenőrzése", () => {
        expect(m).toBeInstanceOf(Megoldás);
    });

    it("2. feladat: Legelső út ellenőrzése", () => {
        expect(m.LegelsőÚtKm).toBe(5);
    });

    it("3. feladat: Utolsó út ellenőrzése", () => {
        expect(m.UtolsóÚt).toBe(2);
    });

    it("4. feladat: Szabad napok ellenőrzése", () => {
        expect(m.SzabadNapok).toBe(`1, 2, 6, 7`);
    });

    it("5. feladat: Nap a legtöbb fuvarral ellenőrzése", () => {
        expect(m.NapALegtöbbFuvarral).toBe(5);
    });

    it("6. feladat: Egyes napokon megtett távolságok ellenőrzése", () => {
        expect(m.NapokStat).toStrictEqual([0, 0, 0, 12, 62, 30, 0, 0]);
    });

    it("6. feladat: Egyes napokon megtett távolságok kimenetének ellenőrzése", () => {
        expect(m.NapokStatStr).toBe(`1. nap: 0 km\n2. nap: 0 km\n3. nap: 12 km\n4. nap: 62 km\n5. nap: 30 km\n6. nap: 0 km\n7. nap: 0 km\n`);
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

    it("8. feladat: állományok összehasonlítása", async () => {
        m.FájlbaÍrás("dijazas_alternative.txt");
        expect(fs.readFileSync("dijazas_alternative.txt", "utf8").toString()).toBe(fs.readFileSync("dijazas_alternative_ref.txt", "utf8").toString());
    });

    it("9. feladat: Heti fizetés ellenőrzése", () => {
        expect(m.HetiFizetés).toBe(14500);
    });
});
