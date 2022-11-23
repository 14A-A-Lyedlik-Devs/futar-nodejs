import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás from "./Megoldás";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Futár</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->

        // 1. feladat:
        const m: Megoldás = new Megoldás("fizetésTávra.json", "távokForrás.json");

        // 2. feladat:
        res.write("2. feladat\n");
        res.write(`Az első nap első távja: ${m.LegelsőÚtKm()} km\n`);

        // 3. feladat:
        res.write("\n3. feladat\n");
        res.write(`A hét utolsó távja: ${m.UtolsóÚt()} km\n`);

        // 4. feladat:
        res.write("\n4. feladat\n");
        res.write(`A futár szabadnapjai: ${m.SzabadNapok().join(", ")}\n`);

        // 5. feladat:
        res.write("\n5. feladat\n");
        res.write(`A hét legtöbb fuvarját a(z) ${m.NapALegtöbbFuvarral()}. napon teljesítették.\n`);

        // 6. feladat:

        // 7. feladat:
        res.write("\n7. feladat\n");

        const inputTáv = parseInt(params.get("tav") as string);
        res.write(`Kérek egy távot: <input type="number" name="tav" value=${inputTáv} min="1" max="30" step="1"> km\n`);

        res.write(`A díjazás a megadott távon: ${m.DíjazásTávUtán(inputTáv)} Ft\n`);

        // 8. feladat:

        // 9. feladat:

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
