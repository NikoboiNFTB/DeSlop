browser.runtime.onMessage.addListener(async (message) => {
    if (message.type !== "FETCH_BLOCKLIST") return;

    try {
        const res = await fetch(message.url, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const text = await res.text();
        return { ok: true, text };
    } catch (err) {
        console.error("Blocklist fetch failed:", err);
        return { ok: false, error: err.toString() };
    }
});
