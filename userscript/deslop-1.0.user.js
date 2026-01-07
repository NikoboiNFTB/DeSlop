// ==UserScript==
// @name         YouTube - DeSlop (Nuke Mode)
// @namespace    https://github.com/NikoboiNFTB/DeSlop
// @version      1.1
// @description  Hide AI slop from YouTube feed by nuking blocked channels.
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

    // Fetch blocklist from GitHub
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
                    filterFeed(); // initial filter
                } else {
                    console.error('Failed to fetch blocklist:', response.status);
                }
            }
        });
    }

    // Remove an item from the DOM
    function nukeItem(item, href) {
        console.log('Nuking item:', href, item);
        if (item.parentNode) {
            item.parentNode.removeChild(item);
        }
    }

    // Filter feed recursively
    function filterFeed(root = document) {
        const items = root.querySelectorAll('ytd-rich-item-renderer');
        items.forEach(item => {
            if (item.dataset.deslopNuked) return; // already handled
            item.dataset.deslopNuked = true;

            const channelLink = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
            if (channelLink) {
                const href = channelLink.getAttribute('href').split('?')[0];
                if (blockedChannels.has(href)) {
                    nukeItem(item, href);
                    return;
                }
            } else {
                // Observe item for lazy-loaded links
                const observer = new MutationObserver(() => {
                    const link = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
                    if (link) {
                        const href = link.getAttribute('href').split('?')[0];
                        if (blockedChannels.has(href)) nukeItem(item, href);
                        observer.disconnect();
                    }
                });
                observer.observe(item, { childList: true, subtree: true });
            }
        });
    }

    // Observe the feed for new nodes (infinite scroll)
    const feedObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    console.log('New node added:', node);
                    filterFeed(node);
                }
            });
        });
    });

    function startObserving() {
        const feedContainer = document.querySelector('ytd-rich-grid-renderer');
        if (feedContainer) {
            feedObserver.observe(feedContainer, { childList: true, subtree: true });
            console.log('Feed observer attached.');
        } else {
            // Retry if not loaded yet
            setTimeout(startObserving, 1000);
        }
    }

    fetchBlocklist();
    startObserving();
})();
