# DeSlop

Userscript and browser extension for filtering out AI slop from your YouTube feed.

## Description

Fetches a blocklist from [GitHub](https://raw.githubusercontent.com/NikoboiNFTB/DeSlop/refs/heads/main/block/list.txt) and removes any and all videos from your feed that matches any entry on that list.

Fully AI-generated videos as well as channels that promote or teach how to create AI slop qualify as AI slop.

## The blocklist

⚠️ The list is incomplete! Your help is much appreciated! ⚠️

Reporting channels can be done in multiple ways;

- Submitting a pull request on [GitHub](https://github.com/NikoboiNFTB/DeSlop/pulls). This is the easiest on the back-end.
  - The blocklist entries **must** be in this format:  
    ```/@NikoboiNFTB```
  - If the user has no @ username, use:  
    ```/channel/UCDI-86yEQamXmjvvxg40cIQ```
  - Basically the exact contents of href="" on the feed page.
  - Feel free to sort the entries, or not. I've included a handy ```sort``` script in the ```block``` folder.

- Email me at my support email and I will add the channel manually.
  - Preferably a channel link in this case.

- Contact me on any of [my socials](https://nikoboi.dev/#:~:text=My%20Socials)
  - Preferably a channel link in this case.

- Google Forms for anonymous submissions coming soon!

## Installation

YouTube DeSlop can be installed either as a [userscript](https://github.com/NikoboiNFTB/DeSlop/raw/refs/heads/main/userscript/deslop-1.0.user.js) using your favorite userscript manager or as a [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/youtube-deslop/) (coming soon).

## File Structure

.  
├── block  
│   ├── list.txt  
│   └── sort  
├── extension  
│   ├── deslop-bg.js  
│   ├── deslop.js  
│   ├── extension.zip  
│   ├── icons  
│   │   └── favicon_144x144.png  
│   └── manifest.json  
├── LICENSE  
├── README.md  
└── userscript  
    └── deslop-1.0.user.js  
