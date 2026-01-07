// ==UserScript==
// @name         YouTube - DeSlop
// @namespace    https://github.com/NikoboiNFTB/DeSlop
// @version      1.0
// @description  Hide AI slop from your YouTube feed. Blocklist-driven.
// @author       Nikoboi
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    // URL of the blocklist (raw GitHub)
    const BLOCKLIST_URL = 'https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt?token=GHSAT0AAAAAADSVKSWWGC5OUAJC43B3THGW2K6FVEQ';

    let blockedChannels = new Set();

    // Fetch the blocklist
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
                    filterFeed(); // filter after fetching
                } else {
                    console.error('Failed to fetch blocklist:', response.status);
                }
            }
        });
    }

    // Hide all feed items with blocked channels
    function filterFeed(root=document) {
        const items = root.querySelectorAll('ytd-rich-item-renderer');
        items.forEach(item => {
            const channelLink = item.querySelector('a[href^="/channel/"]');
            if (channelLink) {
                const channelId = channelLink.getAttribute('href').split('/channel/')[1].split('?')[0];
                if (blockedChannels.has(channelId)) {
                    item.style.display = 'none';
                }
            }
        });
    }

    // Observe the feed for new items (infinite scroll)
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // element node
                    filterFeed(node);
                }
            });
        }
    });

    // Start observing
    const feedContainer = document.querySelector('ytd-rich-grid-renderer');
    if (feedContainer) {
        observer.observe(feedContainer, { childList: true, subtree: true });
    }

    fetchBlocklist();
})();
