// ==UserScript==
// @name         YouTube - DeSlop (Nuke Mode v2)
// @namespace    https://github.com/NikoboiNFTB/DeSlop
// @version      2.0
// @description  Hide AI slop from YouTube feed by nuking blocked channels entirely.
// @author       Nikoboi
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function() {
    'use strict';

    const BLOCKLIST_URL = 'https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list-202501071243.txt';
    let blockedChannels = new Set();

    // Fetch blocklist
    function fetchBlocklist() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: BLOCKLIST_URL,
            onload: function(response) {
                if (response.status === 200) {
                    blockedChannels = new Set(
                        response.responseText
                            .split('\n')
                            .map(line => line.trim())
                            .filter(line => line.length > 0)
                    );
                    console.log('Blocklist loaded:', blockedChannels);
                    sweepContents();
                } else {
                    console.error('Failed to fetch blocklist:', response.status);
                }
            }
        });
    }

    // Nuke a video renderer completely
    function nukeRenderer(item, href) {
        console.log('Nuking item:', href, item);
        if (item.parentNode) {
            item.parentNode.removeChild(item);
        }
    }

    // Sweep through all current items
    function sweepContents() {
        const container = document.querySelector('#contents');
        if (!container) {
            // Retry if #contents is not ready yet
            setTimeout(sweepContents, 1000);
            return;
        }

        const items = container.querySelectorAll('ytd-rich-item-renderer');
        items.forEach(item => {
            if (item.dataset.deslopNuked) return;
            item.dataset.deslopNuked = true;

            const link = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
            if (link) {
                const href = link.getAttribute('href').split('?')[0];
                if (blockedChannels.has(href)) {
                    nukeRenderer(item, href);
                }
            } else {
                // Observe lazy-loaded links
                const observer = new MutationObserver(() => {
                    const lazyLink = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
                    if (lazyLink) {
                        const href = lazyLink.getAttribute('href').split('?')[0];
                        if (blockedChannels.has(href)) {
                            nukeRenderer(item, href);
                        }
                        observer.disconnect();
                    }
                });
                observer.observe(item, { childList: true, subtree: true });
            }
        });
    }

    // Observe #contents for new nodes (infinite scroll)
    function observeContents() {
        const container = document.querySelector('#contents');
        if (!container) {
            setTimeout(observeContents, 1000);
            return;
        }

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName === 'YTD-RICH-ITEM-RENDERER') {
                        sweepContents();
                    }
                });
            });
        });

        observer.observe(container, { childList: true, subtree: true });
        console.log('Feed observer attached to #contents.');
    }

    fetchBlocklist();
    observeContents();

    // Periodically sweep to catch any edge cases
    setInterval(sweepContents, 3000);

})();
