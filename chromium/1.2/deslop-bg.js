chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type !== "FETCH_BLOCKLIST") return;

    fetch(message.url, { cache: "no-store" })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(text => sendResponse({ ok: true, text }))
        .catch(err => {
            console.error("Blocklist fetch failed:", err);
            sendResponse({ ok: false, error: err.toString() });
        });

    return true;
});
