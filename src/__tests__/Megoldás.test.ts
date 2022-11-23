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

    it("Egyes napokon megtett távolságok ellenőrzése", () => {
        expect(m.NapokStat()).toStrictEqual([0, 65, 0, 69, 62, 74, 0, 75]);
    });
});
