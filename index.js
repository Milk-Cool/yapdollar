import { JSDOM } from "jsdom";

export async function getWikipediaPlainText(url) {
    if(!url.startsWith("https://en.wikipedia.org/wiki/")) return { "err": "Not a wikipedia article!" };
    const f = await fetch(url);
    const t = await f.text();
    const { window } = new JSDOM(t, { "contentType": "text/html" });
    const body = window.document.querySelector("#bodyContent p:not(.mw-empty-elt)");
    if(!body) return { "err": "Failed to load!" };
    return { "text": body.textContent.replace(/\[\d+\]/g, "") };
}

export async function getAudio(text) {
    text = text.slice(0, 250);
    const f = await fetch("https://gesserit.co/api/tiktok-tts", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-RU,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,fr-RU;q=0.6,fr;q=0.5,en-GB;q=0.4,en-US;q=0.3",
            "cache-control": "no-cache",
            "content-type": "text/plain;charset=UTF-8",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://gesserit.co/tiktok",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify({
            "text": text,
            "voice": "en_us_006"
        }),
        "method": "POST"
    });
    const j = await f.json();
    return j.audioUrl;
}