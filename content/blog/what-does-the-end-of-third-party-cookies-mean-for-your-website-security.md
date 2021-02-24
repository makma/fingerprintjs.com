---
templateKey: long-form-content
metadata:
  title: Your website security and the end of cookies | FingerprintJS Blog
  description: "Third party cookies have been a part of the web for decades, but
    new policies are threatening their existence. Is your website ready for what
    comes next? "
  url: https://fingerprintjs.com/blog/the-end-of-third-party-cookies
  image: /img/uploads/fpjs_cover2.png
featured: true
publishDate: 2021-02-22T17:20:15.092Z
title: What does the end of third party cookies mean for your website security?
tags:
  - fingerprinting
  - js
  - web
---
Google announced that it will [phase-out third party cookies](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html), eliminating them by 2022 in its Chrome browser. Apple’s Safari and Mozilla’s Firefox browsers have already blocked third party cookies.

Cookies have been a part of the web for over twenty-five years, and for much of that time they’ve been involved in controversy. Cookies cause distrust because they can track users and monitor what sites they visit, but cookies have also been a valuable tool for websites by saving visitor preferences and passwords and preventing fraud by identifying otherwise anonymous users.

In this article, we describe how FingerprintJS uses cookies as one tool of many to help our customers prevent fraud, what changes to third party cookies mean to your website’s security, and how our technology will continue to work in a world where cookies may no longer be available. 

 

**Cookie background**

A cookie is a piece of data that a website issues to a user’s browser, containing a unique identifier, information about the user, and attributes like expiration date and domain validation. They were invented by the Netscape Communications Corporation in 1994 and were first used to determine if a visitor to their website had been there before. 

There are several different types of cookies - some of the most fundamental versions include:

* **Session cookie**: Stored in temporary memory, session cookies disappear when the browser is closed. Often used for shopping carts.
* **Persistent cookie**: Cookies that your browser stores on your device. They remain after you shut your browser down, and they’re retrieved from their issuing site whenever you visit. Persistent cookies can be deleted and have expiration dates.
* **First party cookies**: Issued from the site you are visiting, these cookies are not included in Google, Apple, or Mozilla’s current cookie-blocking schemes.
* **Third party cookies**: Issued from a domain other than the one you’re visiting, these cookies are often associated with marketing trackers. The current movement to ban cookies focuses on this type.

 

**How FingerprintJS uses cookies**

FingerprintJS uses first party cookies in addition to browser fingerprinting and other techniques as a way to verify user identity. It works like this:

1. User visits a FingerprintJS Pro’s customer website*.
2. The user’s browser receives a persistent first party cookie. This cookie contains a unique identifier.
3. The user returns to the site within the cookie’s expiration date, FingerprintJS sees the cookie, and the user is identified.

\*Note: to enable cookies, FingerprintJS customers must first set up a [subdomain](https://dev.fingerprintjs.com/docs/subdomain-integration).

Cookies are a useful identification tool, but they aren’t the only way to identify users.



**First party cookies will survive**

If your website uses FingerprintJS Pro first party cookies or any other first party cookies, you will not be affected by the cookie-banning policies of the major browser companies. But first party cookies are not perfect. Their downsides include:

* They can be deleted.
* Users can refuse to accept them.
* They expire over time.
* They’re vulnerable to [cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks, spoofing, and other forms of fraud.

There are better ways to identify users and prevent fraud than cookies alone. It’s even possible to completely eliminate cookies and still have reliable identification and security for your website. 



**How FingerprintJS identifies user browsers without cookies**

FingerprintJS Pro collects information from a user’s browser to create identifiers without cookies. This information includes attributes like screen size, loaded fonts, operating system, and much more. The unique identifier our system creates by combining these attributes with other identifying information is called a visitorID. A user can change many of their attributes but our advanced matching system will still be able to identify most browsers.

In a possible future where even first party cookies are completely eliminated, FingerprintJS will continue to accurately identify users with our visitorID system. 



**Advantages of our visitorID system include:**

* Our system uses cookies for an extra layer of accuracy, but doesn’t rely on them. 
* Unlike a cookie that can be deleted by the user, FingerprintJS visitorIDs are permanent.
* Our system is accurate, even when users browse in incognito mode.
* Our system is hard for potential hackers to detect and spoof.
* You can find the geolocation of your users, look up visitorID histories, and view other information through our API.

In addition to identifying whether a browser has been to a site, FingerprintJS Pro collects information that can be used to detect bots, detect account sharing, create a metered paywall, and much more.



Start a [free trial ](https://dashboard.fingerprintjs.com/signup/)to see how we can identify your users and prevent fraud.