---
templateKey: long-form-content
metadata:
  title: "What is Browser Fingerprinting: A Beginner's Guide - Fingerprint  "
  description: Browser fingerprinting is a type of fraud prevention that
    accurately identify users and flag fraudulent visitors through numerous
    identification signals. Learn more about how it works and how it’s
    implemented on today’s websites.
  url: https://fingerprint.com/blog/what-is-browser-fingerprinting
  image: /img/uploads/3.png
  imageAlt: Browser fingerprinting
  imageTitle: Browser fingerprinting
  socialImage: /img/uploads/3.png
featured: false
publishDate: 2020-12-24T16:11
title: The Beginner’s Guide to Browser Fingerprinting for Fraud Detection
isPublished: true
isHidden: false
tags:
  - js
  - web
  - fingerprinting
authors:
  - Savannah Copland
heroImage:
  image: /img/uploads/3.png
  imageAlt: Fingerprint icon on map background
  imageTitle: Fingerprint icon on map background
customCTA:
  title: Comparing OSS vs. Pro?
  description: Download our PDF guide with a full comparison.
  ctaText: Get the PDF
  ctaUrl: https://try.fingerprint.com/en-us/oss-vs-pro-comparison-pdf
  openCtaNewTab: true
---
**Fraud looms on the minds of development teams for any website, but fraud prevention doesn't have to be all-consuming or expensive.** With a highly accurate identifier, it becomes much easier for developers to triage suspicious traffic and restrict access to users attempting to hack into accounts, make fraudulent purchases or spam your website. The key to identifying those most likely to commit fraud is either by past activity or by associating specific use patterns with a higher likelihood of fraudulence.

### What is Browser Fingerprinting?

