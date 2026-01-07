// ==UserScript==
// @name         YouTube - DeSlop
// @namespace    https://github.com/NikoboiNFTB/DeSlop
// @version      1.1
// @description  Hide AI slop from your YouTube feed. Blocklist-driven.
// @author       Nikoboi
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function() {
    'use strict';

    const BLOCKLIST_URL = 'https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt';
    let blockedChannels = new Set();

    // -------------------------
    // Helper: Deep querySelectorAll to traverse shadow roots
    // -------------------------
    function querySelectorAllDeep(selector, root = document) {
        let results = [];
        if (root.shadowRoot) {
            results = results.concat(Array.from(root.shadowRoot.querySelectorAll(selector)));
        }
        results = results.concat(Array.from(root.querySelectorAll(selector)));
        Array.from(root.children).forEach(child => {
            results = results.concat(querySelectorAllDeep(selector, child));
        });
        return results;
    }

    // -------------------------
    // Fetch blocklist
    // -------------------------
    function fetchBlocklist(callback) {
        console.log('Fetching blocklist...');
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
                    if (callback) callback();
                } else {
                    console.error('Failed to fetch blocklist:', response.status);
                }
            },
            onerror: function(err) {
                console.error('Error fetching blocklist:', err);
            }
        });
    }

    // -------------------------
    // Filter feed items
    // -------------------------
    function filterFeed(root = document) {
        const items = querySelectorAllDeep('ytd-rich-item-renderer', root);
        items.forEach(item => {
            if (item.style.display === 'none') return;

            // Look for any channel/@ link
            const channelLink = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
            if (!channelLink) {
                // If not rendered yet, observe this item
                const observer = new MutationObserver(() => {
                    const link = item.querySelector('a[href^="/channel/"], a[href^="/@"]');
                    if (link) {
                        const href = link.getAttribute('href').split('?')[0];
                        if (blockedChannels.has(href)) {
                            console.log('Hiding item (late link found):', href, item);
                            item.style.display = 'none';
                        }
                        observer.disconnect();
                    }
                });
                observer.observe(item, { childList: true, subtree: true });
                return;
            }

            const href = channelLink.getAttribute('href').split('?')[0];
            const blocked = blockedChannels.has(href);
            console.log('Checking item:', href, 'Blocked?', blocked);
            if (blocked) {
                console.log('Hiding item:', href, item);
                item.style.display = 'none';
            }
        });
    }

    // -------------------------
    // Wait for feed container
    // -------------------------
    function waitForFeedContainer(callback) {
        const container = document.querySelector('ytd-rich-grid-renderer');
        if (container) {
            console.log('Feed container found, starting observer...');
            callback(container);
        } else {
            setTimeout(() => waitForFeedContainer(callback), 500);
        }
    }

    // -------------------------
    // Observe for new items (infinite scroll)
    // -------------------------
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    console.log('New node added:', node);
                    filterFeed(node);
                }
            });
        }
    });

    // -------------------------
    // Initialize
    // -------------------------
    fetchBlocklist(() => {
        waitForFeedContainer(feedContainer => {
            observer.observe(feedContainer, { childList: true, subtree: true });
            // Initial filter in case items are already loaded
            filterFeed();
        });
    });

})();
