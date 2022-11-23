import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás.json");

    it("Megoldás osztálypéldány ellenőrzése", () => {
        expect(m).toBeInstanceOf(Megoldás);
    });

    it("Legelső út ellenőrzése", () => {
        expect(m.LegelsőÚtKm()).toBe(3);
    });

    it("Utolsó út ellenőrzése", () => {
        expect(m.UtolsóÚt()).toBe(25);
    });
});
