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
});
