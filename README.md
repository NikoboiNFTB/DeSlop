# DeSlop

Userscript and browser extension for filtering out AI slop from your YouTube feed. Blocklist-driven.

## Description

Fetches a [blocklist from GitHub](https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt) and removes any and all videos from your feed that matches any entry on that list. Removes videos from Home and Subscriptions, and both videos and channels from Search.

Channels that publish fully AI-generated content as well as channels that promote or teach how to create it qualify as AI slop, and will therefore be blocked.

As a cherry on top, I *think* YouTube still counts you as having technically "seen" the videos in your feed, but decided not to click them. Which should negatively impact the slop creators' click-through rates, all in the background, which is good.

[Contributions to the blocklist](#blocklist) are welcome!

## Installation

YouTube DeSlop can be installed either as:
- [A Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/youtube-deslop/)
- [A Userscript](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/userscript/deslop-1.3.user.js)
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
3. Click [the install link](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/userscript/deslop-1.3.user.js) and install when prompted.
4. Done!

**Not Recommended**: You *can* also add YouTube DeSlop as a temporary extension to Chromium, a directory is provided for it in `/chromium/`

1. Go to `chrome://extensions/`
2. Enable **Developer Mode** in the top-right corner.
3. Click **Load unpacked** from the newly appeared bar.
4. Navigate to the extension **folder** and confirm.
  - Oh yeah, download and unzip the extension ([here](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/chromium/1.3/1.3.zip))
5. Enjoy! Until you restart your browser, then it may or may not be gone.

## Blocklist

⚠️ The list is incomplete! Your help is much appreciated! ⚠️

The blocklist can be found in [`/block/list.txt`](https://github.com/NikoboiNFTB/DeSlop/blob/main/block/list.txt).

### Reporting Channels

There are multiple ways to report channels.

#### Submit a Pull Request

This is the easiest on the back-end. You can follow these steps:

1. Fork the repository.
  - Go to the [GitHub Repository](https://github.com/NikoboiNFTB/DeSlop) and click **Fork** in the top-right corner.
  - This creates a copy of the repository under your own GitHub account, which you can edit freely.
2. Modify the blocklist.
  - Locate the `/block/list.txt` file in your forked repository.
  - There is a GUIDE at the top of the blocklist file.
3. Submit a pull request.
  - Step 1. Go to the [pulls](https://github.com/NikoboiNFTB/DeSlop/pulls) page.
  - Step 2. ???
  - Step 3. Profit

>> If you're seeing this, step 3 is a work in progress.

#### Open an Issue

You can also [open an issue](https://github.com/NikoboiNFTB/DeSlop/issues/new?template=channel_report.yml), where you link the channel(s) that should be blocked. There will be an issue template you can use.

#### Email

Email me at [my support email](mailto:support@nikoboi.dev) and I will add the channel manually.
  - Preferably a channel link in this case.
  - Your email will not be used for anything, ever.
    - Feel free to use any throwaway email, I don't care.

#### Google Forms

Google Forms for anonymous submissions coming soon!

#### Social Medias

You will also be able to contact me on any social media platform. Links coming soon!

### Entry Appeals

See an entry that shouldn't be there? [Submit a report](https://github.com/NikoboiNFTB/DeSlop/issues/new?template=channel_appeal.yml).

## File Structure

```text
.
├── assets
│   └── YYYYMMDDHHMMSS.png
│
├── block
│   ├── list.txt
│   ├── parse
│   └── sort
│
├── chromium
│   └── x.x
│       ├── icons
│       │   └── icon128.png
│       ├── x.x.zip
│       ├── deslop-bg.js
│       ├── deslop.js
│       └── manifest.json
│
├── firefox
│   └── x.x
│       ├── icons
│       │   └── icon128.png
│       ├── x.x.zip
│       ├── deslop-bg.js
│       ├── deslop.js
│       └── manifest.json
│
├── userscript
│   └── deslop-x.x.user.js
│
├── LICENSE
└── README.md

26 directories, 58 files
```

## Contributing

Feel free to fork this repository and submit issues or pull requests if you have any suggestions or improvements. If you encounter any bugs or have feature requests, please open an issue.

## Credits

Created by **[Nikoboi](https://github.com/NikoboiNFTB/)**

Massive thank you to [Link Gopher](https://sites.google.com/site/linkgopher/), which allows me to yoink all YouTube links from sites very easily.

The following websites provided very convenient blocklists:
- Honorable mention:
  - [FeedSpot](https://videos.feedspot.com/ai_youtube_channels/), providing 76 channels!
- Adequate mentions:
  - [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2025/12/best-ai-youtube-channels/), 12 channels.
  - [Your Dream AI](https://yourdreamai.com/best-ai-focused-youtube-channels/), 11 channels.
  - [Useful AI](https://usefulai.com/youtube-channels), 7 channels.
  - [Awisee](https://awisee.com/blog/best-ai-youtubers/), 5 channels.
  - [DEV.to](https://dev.to/andrewbaisden/21-must-subscribe-ai-youtube-channels-for-learning-and-inspiration-12m3), 21 channels.

Dishonorable mention:
- YouTube, for not marking AI slop -_-

## License

This project is licenced under the GNU General Public License V3. See [LICENSE](LICENSE) for details.
