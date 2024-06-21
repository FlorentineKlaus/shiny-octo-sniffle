import { randomInt } from "crypto";
import puppeteer from "puppeteer-extra";
import axios from "axios";
import yes from "puppeteer-extra-plugin-stealth";
let delay = (ms) => new Promise((r) => setTimeout(r, ms));
puppeteer.default.use(yes());
async function browser() {
    await delay(randomInt(1, 5));
    const browser = await puppeteer.default.launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    let n = await browser.pages();
    const token = await axios.get(process.env["MEOW"]);
    let page = n[0];
    await page.goto("https://twitch.tv/");
    await delay(2000);
    const user = token.data.join;
    await page.setCookie({ name: "auth-token", value: token.data.thingy });
    console.log(":3");
    await page.goto("https://twitch.tv/");
    await delay(2000);
    const vv = await page.$("body > div.ReactModalPortal > div > div > div > div > div > div > div.Layout-sc-1xcs6mc-0.dLaYOL > button > div > div");
    if (vv) {
        await page.reload();
    }
    await delay(2000);
    try {
        await (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div.Layout-sc-1xcs6mc-0.gUvyVO > div > div > div > div.Layout-sc-1xcs6mc-0.fJANQ > div:nth-child(1) > button"))
            .click()
            .catch((err) => err);
    }
    catch (err) { }
    await delay(500);
    await (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > nav > div > div.Layout-sc-1xcs6mc-0.kuGBVB > div > div > div > div > div.Layout-sc-1xcs6mc-0.jNIlkd > div > div.ScInputWrapper-sc-1fxjr4l-0.drBdyB.tw-combo-input__input > div > div > input")).type(user);
    await delay(2500);
    const elements = await page.$$(`[id^="search-result-row"]`);
    await elements[elements.length - 1].click();
    console.log(await page.url());
}
browser();