Browser fingerprinting technologies are a cornerstone for developer-led fraud prevention that cuts through spoofing attempts to identify users accurately. Moreover, it can do this without requiring additional permissions from the user. \
Our open-source [browser fingerprinting library](https://github.com/fingerprintjs/fingerprintjs) has over 16K stars on Github and is used by 8,000+ websites, including 12% of the top 500 by traffic. Fingerprinting techniques on their own are over [90% accurate](https://arstechnica.com/information-technology/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/) in correctly identifying a unique user in the browser. This accuracy can be further improved when used in conjunction with usage history, fuzzy matching, and probability engines.

## How Fingerprinting Works

#### Identifying a Vehicle

Here's an analogy: let's say you're a detective in a large city trying to find one specific car suspected of being a bank robber's getaway, as captured by a security camera. To find this car, you plan to go to a busy intersection and note all the details of passing cars until you find one that matches the vehicle on the security camera. Ideally, you would like to uniquely identify the car such that only one vehicle in the city fits your description. Otherwise, you'll have to question multiple drivers.

If the security camera caught some basic details (or signals) about the car, you'd be able to narrow your search considerably:

* Color (red)
* Manufacturer (Ford)
* Type of car (truck)
* Model name (F-150)
* Brand of tires (stock Goodyears)
* Age/year (2015-2021)

With these signals, you may be able to uniquely identify the vehicle right away, especially if any of the specifics are particularly rare. However, hundreds of red Ford F-150 trucks may have standard-issue tires in a city with millions of drivers. The more standard the combination of signals, the harder it is to get a unique match.

In those cases, you hope that your camera may have gotten lucky and matched a unique signal about the vehicle:

* Wood paneling
* Custom decal or logo
* Body damage/rust patterns
* Interior decorations

One of these signals may quickly narrow down your search. For example, a red Ford F-150 truck with a local company's logo could be unique, even in a large city.\
\
There is, of course, the most uniquely identifiable element of a car - the license plate. License plates serve the express purpose of uniquely identifying a car, but they aren't helpful if the vehicle owner removes their plates or swaps them with fakes. So it's essential to have a backup for when this identification method fails.

By assembling a comprehensive set of identifiers, you can narrow the list of suspects to make singling out a bad actor much more manageable.

#### Identifying a Visitor

Fingerprinting works almost the same as the example above. Now, you are trying to identify a visitor to a web or mobile application (suspect) by capturing signals passed via the visitor's browser or device (car) captured through a fingerprinting function (security camera).\
Browsers can capture many signals, including:

* User-agent details (browsers installed and their versions, operating system)
* Hardware details (screen resolution, battery usage, device memory)
* Browser plugins used
* The browser and OS settings
* WebGL parameters

When a visitor lands on a webpage, the fingerprinting function collects signals and compiles them into a hash that can be stored. Then, when visitors return to the website, match any past visit to their current visit to identify suspicious behavior or past fraudulent activity.

## Accuracy

For a fingerprint to be helpful as a method of identifying visitors, it must have high accuracy. Our Fingerprint Pro tool has a 99.5% accuracy rate, which means for every 1,000 visits, 995 of the visits were correctly associated with a unique identifier.

For the 5 out of 1,000 visitors not correctly identified, they are either false positives or false negatives:

* **False-positive:** multiple unique visitors are associated with the same fingerprint
* **False-negative**: one visitor over numerous visits is assigned different fingerprints

When reducing the likelihood of false positives and negatives, a fingerprint should combine many signals and the right combination of signals that balance uniqueness and stability. For example, a highly unique signal will reduce your chances of a false negative, whereas stable signals will reduce your chances of a false positive.

![Graphic of signals by stability and uniqueness](/img/uploads/capture.png "Graphic of signals by stability and uniqueness")

Using this framework, you can remove signals from your fingerprinting function altogether. If a signal has low uniqueness and stability, it is likely to change or be spoofed frequently and doesn't contribute meaningfully to identity. For our car example, this might be whether a car has a dirty windshield - you cannot count on this signal to improve your chances of finding the right vehicle. In browser fingerprinting, the current battery level is a poor signal, so while it is accessible, we remove it from our fingerprinting function.

## The Case for Cookies

There should be special consideration for perfectly unique identifiers that are not always available.

Cookies work by storing a unique identifier hash in the browser when a visitor first lands on your website. When a visitor has a cookie that matches a previous visit record in your database, you can be confident that these two visitors are the same. However, cookies are a very easy identifier to conceal:

* Clearing cookies within browser settings
* Adblockers can disable cookies by default
* Visitors can revoke consent for a website to track their cookies as part of GDPR or CCPA

In these cases, instead of including a cookie as an identifier in your fingerprinting function, it can be more beneficial to use logic to determine when to use cookies as your identifier:

* **If a cookie matches a previous record:** use a cookie
* **If no cookie matches the previous record:** use a fingerprint

One of the main advantages of fingerprinting is that it is stateless. Therefore, a well-implemented fingerprint can remain stable through multiple sessions, incognito browsing, uninstalling or reinstalling apps, or clearing cookies. For that reason, using the two methods in conjunction with one another can give a higher % accuracy than either identification method alone.

*Fingerprint Pro achieves its high accuracy rate by using fingerprinting, cookies, and additional machine learning techniques that incorporate IP address and geolocation.* One challenge is keeping up with changes in available signals as new browser versions are released. Anytime Chrome or Safari updates, identification techniques need to be re-evaluated to determine if there should be more tweaks to keep accuracy high. Our team is constantly working on the signals, algorithms, and techniques.

## Fraud Applications For Fingerprinting

A crucial first principle for dealing with fraud is that only a tiny percentage of visitors are responsible for most [fraud cases](https://www.f5.com/labs/articles/threat-intelligence/2020-phishing-and-fraud-report#_fig19). Therefore, a developer team aiming to reduce fraud on their website will need to find ways to isolate these visitors, verify their identity through authentication, and block them as required. However, you will want to avoid putting up these roadblocks for the rest of your ''trusted'' traffic, as additional authentication can be detrimental to the user experience, slowing your users' ability to access their account, make purchases, and engage with your website.

Account takeover is a common form of fraud where malicious users try to log in to other users' accounts and is an excellent use case for fingerprinting technology. Additional security at login can make account takeover much more difficult, though the type of authentication used may depend on the suspicious behavior your website experiences most often:

* **For bot or brute force attacks** (*one user or a network of bots trying many combinations of usernames/passwords*):
* * Show a captcha after one unsuccessful login attempt on a fingerprint.
  * Lock user out of attempting login after five unsuccessful attempts on a fingerprint.
* **For phished accounts** (*a user obtained someone else's legitimate login information through a scam or social engineering*):
* * Require two-factor or email authentication when attempting to log in with a new fingerprint.
  * Blocklist specific fingerprinted visitors from your site based on their fingerprint.

In each case, an accurate fingerprint allows your team to pinpoint users attempting fraudulent behavior while keeping your trusted users unhindered. In addition, you can incorporate the type of authentication needed into your website by using existing workflows without fundamentally changing your site's architecture.

It is also important to note that users intending to commit fraud are much more likely to use techniques to conceal their identity, including using incognito mode, browsing via a VPN, and disabling cookies. That's also where fingerprinting shines, as it can associate these users without needing easily concealed identifiers like cookies and IP addresses.

## Browser Fingerprinting vs. Device Fingerprinting

Intended for browser fingerprinting, our "core" [Fingerprint](https://github.com/fingerprintjs/fingerprintjs) library identifies visitors to a website using all modern mobile and desktop browsers. However, the signals available for mobile app developers differ from signals that can be retrieved in the browser and vary between iOS, Android, and other mobile operating systems.

If you want to identify users of a native mobile app, we have a few options in our product suite:

* Fingerprint Pro, in addition to browser fingerprinting, includes high-accuracy native [Android](https://dev.fingerprint.com/docs/native-android-integration) and [iOS](https://dev.fingerprint.com/docs/native-ios-integration) integrations that allow developers to integrate device identification into native Android and iOS apps.
* Our [iOS open-source library](https://github.com/fingerprintjs/fingerprintjs-ios)
* Our [Android open-source library](https://github.com/fingerprintjs/fingerprintjs-android)

## Get Involved

We would love to hear your questions and feedback on our fingerprinting technology.

Here are a few ways you can get involved:

* Star, follow or fork our Github projects: [Fingerprint](https://github.com/fingerprintjs/fingerprintjs) (browser fingerprinting) and [Fingerprint-Android](https://github.com/fingerprintjs/fingerprint-android).
* Need more accurate browser fingerprinting for your business? Create a free Fingerprint Pro account for [99.5% fingerprinting accuracy](https://fingerprint.com/).
* Think Fingerprint could help your business? [Contact our sales team](https://fingerprint.com/contact-sales/) with your questions.