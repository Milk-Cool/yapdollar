const prompt = document.querySelector("#prompt");
prompt.addEventListener("keydown", async e => {
    if(e.key != "Enter") return;
    prompt.disabled = true;
    const f = await fetch("/", {
        "body": e.target.value,
        "method": "POST"
    });
    const t = await f.text();
    if(f.status == 200)
        (new Audio(t)).play();
    else
        alert(t);
    prompt.disabled = false;
});