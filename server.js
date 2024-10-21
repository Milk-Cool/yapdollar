import { getWikipediaPlainText, getAudio } from "./index.js";
import express from "express";

const app = express();
app.use(express.text());
app.use(express.static("static/"));
app.post("/", async (req, res) => {
    const plainText = await getWikipediaPlainText(req.body);
    if(plainText.err) return res.status(500).end(plainText.err);
    const audio = await getAudio(plainText.text);
    return res.status(200).send(audio);
});
app.listen(8037);