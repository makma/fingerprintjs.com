---
templateKey: long-form-content
metadata:
  title: How Browser Fingerprint Spoofing Works
  description: Browser fingerprinting is effective for identifying anonymous
    traffic, but it isn't foolproof. Learn more about the various methods for
    spoofing browser fingerprints.
  url: https://fingerprintjs.com/blog/browser-fingerprint-spoofing/
  image: /img/uploads/fingerprint-spoofing.png
  imageAlt: Browser Fingerprint Spoofing
  imageTitle: Browser Fingerprint Spoofing
featured: true
publishDate: 2021-08-26T08:04:00.000Z
title: How Browser Fingerprint Spoofing Works
tags:
  - fingerprinting
  - payment fraud
  - bot attacks
authors:
  - Josh Alletto
heroImage:
  image: /img/uploads/fingerprint-spoofing.png
  imageAlt: "Browser Fingerprint Spoofing "
  imageTitle: "Browser Fingerprint Spoofing "
customCTA:
  openCtaNewTab: false
---
Browser fingerprinting is a method of identifying and tracking website visitors that doesn’t rely on cookies or login sessions. Instead, visitors are identified by a myriad of browser parameters, from IP address and browser version to screen dimensions and installed fonts. Each parameter is of limited utility on its own, but when combined with others can be used to create a unique identifier for each website visitor.

Here are some data points that browser fingerprinting uses to create unique IDs: 

