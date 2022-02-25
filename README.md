# IP-HOST AUTO-HEADER | Browser extension
## Supported browsers: Firefox, Opera, Chrome, Chromium

Current version: **1.1** | 2022-02-25

**The IP-HOST AUTO-HEADER extension allows you to create a list of IP addresses and their corresponding hosts.
Hostnames assigned to the IP address are then automatically appended to the request in the HTTP "Host" header if a connection to the given IP address is detected. This enables automated access to servers using their IP addresses and a prepared list against domain names. The list of IP addresses / hosts can be exported / imported from a JSON file.**

## Features:

- easy to use
- provides access to websites via an IP address
- provides access to websites during DNS failure
- allows you to create your own list of IP addresses and their assigned hosts
- automatically detects if the requested IP address is on the list
- automatically includes the appropriate HTTP Host header to the request
- allows you to import / export a list of IP addresses and hosts

## HOW TO INSTALL EXTENSION FROM GITHUB:

# Chrome / Chromium

1) Download .zip file and extract it
2) Enter `chrome://extensions` in the URL bar
3) Enable `Developer Mode` if disabled
4) Click on `Load unpacked` button and choose `./chrome` directory from extracted zip archive
5) Pin extension to toolbar and go to extension options/preferences to configure IP/Host list.

**Tutorial here:** https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked

# Firefox

1) Download .zip file and extract it
2) Enter `about:debugging` in the URL bar
3) Click `This Firefox`
4) Click `Load Temporary Add-on` button and choose `./firefox/manifest.json` file from extracted zip archive
5) Go to Add-on preferences to configure IP/Host list.

**Tutorial here:** https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/

WARNING: in Firefox temporary extensions are enabled only by browser session

# Opera

1) Download .zip file and extract it
2) Enter `opera:extensions` in the URL bar
3) Enable `Developer Mode` if disabled
4) Click `Load Temporary Add-on` button and choose `./opera/manifest.json` file from extracted zip archive
5) Pin extension to toolbar and go to Add-on preferences to configure IP/Host list.

**Tutorial here:** https://dev.opera.com/extensions/basics/

---

## USAGE:

1) Go to `Options/Preferences` (depends on selected browser)
2) Add IP and host and enable it by enabling checkbox next to it
3) If enabled, the browser will automatically attach the `HTTP Host` header corresponding to this IP address during the request
4) Optionally export your list and import on another device

---

## OPTIONS WINDOW:

![chrome](https://user-images.githubusercontent.com/61396542/155437076-dd0f28fb-981b-40c8-9cb2-2def2b8588d1.png)

---
 
### IP-HOST AUTO-HEADER is free to use but if you liked then you can donate project via BTC: 

**1LK9tDPBuBFXCKUThFWXNvdcdJ4gzx1Diz**

or by PayPal:
 **[https://www.paypal.me/szczyglinski](https://www.paypal.me/szczyglinski)**


Enjoy!

MIT License | 2022 Marcin 'szczyglis' Szczygliński

https://github.com/szczyglis-dev/php-ultra-small-proxy

Contact: szczyglis@protonmail.com
