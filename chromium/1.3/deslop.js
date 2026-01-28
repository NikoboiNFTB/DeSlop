(() => {
    "use strict";

    const BLOCKLIST_URL =
        "https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt";

    const RENDERER_SELECTORS = [
        "ytd-rich-item-renderer",
        "ytd-video-renderer",
        "ytd-channel-renderer"
    ].join(",");

    let blockedChannels = new Set();

    function getChannelHref(renderer) {
        const link = renderer.querySelector('a[href^="/@"], a[href^="/channel/"], #main-link');
        return link ? link.getAttribute("href").split("?")[0] : null;
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
        }
    }

    function sweepRenderers(nodes) {
        nodes.forEach(node => {
            if (node.nodeType !== 1) return;

            if (node.matches?.(RENDERER_SELECTORS)) {
                processRenderer(node);
            }

            node.querySelectorAll?.(RENDERER_SELECTORS)?.forEach(processRenderer);
        });
    }

    function observePage() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                sweepRenderers([...mutation.addedNodes]);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        console.log("Global observer attached.");
    }

    function fetchBlocklist() {
        chrome.runtime.sendMessage({ type: "FETCH_BLOCKLIST", url: BLOCKLIST_URL }, response => {
            if (!response || !response.ok) {
                console.error("Failed to load blocklist:", response?.error);
                return;
            }

            blockedChannels = new Set(
                response.text
                    .split("\n")
                    .map(l => l.trim())
                    .filter(l => l && !l.startsWith('#'))
            );

            console.log("Blocklist loaded:", blockedChannels);
            // sweep existing DOM
            document.querySelectorAll(RENDERER_SELECTORS).forEach(processRenderer);
        });
    }

    fetchBlocklist();
    observePage();
})();
