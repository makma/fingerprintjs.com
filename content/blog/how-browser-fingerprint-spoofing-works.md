---
templateKey: long-form-content
metadata:
  title: Can You Prevent Browser Fingerprinting?
  description: Browser fingerprinting is effective for identifying anonymous
    traffic, but it isn't foolproof. Learn more about the various methods
    visitors can use to prevent browser fingerprints from accurately identifying
    visitors
  url: https://fingerprintjs.com/blog/browser-fingerprint-prevention/
  image: /img/uploads/fingerprint-spoofing.png
  imageAlt: Preventing Browser Fingerprinting
  imageTitle: Preventing Browser Fingerprinting
featured: false
publishDate: 2021-08-26T08:04:00.000Z
title: Can you Prevent Browser Fingerprinting?
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
---
Browser fingerprinting is a method of identifying and tracking website visitors that doesn’t rely on cookies or login sessions. Instead, visitors are identified by a myriad of browser parameters, from browser version to screen dimensions and installed fonts. Each parameter is of limited utility on its own, but when combined with others can be used to create a unique identifier for each website visitor.

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

On the other hand, developers have valid reasons for fingerprinting a visitor’s browser. Fingerprinting and other anonymous user identification methods are useful for identifying patterns of fraudulent activity, as the lion's share of fraud is committed by a small number of returning visitors. Fingerprinting also makes it possible to save browsing preferences and deliver better recommendations with requiring a returning visitor to log in.

In this article, we’ll look at some of the ways a website visitor can prevent fingerprinting scripts from accurately identifying their browser, then we will analyze FingerprintJS to see how it creates accurate fingerprints for verifying authorized users, even when methods to prevent fingerprinting are being used.

## What Doesn't Work to Prevent Browser Fingerprinting

Preventing browser fingerprinting can be difficult for web users to do without having a better understanding of the technology and how it works. Some of the standard techniques the average visitor may use to protect their identity are not effective against fingerprinting, such as clearing cookies, browsing in incognito mode or using a VPN: 

* **Cookies:** Browser fingerprinting does not inherently rely on cookies to generate a unique identifier. So while turning them off can offer some degree of user privacy, it doesn’t impact fingerprinting capabilities.
* **Incognito mode:** This method of is equally ineffective for preventing browser fingerprinting, as a myriad of unique data points besides browsing history can be used for identifying visitors.
* **VPN**: VPNs are effective for hiding a visitor’s browsing history from the ISP, or hiding a visitor's real IP address and geolocation from a site. It is not very effective for preventing fingerprinting however, as many browser fingerprinting scripts (FingerprintJS included) don't use IP address as a core signal as it is too unstable. If IP address is included, the fingerprinter can use fuzzy matching so that a change in IP address while all other signals remains constant would not result in a new fingerprint. 

## What Works (Sometimes) to Prevent Browser Fingerprinting

There are a few ways to mitigate browser fingerprinting techniques, but even these are not foolproof. Some browsers offer browser fingerprinting mitigation strategies as an in-built feature; for example, [Firefox](https://support.mozilla.org/en-US/kb/firefox-protection-against-fingerprinting) gives users the option to block third-party requests to sites known to utilize fingerprinting. This provides added protection, but would not be able to catch first-party scripts.

Another possible way to reduce the signals available is to turn off functionality/capabilities altogether like HTML canvas or audio content that are commonly used for browser fingerprinting. However, many sites won’t load correctly without these technologies, and the online experience can suffer.

Finally, some browsers like [Brave](https://brave.com/) use a method of spoofing called 'farbling'. Farbling introduces randomness to signal outputs so a visitor's fingerprint is generated using constantly changing inputs. Even this research-backed method has drawbacks for particularly sophisticated fingerprinting methods, as the [farbling can be reverted](https://fingerprintjs.com/blog/audio-fingerprinting/) and using fuzzy matching, fingerprints can be correctly associated despite small differences.

## Creating a Fingerprint

We’ve seen the different ways a browser can be fingerprinted, as well as the various methods to prevent accurate fingerprinting. If your site relies on fingerprinting to help prevent fraud or deliver optimized content to users, then it can be difficult to plan for every scenario. 

In these cases, FingerprintJS Pro offers a superior method of anonymous user identification that analyzes browser fingerprinting signals, cookies, visit history, and geolocation data and uses machine learning to create a unique visitorID for every website visitor. Built by a dedicated browser fingerprinting research team, the library is easy-to-install, [highly accurate](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy) and effective in stopping fraud and spam.

The following tutorial uses the CDN option, but the library can  also be installed by running `npm install @fingerprintjs/fingerprintjs-pro` and running `import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'`. 

To get started, create an `index.html` file with the following code between the head tags:

```
<script>
  function initFingerprintJS() {
    const fpPromise = FingerprintJS.load({ token: 'your-browser-token' });

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

This will print the visitorID to the console, but it won’t work until we give it a proper token. You can [sign up](https://dashboard.fingerprintjs.com/signup) for a 10-day free trial of the Pro version, which is the one used in this example. The Pro version offers more detailed data analysis and protection than the open source version. 

Click the **tokens** tab on the left and copy the token marked **browser**. Replace `your-browser-token` in the `index.html` file with the token copied from FingerprintJS. Now you are ready to test. Start up a server and visit your new site. This demo uses [http-server](https://www.npmjs.com/package/http-server) because it installs quickly and is easy-to-use. 

First visit the site in a normal Chrome browser instance with cookies enabled. FingerprintJS will attempt to create a cookie, but if the user has cookies turned off, it will use dozens of browser attributes to create a unique `visitorId`. In this case, it will identify your browser using a cookie. If you open up the Chrome developer console, you should see your unique visitorID printed out. 

Back on the FingerprintJS dashboard, you should see a table of unique visitorIDs as well as more information about each user. The account has logged two unique visitors so far because of the previous tests on two different laptops.

![FingerprintJS Dashboard showing 2 unique visitors](/img/uploads/screenshot_fpjs_usage.png)

Try visiting the locally-hosted site again in incognito mode, keeping in mind that incognito windows in Chrome do not have access to cookies. Open the console and check for the printed visitorID. You should see that FingerprintJS has detected that this is still the same user and has logged the same visitorID in the console.

Repeating this process with Firefox will yield different results. Because a different browser type was used, FingerprintJS created a different visitorID than the one it created in the original Chrome browser instance, though it did recognize the Firefox browser instance again with privacy and strict security mode enabled.

You can also verify that FingerprintJS works over a VPN connection. Using a cloud platform that provides app infrastructure for developers such as [Heroku](https://www.heroku.com/) (or any hosting provider), deploy the local test app and visit the site over a VPN connection. Be sure to test both Firefox and Chrome in regular and incognito modes. You should observe that the visitorID is the same as when tested locally without VPN.

A few considerations and caveats are worth keeping in mind. Because FingerprintJS visitorIDs are derived from a myriad of browser attributes—some universal, others vendor-specific—a website visitor using both Chrome and Firefox will most likely be assigned a separate, unique visitorIDs for each browser type. Results may also vary with other browsers; for example, the security-focused Brave browser seems to completely block the API calls necessary for creating a unique identifier.

Despite eliciting mixed opinions from website users, browser fingerprinting can be an invaluable resource for developers looking to mitigate fraud, spam, and account takeovers. As demonstrated in the previous example, [FingerprintJS](https://fingerprintjs.com) provides this capability with maximum accuracy and minimal fuss. Website operators looking to protect their paywalls, cryptocurrency trading activities, e-commerce transactions, and more can test drive browser fingerprinting immediately with a [free trial](https://dashboard.fingerprintjs.com/signup).