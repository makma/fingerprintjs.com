---
templateKey: long-form-content
metadata:
  title: "FingerprintJS and Fingerprint Pro: 99.5% Device Identification Accuracy
    Explained"
  url: fingerprint.com/blog/fingerprintjs-fingerprint-pro-device-identification-accuracy-explained
  image: /img/uploads/accuracy-webinar-takeaway.gif
  imageAlt: device identification accuracy
  imageTitle: device identification accuracy
  socialImage: /img/uploads/accuracy-webinar-takeaway.gif
  description: "Accuracy really is everything when it comes to device
    identification. Fingerprint Pro maintains a 99.5% accuracy rate, which is
    the industry’s highest accuracy rate. We discussed how and why in a recent
    webinar and why our accuracy rates differ between our open-source
    FingerprintJS browser fingerprinting library and our Fingerprint Pro device
    identification solution. These are the key takeaways you need to know. "
featured: true
publishDate: 2022-07-06T19:14:25.688Z
title: "FingerprintJS and Fingerprint Pro: 99.5% Device Identification Accuracy
  Explained"
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Courtney Rogin
heroImage:
  image: /img/uploads/accuracy-webinar-takeaway.gif
  imageAlt: device fingerprinting accuracy
  imageTitle: device fingerprinting accuracy
customCTA:
  openCtaNewTab: true
  title: FingerprintJS vs Fingerprint Pro?
  description: "Get the full breakdown of differences including accuracy,
    stability and how Fingerprint Pro builds off our open-source offering. "
  ctaText: Download Now
  ctaUrl: https://try.fingerprint.com/en-us/oss-vs-pro-comparison-pdf
---
Last month, we hosted a webinar on the importance and critical nature of device fingerprinting accuracy, Why Accuracy is Everything in Device Identification. Hosted by our co-founder/CTO Valentin Vasilyev and our Head of Product Jack Spirou, they sat down to have a candid conversation about device fingerprinting accuracy, how Fingerprint Pro can boast a 99.5% accuracy rate on returning devices, and what it differs from our FingerprintJS open-source browser fingerprinting library. 

In this post, we will recap three big takeaways from the webinar. But first, we will quickly recap our definition of accuracy and where you can find out how we calculate it. 

We define our device identification accuracy by how many returning visitors to a site we successfully identify as a returning visitor and not as a new visitor. A 99.5% accuracy rate means that we correctly identify 995 out of 1000 returning visitors on any given site. Dive into [our technical documentation](https://dev.fingerprint.com/docs/understanding-our-995-accuracy) to understand the calculation in detail.  

### The accuracy between our FingerprintJS Open Source library and the Pro version of our product is different.

This statement is 100% true: Fingerprint Pro has 99.5% accuracy, whereas our open source library’s accuracy is considerably lower. Our [open-source library (called FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)) is one of the most popular repositories on GitHub with 17,000 stars; it's why our company exists today. It is a JavaScript library that combines many browser attributes to generate a [browser fingerprint](https://fingerprint.com/blog/what-is-browser-fingerprinting/). However, the FingerprintJS open-source version is less accurate than the Pro version because it does not include additional server-side identification methods, as well as machine learning processing included in the Pro version. 

In practice, the open-source version might not be able to tell the difference between two devices with identical hardware, using the same browser and operating system, because the signals available to JavaScript to create the fingerprint are all the same. So, the same visitorID could be assigned to multiple devices if visiting the same site from different devices.

Despite the differences in accuracy, we continue to have thousands of websites using our open-source technology to identify devices. However, we find that many of our OSS users convert to Pro when they can demonstrate a business need for additional device identification accuracy. If you're interested in learning the full differences between the two, [be sure to review this comparison PDF](https://try.fingerprint.com/en-us/oss-vs-pro-comparison-pdf).

### Fingerprint Pro has the highest accuracy over time (or lowest identifier drift) compared to competitors.

In the webinar, we showed the chart below and explained its methodology. The main takeaway is that our Pro accuracy remains the highest over time, including months later, whereas our competitors' accuracy starts lower and drops drastically over time. For example, where we maintain 98% accuracy at month four, a competitor may be missing nearly 90% of returning devices. 

We refer to this drop in accuracy as drift. Drift in accuracy is a big issue in device identification because drift has a compounding effect. Every time a visitor returns to your website, there is a percentage chance that they will be misidentified. If your baseline identification accuracy is low, the percentage of correctly identified devices will quickly decay over time as misidentifications compound.

![device identification accuracy drift - fingerprint pro ](https://lh5.googleusercontent.com/OkV-g8VdyvcSMUxs2CsbGRzNeIVpmfr61auuyA3PD821kgf1Ot-kDw-9A7B0Gz4zFLM528FIEIJwXqL-hTY57POq9Wm4uDn3Q_v8eoBOzJqp8yWvtAwwWyg2tM7CDJJXax3MASVXFclSrElf1y8 "device identification accuracy drift - fingerprint pro ")

### High accuracy saves businesses money when it comes to fraud detection, especially when it comes to online payment fraud.

A small percentage of users commit the majority of fraud, often visiting a targeted website multiple times to commit fraud using different login credentials, credit cards, and names. With a lower accuracy device identification alternative, your fraud system could misidentify nearly 90% of devices after four months. This misidentification is a real-world issue caused by the accuracy drift we discussed in the section above. 

With a low accuracy identifier, repeat offenders appear as new visitors over time, allowing them to retarget your site for account takeover attempts, payment fraud schemes, and more. It also makes it difficult to reduce friction for trusted customers, as security checks will challenge them more frequently to ensure your system catches fraudsters in time. We've discussed this topic and how it relates to accuracy [in a prior post](https://fingerprint.com/blog/device-fingerprinting-accuracy/). The main takeaway from the webinar was that if you're relying on a quickly decaying accuracy rate, you're potentially overlooking fraudsters that are repeat offenders to your site.

[Learn more about how Fingerprint Pro can help you combat costly payment fraud.](https://fingerprint.com/payment-fraud/)

### Wrap-Up

If you’re interested in watching the entire conversation, you can do so [here](https://try.fingerprint.com/webinar-recording-device-identification-accuracy). As a little bonus, at the end of the webinar, we shared our [brand new public product roadmap](https://portal.productboard.com/fingerprintjs/1-fingerprintjs-product-roadmap/tabs/1-under-consideration) where you can add, vote, and participate in ideas for future features and improvements.

You can also utilize our [open-source FingerprintJS browser fingerprinting library](https://github.com/fingerprintjs/fingerprintjs/) to get an introduction to what we offer.