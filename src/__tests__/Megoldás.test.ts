import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás.json");

    it("Megoldás osztálypéldány ellenőrzése", () => {
        expect(m).toBeInstanceOf(Megoldás);
    });

    it("Legelső út ellenőrzése", () => {
        expect(m.LegelsőÚtKm()).toBe(3);
    });

    it("Szabad napok ellenőrzése", () => {
        expect(m.SzabadNapok()).toStrictEqual([2, 6]);
    });

    it("Utolsó út ellenőrzése", () => {
        expect(m.UtolsóÚt()).toBe(25);
    });

    it("Nap a legtöbb fuvarral ellenőrzése", () => {
        expect(m.NapALegtöbbFuvarral()).toBe(5);
    });


    it("Heti fizetés ellenőrzése", () => {
        expect(m.HetiFizetés()).toBe(48500);
    });

    it("Díjazás táv után ellenőrzése", () => {
        expect(m.DíjazásTávUtán(0)).toBe(0);
        expect(m.DíjazásTávUtán(2)).toBe(500);
        expect(m.DíjazásTávUtán(3)).toBe(700);
        expect(m.DíjazásTávUtán(6)).toBe(900);
        expect(m.DíjazásTávUtán(11)).toBe(1400);
        expect(m.DíjazásTávUtán(21)).toBe(2000);
        expect(m.DíjazásTávUtán(31)).toBe(0);
    });
});
