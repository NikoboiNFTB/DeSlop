(() => {
    "use strict";

    const BLOCKLIST_URL =
        "https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt";

    const RENDERER_SELECTORS = [
        "ytd-rich-item-renderer",   // home / feed videos
        "ytd-video-renderer",       // search result videos
        "ytd-channel-renderer"      // channel search results
    ].join(",");

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
        sweepAll();
    }

    function getChannelHref(renderer) {
        // Works for video & channel renderers
        // For channel renderers, the link is often in #main-link or a.channel-link
        let link = renderer.querySelector(
            'a[href^="/@"], a[href^="/channel/"], #main-link'
        );
        if (!link) return null;
        return link.getAttribute("href").split("?")[0];
    }

    function nuke(renderer, href) {
        console.log("Nuking:", href, renderer);
        renderer.remove();
    }

    function processRenderer(renderer) {
        if (renderer.dataset.deslopNuked) return;
        renderer.dataset.deslopNuked = "1";

        const href = getChannelHref(renderer);
        if (href && blockedChannels.has(href)) {
            nuke(renderer, href);
            return;
        }

        // Lazy-loaded channel name fallback
        const observer = new MutationObserver(() => {
            const lazyHref = getChannelHref(renderer);
            if (!lazyHref) return;

            if (blockedChannels.has(lazyHref)) {
                nuke(renderer, lazyHref);
            }
            observer.disconnect();
        });

        observer.observe(renderer, {
            childList: true,
            subtree: true
        });
    }

    function sweepAll() {
        document
            .querySelectorAll(RENDERER_SELECTORS)
            .forEach(processRenderer);
    }

    function observePage() {
        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (
                        node.nodeType === 1 &&
                        node.matches?.(RENDERER_SELECTORS)
                    ) {
                        processRenderer(node);
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log("Global observer attached.");
    }

    fetchBlocklist();
    observePage();
    setInterval(sweepAll, 3000);
})();
