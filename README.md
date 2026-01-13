# DeSlop

Userscript and browser extension for filtering out AI slop from your YouTube feed. Blocklist-driven.

## Description

Fetches a blocklist from [GitHub](https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt) and removes any and all videos from your feed that matches any entry on that list.

Channels that publish fully AI-generated "content" as well as channels that promote or teach how to create it qualify as AI slop, and will therefore be blocked.

As a cherry on top, I *think* YouTube still counts you as having technically "seen" the videos in your feed, but decided not to click them. Which should negatively impact the slop creators' click-through rates, all in the background, which is good.

[Contributions to the blocklist](#blocklist) are welcome!

## Installation

YouTube DeSlop can be installed either as:
- [A Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/youtube-deslop/)
- [A Userscript](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/userscript/deslop-1.2.user.js)
  - Userscript Managers: ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)/[Chromium](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo))

They do not differ in functionality.

### Chromium

There will **not** be an official Chrome Web Store Extension.

I'm not doing Google's age verification bullshit and paying the fee just to get denied because they love AI slop.

![Fuck Google](/assets/20260112181741.png)

**Recommended**: On Chromium, use Tampermonkey and the userscript.

1. Install [Tampermonkey from Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
2. Make sure Tampermonkey can actually *run* userscripts:
  - Go to `chrome://extensions/`
  - Click **Details** under Tampermonkey
  - Enable **“Allow access to file URLs”**, **“Allow User Scripts”** and **"Developer Mode"**, then hit **"Update"**
3. Click [the install link](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/userscript/deslop-1.2.user.js) and install when prompted.
4. Done!

**Not Recommended**: You *can* also add YouTube DeSlop as a temporary extension to Chromium, a directory is provided for it in `/chromium/1.2`

1. Go to `chrome://extensions/`
2. Enable **Developer Mode** in the top-right corner.
3. Click **Load unpacked** from the newly appeared bar.
4. Navigate to the extension folder and confirm.
  - Oh yeah, download and unzip the extension ([here](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/chromium/1.2/1.2.zip))
5. Enjoy! Until you restart your browser, then it's gone.

## Blocklist

⚠️ The list is incomplete! Your help is much appreciated! ⚠️

The blocklist can be found in [`/block/list.txt`](https://github.com/NikoboiNFTB/DeSlop/blob/main/block/list.txt).

Reporting channels can be done in multiple ways;

1. Forking the repository, modifying the [`/block/list.txt`](https://github.com/NikoboiNFTB/DeSlop/blob/main/block/list.txt) file and submitting a pull request on [GitHub](https://github.com/NikoboiNFTB/DeSlop/pulls). This is the easiest on the back-end.

The blocklist entries **must** be in this format:

```text
/@NikoboiNFTB
```

If the user has no @ username, use the **channel ID**:

```text
/channel/UCDI-86yEQamXmjvvxg40cIQ
```

- Basically the exact contents of href="" on the feed page.

- Feel free to sort the entries, or not. I've included a handy [sort](https://github.com/NikoboiNFTB/DeSlop/blob/main/block/sort) script in the block folder.

2. Email me at [my support email](mailto:support@nikoboi.dev) and I will add the channel manually.
  - Preferably a channel link in this case.
  - Your email will not be used for anything, ever.
    - Feel free to use any throwaway email, I don't care.

>> Google Forms for anonymous submissions coming soon!

## File Structure

```text
.
├── assets
│   ├── 20260112180516.png
│   ├── 20260112181451.png
│   └── 20260112181741.png
│
├── block
│   ├── list.txt
│   └── sort
│
├── chromium
│   ├── 1.0
│   │   ├── icons
│   │   │   └── icon128.png
│   │   ├── deslop-bg.js
│   │   ├── deslop.js
│   │   └── manifest.json
│   ├── 1.1
│   │   ├── icons
│   │   │   └── icon128.png
│   │   ├── deslop-bg.js
│   │   ├── deslop.js
│   │   └── manifest.json
│   └── 1.2
│       ├── icons
│       │   └── icon128.png
│       ├── deslop-bg.js
│       ├── deslop.js
│       └── manifest.json
│
├── firefox
│   ├── 1.0
│   │   ├── icons
│   │   │   └── icon128.png
│   │   ├── deslop-bg.js
│   │   ├── deslop.js
│   │   └── manifest.json
│   ├── 1.2
│   │   ├── icons
│   │   │   └── icon128.png
│   │   ├── deslop-bg.js
│   │   ├── deslop.js
│   │   └── manifest.json
│   ├── 1.3
│   │   ├── icons
│   │   │   └── icon128.png
│   │   ├── deslop-bg.js
│   │   ├── deslop.js
│   │   └── manifest.json
│   └── 1.4
│       ├── icons
│       │   └── icon128.png
│       ├── deslop-bg.js
│       ├── deslop.js
│       └── manifest.json
│
├── userscript
│   ├── deslop-1.0.user.js
│   ├── deslop-1.1.user.js
│   └── deslop-1.2.user.js
│
├── LICENSE
└── README.md

20 directories, 45 files
```

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## Credits

Created by **[Nikoboi](https://github.com/NikoboiNFTB/)**

## License

This project is licenced under the GNU General Public License V3. See [LICENSE](LICENSE) for details.
