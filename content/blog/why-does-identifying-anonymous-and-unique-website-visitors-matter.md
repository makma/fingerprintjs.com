---
templateKey: long-form-content
metadata:
  title: Why does identifying anonymous and unique website visitors matter?
  description: Unique visitors are when someone who has visited a website or
    application in a specific time period. Anonymous visitors shield their
    identity to leave no identifiers, such as IP address or browser type. Google
    Analytics often leaves gaps when identifying returning unique visitors over
    an extended period of time as well as anonymous users. We explain the
    benefits of accurately identifying unique and anonymous visitors.
  url: fingerprint.com/blog/identifying-unique-and-anonymous-visitors
  image: /img/uploads/what-do-unique-visitors-anonymous-visitors-~actually~-mean-when-it-comes-to-identifying-them_.jpg
  imageAlt: Unique and Anonymous Visitors Image
  imageTitle: Unique and Anonymous Visitors Image
  socialImage: /img/uploads/what-do-unique-visitors-anonymous-visitors-~actually~-mean-when-it-comes-to-identifying-them_.jpg
featured: true
publishDate: 2023-01-13T21:31:57.661Z
title: Why does identifying anonymous and unique website visitors matter?
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Kevin Roy
heroImage:
  image: /img/uploads/what-do-unique-visitors-anonymous-visitors-~actually~-mean-when-it-comes-to-identifying-them_.jpg
  imageAlt: Unique and Anonymous Visitors Image
  imageTitle: Unique and Anonymous Visitors Image
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
When it comes to visitor identification on a website, not all visitors are created equal or even appear to be who they say they are. Understanding who visits a website or an app has become increasingly important and challenging given privacy laws, disruption with 3rd party cookies, and a more generalized consensus of consumers wanting to remain anonymous while browsing the web. 



## What are anonymous website visitors and unique website visitors

Before diving into the methods of visitor identification, it is essential to understand the difference between a unique visitor and an anonymous one. 

[Unique visitors](https://useinsider.com/glossary/unique-visitor/) can be defined as someone who has visited a website or application in a specific period (monthly or quarterly). They are categorized as “unique” because if they visit the same website or app within that time period, they will still only count as one unique visitor. This metric measures the total number of active or returning visitors to your website/app. 

Anonymous users intentionally obfuscate their identity to leave no identifiers, such as IP address or browser type. Standard techniques to remain anonymous are using incognito mode within a browser, using a VPN to change IP addresses randomly, or refreshing your cookies before browsing. Anonymous users returning to websites previously visited will be identified as new, unique users, despite this not being the case. It’s important to understand that anonymous visitors aren’t necessarily “bad” and can still impact your site; for instance, they may visit pages or click ads that generate revenue for you.



## Can anonymous users be identified? 

Yes, anonymous users can be identified despite their attempts to conceal their identity. [High-level browser fingerprinting](https://fingerprint.com/blog/browser-fingerprinting-techniques/?utm_source=blog&utm_medium=website&utm_campaign=blog) can be used to gather specific information, or signals, about a visitor that are then used to identify anonymous visitors upon returning to the website or app. Collecting multiple signals allows an anonymous user to be correctly identified, even if things like IP addresses or browsers change. The number of signals collected often dictates how accurate the browser fingerprinting technology can be - the more signals collected, the higher probability that a precise identification is made. 



## Is Google Analytics a visitor identifier? 

Google Analytics generates a JS Page Tag for each “unique” visitor randomly generated and stored as a cookie in the user’s browser. As long as the user returns to the website with the same browser and IP address, amongst other things, they will be recognized as a unique visitor. However, since Google Analytics uses browser cookies to track unique visitors, there are certain situations where there is inaccuracy in user data. 

Returning users will likely be counted as new users if they:

* Browse the website in incognito mode
* Clear cookies on their browser
* Access the website through multiple devices
* Use different browsers on the same device

Tools like Google Analytics and other visitor identification products often leave gaps in the analysis due to the inability to accurately identify returning unique visitors over an extended period of time as well as anonymous users. 



## What are the benefits of unique and anonymous visitor identification? 

So why go through the trouble of identifying incoming traffic to your website? For starters, tracking unique visitors is vital for understanding individual user behavior, overall website/app growth, and trends to follow. On a deeper level, user identification allows for various use cases across fraud detection, marketing attribution, and improving user experience.

* Fraud Detection: Track chargebacks by a unique visitor, prevent [account takeovers](https://fingerprint.com/account-takeover/?utm_source=blog&utm_medium=website&utm_campaign=blog), and manage attempted fraudulent payment transactions. 
* Marketing attribution: Understand user behavior, link separate visitors together, and associate sessions from within social media app webviews with browser sessions on the same device.
* User experience: [Personalize eCommerce shopping experiences](https://fingerprint.com/use-cases/personalization/?utm_source=blog&utm_medium=website&utm_campaign=blog) per visitor, remember cart inventory, or reduce extensive 2FA requests to ease the overall experience. For example, use it to personalize their login experience or remember their favorite items and settings like dark mode. 



## How Fingerprint works

Fingerprint uses browser fingerprinting and device identification to generate a unique visitorID for every user visiting your website or app. With over 100 signals being captured per user, Fingerprint can identify unique and anonymous visitors with 99.5% accuracy. Being an API-first product, Fingerprint can be incorporated into existing fraud engines to bolster fraud prevention and detection efforts or act as the cornerstone for your company’s identification efforts. Whether it’s fraud, attribution, user experience, or more, Fingerprint’s device identity platform has you covered. 

To see how Fingerprint works, check out a demo [here](https://fingerprint.com/demo/?utm_source=blog&utm_medium=website&utm_campaign=blog). To contact sales click [here](https://fingerprint.com/contact-sales/?utm_source=blog&utm_medium=website&utm_campaign=blog).