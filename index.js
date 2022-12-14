import "https://unpkg.com/navigo";
import { adjustForMissingHash, loadHtml, renderTemplate, setActiveLink } from "./utils.js";

import { initCars, load } from "./pages/cars/cars.js";

window.addEventListener("load", async () => {
    const templateCars = await loadHtml("./pages/cars/cars.html");
    const templateHome = await loadHtml("./pages/home/home.html");
    const templateNotFound = await loadHtml("./pages/notFound/notFound.html");

    adjustForMissingHash();

    const router = new Navigo("/", { hash: true });
    window.router = router;

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url);
                done();
            },
        })
        .on({
            "/": () => {
                renderTemplate(templateHome, "content");
            },
            "/cars": (match) => {
                renderTemplate(templateCars, "content");
                load(1, match);
                // initCars();
            },
        })
        .notFound(() => {
            renderTemplate(templateNotFound, "content");
        })
        .resolve();
});
