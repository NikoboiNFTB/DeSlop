// Replace filter with:

blockedChannels = new Set(
    res.responseText
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'))
);
