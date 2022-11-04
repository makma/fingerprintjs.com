---
templateKey: long-form-content
metadata:
  title: Can You Prevent Browser Fingerprinting?
  description: Browser fingerprinting is effective for identifying anonymous
    traffic, but it isn't foolproof. Learn more about the various methods
    visitors can use to prevent browser fingerprints from accurately identifying
    visitors
  url: https://fingerprint.com/blog/browser-fingerprint-prevention/
  image: /img/uploads/fingerprint-spoofing.png
  imageAlt: Preventing Browser Fingerprinting
  imageTitle: Preventing Browser Fingerprinting
featured: false
publishDate: 2021-08-26T08:04:00.000Z
title: Can you Prevent Browser Fingerprinting?
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - payment fraud
  - bot attacks
authors:
  - Josh Alletto
heroImage:
  image: /img/uploads/fingerprint-spoofing.png
  imageAlt: Preventing Browser Fingerprinting
  imageTitle: Preventing Browser Fingerprinting
customCTA:
  openCtaNewTab: false
  title: Stop fraud, spam, and account takeover with 99.5% accurate device
    fingerprinting-as-a-service.
  description: "Get unlimited API calls for free 10 days, no credit card required. "
  ctaText: Get Started
  ctaUrl: https://dashboard.fingerprint.com/signup
---
Browser fingerprinting is a method of identifying and tracking website visitors that don’t rely on cookies or login sessions. Instead, visitors are determined by collecting a series of browser parameters, from browser version to screen dimensions and installed fonts. Each parameter is of limited utility on its own, but when combined with others can be used to create a unique identifier for each website visitor.

Here are some data points that browser fingerprinting uses to create unique IDs: 

