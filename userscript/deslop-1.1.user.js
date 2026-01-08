// ==UserScript==
// @name         YouTube DeSlop
// @namespace    https://github.com/NikoboiNFTB/DeSlop
// @version      1.1
// @description  Remove AI slop from your YouTube feed and search results. Blocklist-driven.
// @author       Nikoboi
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @icon         https://www.youtube.com/s/desktop/ab67e92c/img/favicon_144x144.png
// ==/UserScript==

(function () {
    'use strict';

    const BLOCKLIST_URL =
        'https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt';

    const RENDERER_SELECTORS = [
        'ytd-rich-item-renderer', // home, subs
        'ytd-video-renderer'      // search
    ];

    let blockedChannels = new Set();

    function fetchBlocklist() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: BLOCKLIST_URL,
            onload(res) {
                if (res.status !== 200) {
                    console.error('DeSlop: blocklist fetch failed', res.status);
                    return;
                }

                blockedChannels = new Set(
                    res.responseText
                        .split('\n')
                        .map(l => l.trim())
                        .filter(Boolean)
                );

                console.log('DeSlop: blocklist loaded', blockedChannels);
                sweepAll();
            }
        });
    }

    function extractChannelHref(renderer) {
        const link = renderer.querySelector(
            'a[href^="/@"], a[href^="/channel/"]'
        );
        if (!link) return null;
        return link.getAttribute('href').split('?')[0];
    }

    function nuke(renderer, href) {
        renderer.dataset.deslopNuked = 'true';
        renderer.remove();
        console.log('DeSlop: nuked', href);
    }

    function sweepRenderer(renderer) {
        if (renderer.dataset.deslopNuked) return;

        const href = extractChannelHref(renderer);
        if (!href) return;

        if (blockedChannels.has(href)) {
            nuke(renderer, href);
        } else {
            renderer.dataset.deslopNuked = 'checked';
        }
    }

    function sweepAll() {
        RENDERER_SELECTORS.forEach(sel => {
            document.querySelectorAll(sel).forEach(sweepRenderer);
        });
    }

    function observeDom() {
        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;

                    if (RENDERER_SELECTORS.includes(node.tagName.toLowerCase())) {
                        sweepRenderer(node);
                    } else {
                        RENDERER_SELECTORS.forEach(sel => {
                            node.querySelectorAll?.(sel).forEach(sweepRenderer);
                        });
                    }
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        console.log('DeSlop: global observer armed');
    }

    fetchBlocklist();
    observeDom();

    setInterval(sweepAll, 3000);
})();