* IP address
* Browser type and version
* Language
* Time zone
* Graphics card type (via [HTML canvas drawing](https://www.w3schools.com/html/html5_canvas.asp)) 
* Device make and model 
* Installed plugins
* Screen dimensions
* Keyboard type (e.g., QWERTY, Dvorak, etc.)
* Hardware type

Despite its unique capabilities, browser fingerprinting is not without its flaws. For example, browser fingerprint spoofing enables visitors to remain anonymous by disabling websites from creating unique identifiers. This can be accomplished by turning off certain browser features, using incognito mode, or connecting over VPN, just to name a few.

Privacy-conscious website visitors wouldn’t necessarily consider the above flaws, and their concerns are certainly valid: companies can use browser fingerprinting data to build unique user profiles without cookies or user sign-ins. This data can be in turn sold, harvested to trigger targeted ads, or  used to fix product prices based on the visitor’s location.

Notwithstanding, developers have valid reasons for fingerprinting a visitor’s browser. Anonymous site users can easily become security risks, as they often are precursors to fraudulent payments and bot net attacks—threats that browser fingerprinting helps to mitigate. Fingerprinting also enables developers to understand a visitor’s environment for delivering the most compatible website version.

In this article, we’ll look at some of the ways a website visitor can create a false fingerprint, then analyze FingerprintJS to see how it creates accurate fingerprints for verifying authorized users, even when spoofing is being used.

## How to Spoof Browser Fingerprints

Blocking browser fingerprinting is extremely difficult for users to do on their own. More often, they will employ a few different tools and techniques such as turning off cookies or browsing in incognito mode. These are not usually that effective. 

At its essence, the nature of fingerprinting is to avoid using cookies. So while turning them off can offer some degree of user privacy, it doesn’t impact fingerprinting capabilities. Incognito mode browsing is equally ineffective for preventing browser fingerprinting, as a myriad of unique data points besides browsing history can be used for identifying visitors.

Some browsers offer browser fingerprinting blocking as an in-built feature; for example, [Firefox](https://support.mozilla.org/en-US/kb/firefox-protection-against-fingerprinting) gives users the option for Strict security mode. This provides added protection, but at the cost of a compromised user experience (e.g., suboptimal page quality, slow loading speeds). Since the only way to block browser fingerprinting is to turn off features/capabilities like HTML canvas or audio content, many sites won’t load correctly in Strict security mode.

Similarly, up-and-coming browsers like [Brave](https://brave.com/) are built from the ground up with privacy in mind. Brave can be effective against fingerprinting, but again—at the price of a less-than-ideal user experience. Additionally, the browser is relatively new, so not many users are aware of it.

Another popular way to bolster privacy during internet use is to employ a VPN. VPNs are effective for hiding a visitor’s browsing history from the ISP, or hiding an IP address from a site, but again—browser fingerprinting uses so many data points that eliminating one or two is often ineffective for disabling it. For this reason, users determined to hide their fingerprint will often try several of the above techniques. 

## Creating a Fingerprint

We’ve seen the different ways a browser can be fingerprinted, as well as the various methods to block fingerprinting. If your site relies on fingerprinting to help prevent fraud or deliver optimized content to users, then it can be difficult to plan for every scenario. 

In these cases, FingerprintJS offers a superior method of fingerprinting that compiles browser signals to create a unique fingerprint for every website visitor. Built by a dedicated browser fingerprinting research team, the library is easy-to-install, [highly accurate](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy) and effective in stopping fraud and spam.

The following tutorial uses the CDN option, but the library can  also be installed by running `npm install @fingerprintjs/fingerprintjs-pro` and running `import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'`. 

To get started, create an `index.html` file with the following code in the head.

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

This code will print the visitor ID to the console, but it won’t work until we give it a proper token. Head over to the [quick start guide](https://dev.fingerprintjs.com) to create a new account. When you sign up you’ll be given a 30-day free trial of the pro version, which is the version used in this example. The pro version offers more detailed data analysis and protection than the open source version. 

Click the **tokens** tab on the left and copy the token marked **browser**. Replace `your-browser-token` in the `index.html` file with the token you copied from FingerprintJS. Now we are ready to test. Start up a server and visit your new site. I’m using [http-server](https://www.npmjs.com/package/http-server) because it is quick to install and easy to use. 

Click the **tokens** tab on the left and copy the token marked **browser**. Replace `your-browser-token` in the `index.html` file with the token copied from FingerprintJS. Now you are ready to test. Start up a server and visit your new site. This demo uses [http-server](https://www.npmjs.com/package/http-server) because it installs quickly and is easy-to-use. 

First visit the site in a normal Chrome browser instance with cookies enabled. FingerprintJS will attempt to create a cookie, but if the user has cookies turned off, it will use dozens of browser attributes to create a unique `visitorId`. In this case, it will identify your browser using a cookie.

If you open up the Chrome developer console, you should see your unique visitor ID printed out. 

Back on the FingerprintJS dashboard, you should see a table of unique visitor IDs as well as more information about each user. The account has logged two unique visitors so far because of the previous tests on two different laptops.

![FingerprintJS Dashboard showing 2 unique visitors](/img/uploads/screenshot_fpjs_usage.png)

Try visiting the locally-hosted site again in incognito mode, keeping in mind that incognito windows in Chrome do not have access to cookies. Open the console and check for the printed visitor ID. You should see that FingerprintJS has detected that this is still the same user and has logged the same visitor ID in the console.

Repeating this process with Firefox will yield different results. Because it is a different browser, FingerprintJS created a different visitor ID than the one it created in the original Chrome browser instance—though it did recognize the Firefox browser instance again with privacy and strict security mode enabled.

You can also verify that FingerprintJS works over a VPN connection. Using a cloud platform that provides app infrastructure for developers such as [Heroku](https://www.heroku.com/) (or any hosting provider), deploy the local test app and visit the site over a VPN connection. Be sure to test both Firefox and Chrome in regular and incognito modes. You should observe that the visitor ID is the same as when  tested locally without VPN.

A few considerations and caveats are worth keeping in mind. Because FingerprintJS visitor IDs are derived from a myriad of browser attributes—some universal, others vendor-specific—a website visitor using both Chrome and Firefox will most likely be assigned a separate, unique visitor IDs for each browser type. Results may also vary with other browsers; for example, the security-focused Brave browser seems to completely block the API calls necessary for creating a unique identifier.

Despite eliciting mixed opinions from website users, browser fingerprinting can be an invaluable resource for developers looking to mitigate fraud, spam, and account takeovers. As demonstrated in the previous example, [FingerprintJS](https://fingerprintjs.com) provides this capability with maximum accuracy and minimal fuss. Website operators looking to protect their paywalls, cryptocurrency trading activities, e-commerce transactions, and more can test drive browser fingerprinting immediately with a [free trial](https://dashboard.fingerprintjs.com/signup).