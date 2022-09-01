---
templateKey: long-form-content
metadata:
  title: "New: Fingerprint Pro for iOS 2.0"
  url: https://fingerprint.com/blog/fingerprint-ios-version-2
  description: "We’re excited to announce the release of Fingerprint for iOS
    version 2.0, which is out now and brings more features and upgrades to
    Fingerprint for iOS version 1.0. "
  image: /img/uploads/fingerprint-pro-version-2.0-for-ios-blog.png
  imageAlt: mobile phone illustration
  imageTitle: mobile phone illustration
  socialImage: /img/uploads/fingerprint-pro-version-2.0-for-ios-blog.png
featured: true
publishDate: 2022-09-01T16:38:16.133Z
title: "New: Fingerprint Pro for iOS 2.0"
isPublished: true
isHidden: false
tags:
  - ios
  - product-updates
authors:
  - Kevin Roy
heroImage:
  image: /img/uploads/fingerprint-pro-version-2.0-for-ios-blog.png
  imageAlt: mobile phone illustration
  imageTitle: mobile phone illustration
customCTA:
  openCtaNewTab: false
---
One of the key elements of Fingerprint’s device identification power is its ability to accurately identify unique visitors on both web and mobile devices. With mobile web traffic accounting for approximately half of all web traffic worldwide, it’s imperative developers can easily integrate device identification into native mobile apps. 

We’re excited to announce the release of Fingerprint for iOS version 2.0, which is out now and brings more features and upgrades to Fingerprint for iOS version 1.0. 

## Changes from 1.0 -> 2.0 

Fingerprint for iOS version 2.0 comes with a few new enhancements and features focused on ease of implementation and response time with the ultimate goal of bringing more features to mobile developers. 

### Request identifier 

New to 2.0, the request identifier (requestId) is a unique string of characters that changes with every request. It can then be used to query our Server API and get information about specific requests. You can also find a log of request identifiers in our dashboard in the “Visit History” section (as seen below) and filter for specific identifiers there.

![fingerprint pro dashboard](/img/uploads/screenshot-2022-09-01-at-16.43.49.png "fingerprint pro dashboard")

### LinkedID support

You can now associate iOS identification events with your internal identifiers. Depending on your use case, you can use [LinkedID](https://dev.fingerprint.com/docs/server-api#linkedid-adding-a-custom-identifier-to-events) to store different types of identifiers, such as sessionIDs, purchaseIDs, loginIDs and more. 

### Extended backend response

In version 1.0, the API response contained only the visitorID (one string) without any extra data being passed back. Version 2.0 produces a more robust backend response, including IP address, location, visitorID timestamps, and detection confidence. Learn more in our [documentation](https://dev.fingerprint.com/docs/ios#extended-result). 

### Faster response time 

We have removed the dependency on WKWebView and UI stack. The SDK now uses native code and doesn’t contain any dependencies that would add additional loading time, resulting in a faster API request/response time. 

### Async/await interface 

We added support for async/await, specific to the Swift programming language, to enable developers to obtain information provided by the visitorID. 

These new changes are a big leap forward in how developers can interact with Fingerprint for iOS and implement Device Identification and future products into their fraud detection and prevention systems on mobile.

For more on migrating from Fingerprint for iOS Version 1.0 to Version 2.0, check out the documentation section of our website [here](https://dev.fingerprint.com/docs/11-20-migration-guide). 

### Not using Fingerprint for iOS yet? 

Despite iOS being regarded as one of the safest platforms amongst its competitors, there are still malicious actors within the iOS ecosystem from which businesses must protect themselves. Get started with Fingerprint for iOS with our setup instructions [here](https://dev.fingerprint.com/docs/ios).