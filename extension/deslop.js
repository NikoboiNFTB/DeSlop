(() => {
    "use strict";

    const BLOCKLIST_URL =
        "https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt";

    let blockedChannels = new Set();

    async function fetchBlocklist() {
        const response = await browser.runtime.sendMessage({
            type: "FETCH_BLOCKLIST",
            url: BLOCKLIST_URL
        });

        if (!response || !response.ok) {
            console.error("Failed to load blocklist:", response?.error);
            return;
        }

        blockedChannels = new Set(
            response.text
                .split("\n")
                .map(l => l.trim())
                .filter(Boolean)
        );

        console.log("Blocklist loaded:", blockedChannels);
        sweepContents();
    }

    function nukeRenderer(item, href) {
        console.log("Nuking item:", href, item);
        item.remove();
    }

    function sweepContents() {
        const container = document.querySelector("#contents");
        if (!container) {
            setTimeout(sweepContents, 1000);
            return;
        }

        const items = container.querySelectorAll("ytd-rich-item-renderer");
        for (const item of items) {
            if (item.dataset.deslopNuked) continue;
            item.dataset.deslopNuked = "1";

            const link = item.querySelector(
                'a[href^="/channel/"], a[href^="/@"]'
            );

            if (link) {
                const href = link.getAttribute("href").split("?")[0];
                if (blockedChannels.has(href)) {
                    nukeRenderer(item, href);
                }
            } else {
                const observer = new MutationObserver(() => {
                    const lazyLink = item.querySelector(
                        'a[href^="/channel/"], a[href^="/@"]'
                    );
                    if (!lazyLink) return;

                    const href = lazyLink
                        .getAttribute("href")
                        .split("?")[0];

                    if (blockedChannels.has(href)) {
                        nukeRenderer(item, href);
                    }
                    observer.disconnect();
                });

                observer.observe(item, {
                    childList: true,
                    subtree: true
                });
            }
        }
    }

    function observeContents() {
        const container = document.querySelector("#contents");
        if (!container) {
            setTimeout(observeContents, 1000);
            return;
        }

        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (
                        node.nodeType === 1 &&
                        node.tagName === "YTD-RICH-ITEM-RENDERER"
                    ) {
                        sweepContents();
                    }
                }
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: true
        });

        console.log("Feed observer attached to #contents.");
    }

    fetchBlocklist();
    observeContents();
    setInterval(sweepContents, 3000);
})();