* Browser type and version
* Language
* Time zone
* Graphics card type (via [HTML canvas drawing](https://www.w3schools.com/html/html5_canvas.asp)) 
* Device make and model 
* Installed plugins
* Screen dimensions
* Hardware type

Privacy-conscious website visitors have their reasons for wanting to prevent browser fingerprinting. Companies can use browser fingerprinting data to build unique user profiles without cookies or user sign-ins, which can be used for advertising and marketing.

On the other hand, developers have valid reasons for fingerprinting a visitor’s browser. Fingerprinting and other anonymous user identification methods help identify patterns of fraudulent activity, as a small number of returning visitors commit the lion’s share of fraud. Fingerprinting also makes it possible to save browsing preferences and deliver better recommendations without requiring a returning visitor to log in.

This article will examine how website visitors can prevent fingerprinting scripts from accurately identifying their browsers. Next, we will analyze Fingerprint Pro to see how it creates accurate visitorIDs for each browser instance that visits a page, even with active fingerprinting prevention methods. 

## What Doesn't Work to Prevent Browser Fingerprinting

Preventing browser fingerprinting can be difficult for web users without a better understanding of the technology and how it works. Some of the standard techniques the average visitor may use to protect their identity are not effective against fingerprinting, such as clearing cookies, browsing in incognito mode, or using a VPN:

* **Cookies:** Browser fingerprinting does not inherently rely on cookies to generate a unique identifier. So while turning them off can offer some degree of user privacy, it doesn’t impact fingerprinting capabilities.
* **Incognito mode:** This method is equally ineffective for preventing browser fingerprinting, as many browser signals besides browsing history can be used for identifying visitors.
* **VPN**: VPNs are effective for hiding a visitor’s browsing history from the ISP or hiding a visitor’s actual IP address and geolocation from a site. However, it is not practical to prevent fingerprinting, as many browser fingerprinting scripts (Fingerprint included) don’t use IP address as a core signal as it is too unstable. If an IP address is included, the fingerprinter can use fuzzy matching so that a change in IP address while all other signals remain constant would not result in a new fingerprint.

## What Works (Sometimes) to Prevent Browser Fingerprinting

There are a few ways to mitigate browser fingerprinting techniques, but these are not foolproof. Some browsers offer browser fingerprinting mitigation strategies as an in-built feature. For example, [Firefox](https://support.mozilla.org/en-US/kb/firefox-protection-against-fingerprinting) allows users to block third-party requests to sites known to utilize fingerprinting, providing added protection but would not be able to catch first-party scripts.

Another possible way to reduce the signals is to turn off functionality/capabilities like HTML canvas or audio content commonly used for browser fingerprinting. However, many sites won’t load correctly without these technologies, and the online experience can suffer.

Finally, some browsers like [Brave](https://brave.com/) use a method of spoofing called ‘farbling’. Farbling introduces randomness to signal outputs, so a visitor’s fingerprint is generated using constantly changing inputs. However, even this research-backed method has drawbacks for particularly sophisticated fingerprinting techniques. The [farbling can be reverted](https://fingerprint.com/blog/audio-fingerprinting/), and while using fuzzy matching, fingerprints can be correctly associated despite minor differences.

## Creating a Fingerprint

We’ve seen how a browser can be fingerprinted and the various methods to prevent accurate fingerprinting. If your site relies on fingerprinting to help prevent fraud or deliver optimized content to users, it can be challenging to plan for every scenario.

Fingerprint Pro offers a superior method of anonymous visitor identification that uses browser fingerprinting in conjunction with cookies, visit history, and geolocation data to create a unique and highly stable visitorID. Built by a dedicated browser fingerprinting research team, the library is easy-to-install, [highly accurate](https://dev.fingerprint.com/docs/understanding-our-995-accuracy), and effective in stopping fraud and spam.

The following tutorial uses the CDN option for installation, but the library can also be installed by running `npm install @fingerprintjs/fingerprintjs-pro` and running `import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'`. 

To get started, create an `index.html` file with the following code between the head tags:

```html
<script>
  function initFingerprintJS() {
    const fpPromise = FingerprintJS.load({ apiKey: 'your-public-api-key' });

    fpPromise
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId));
  }
</script>
<script
    async
    src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
    onload="initFingerprintJS()"
></script>
```

This will print the visitorID to the console, but it won’t work until we give it a proper API key. You can [sign up](https://dashboard.fingerprint.com/signup) for a free account of Fingerprint Pro to get a unique API key for your website.

Click the **API Keys** tab on the left and copy the **public API key**. Replace `your-public-api-key` in the `index.html` file with the copy from Fingerprint. Now you are ready to test. Start up a server and visit your new site. This demo uses [http-server](https://www.npmjs.com/package/http-server) because it installs quickly and is easy to use.

First, visit the site in a standard Chrome browser with cookies enabled. Then, if you open the Chrome developer console, you should see your unique visitorID printed out.

On the Fingerprint dashboard, you should see a count of unique visitorIDs over the current billing period. The example screenshot below has logged two unique visitors, but if you are testing with one computer and browser only, you should see one unique visitor logged.

![Fingerprint Dashboard showing 2 unique visitors](/img/uploads/screenshot_fpjs_usage.png)

Try revisiting the locally-hosted site in incognito mode. Open the console and check for the printed visitorID. You should see that Fingerprint has detected that this is still the same browser instance and has logged the same visitorID in the console.

Repeating this process with Firefox will yield different results. Because a different browser was used, Fingerprint will generate a different visitorID than the one it created in the original Chrome browser instance. However, the Firefox visitorID should remain the same when you revisit the page with privacy, and strict security mode enabled.

You can also verify that Fingerprint works over a VPN connection. Using a cloud platform that provides app infrastructure for developers such as [Heroku](https://www.heroku.com/) (or any hosting provider), deploys the local test app and visits the site over a VPN connection. Be sure to test both Firefox and Chrome in regular and incognito modes. You should see that the visitorID is the same as when tested locally without a VPN.\
\
It is worth restating that Fingerprint generates an accurate visitor for each browser-device combination and not for each device. Because Fingerprint visitorIDs are derived from many browser attributes—some universal, others vendor-specific—a website visitor using both Chrome and Firefox will most likely be assigned a separate, unique visitorID for each browser type. This means a user could escape being associated with a previous visit if they used a different browser, though this trick would only work as long as they had new browsers.

Browser fingerprinting can be an invaluable resource for developers looking to mitigate fraud, spam, and account takeovers, as it can accurately identify users even when they attempt to conceal themselves. As demonstrated in the example above, [Fingerprint](https://fingerprint.com/blog/browser-fingerprint-prevention/) provides this capability with maximum accuracy and minimal fuss. Additionally, website operators looking to reduce fraud can test drive browser fingerprinting immediately with a [free account](https://dashboard.fingerprint.com/signup).