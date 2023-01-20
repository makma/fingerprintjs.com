---
templateKey: long-form-content
metadata:
  title: Device Fingerprinting For Android Developers
  description: Device identification is essential to a mobile developer's toolkit
    for detecting and preventing fraud. Device fingerprinting is a powerful tool
    for Android developers to identify their users accurately. Learn how to use
    the Fingerprint Android library to future-proof your application security.
  url: https://fingerprint.com/blog/device-fingerprinting-android
  image: /img/uploads/4.png
  imageAlt: Android device fingerprinting
  imageTitle: Android device fingerprinting
featured: true
publishDate: 2020-12-08T16:18
title: "Life after ANDROID_ID: Android Identification via Device Fingerprinting"
isPublished: true
isHidden: false
tags:
  - java
  - fingerprinting
  - android
authors:
  - Savannah Copland
heroImage:
  image: /img/uploads/4.png
  imageAlt: Device Fingerprinting For Android
  imageTitle: Device Fingerprinting For Android
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
**Last week, our team launched [Fingerprint Android](https://github.com/fingerprintjs/fingerprintjs-android), an open-source library for accurately identifying Android devices using all available signals.** 

In this article, we explain some of the current challenges of Android device identification and how device fingerprinting can be a stable and reliable alternative to system-generated identifiers like ANDROID_ID that are likely to be discontinued.

## Why Device Identification Matters

Device identification is essential to a mobile developer's toolkit for detecting and preventing fraud.

An accurate and persistent device ID can flag users most likely to commit fraud and mitigate fraudulent attempts by incorporating authentication flows or blocking users based on their usage history. From download to login to payment, the number of ways a malicious actor can commit fraud is ever-increasing. Depending on your application, the most lucrative forms of fraud will vary.

Android developers had it easy in the past, with access to several system-provided identifiers, including hardware signals and the system-generated Android ID (or SSAID). However, many of these signals are now unavailable to app developers, with more expected to be removed, restricted, or require opt-in permissions from users in coming updates. Additionally, remaining identification methods, including SSAID, are easy for dedicated fraudsters to spoof, providing little protection against sophisticated fraud attacks.

## At-Risk Android Device Identification Methods

There have historically been three main ways to identify a device in Android without device fingerprinting.

These methods share a common theme: they are ineffective for some use cases today or are likely to be discontinued soon. Therefore, android developers need to find alternative ways to identify users before these options are no longer available.

#### 1. Use hardware identifiers (MAC address, IMEI, IMSI, etc.)

Android provides access to hardware identifiers such as MAC address, IMEI, and others. But due to privacy changes for Android 10, access has been restricted. So now, every app that needs to use these identifiers must go through a comprehensive review process for the Play Market.

**Pros and Cons:**

* It's the most durable option. It survives both app reinstallation and factory reset.
* Unavailable for most applications on the latest versions of Android.

#### 2. Generate a file with UUID on the first launch of an app

Like browser cookies, this method generates a unique ID and stores it on the Android device. But, as with cookies, this file can be cleared by the user, in this case, by uninstalling the app.

**Pros and Cons:**

* It is simple and stable.
* UUID is considered the recommended identification method for most non-fraud use cases, but UUIDs are unlikely to be restricted.
* It does not persist after application reinstallation.

#### 3. The system provided identifiers, such as ANDROID_ID or Google Service Framework ID

Android provides a few IDs for advertisement or fraud prevention cases.

* The most popular identifier is ANDROID_ID, but Google likely intends to replace it with AdvertisingId.
* Another unique identifier is the Google Service Framework ID (GSF ID). Currently, there is no official documentation about its use for device identification, so it is also at risk of becoming unavailable in future updates.

**Pros and Cons:**

* Stable: both survive app reinstallation, but not factory reset.
* Uncertain access: Google could restrict access in the future.
* Easy to spoof: the Xposed framework allows you to copy these identifiers right out of the box by installing it on a rooted device.

## Device Fingerprinting

Fingerprinting techniques have already become an essential tool for identifying devices. For example, used by over 8,000 websites, our open-source [browser fingerprinting library](https://github.com/fingerprintjs/fingerprintjs) has over 17K stars on Github. Fingerprinting techniques can be more than 90% accurate (Our Pro version is 99.5% accurate) in correctly identifying a unique user in the browser. Usage history, fuzzy matching, and probability engines could further improve overall accuracy rates.

One of the main advantages of device fingerprinting is that it is stateless. A well-implemented fingerprint can remain stable through multiple sessions, incognito browsing, uninstalling or reinstalling apps, or clearing cookies.

While browser fingerprinting has approached ubiquity in recent years, the best-kept secret in fingerprinting technology is its potential for applications beyond the browser. Mobile device fingerprinting allows app developers to identify users applying more sources of entropy than is available inside the browser. 

A few of the available sources:

* Hardware (device details, model, CPU, memory, sensors, etc.)
* OS properties (version, build name, build number, etc.)
* Device settings (the information about some settings of the device)
* Installed applications

A combination of these signals is unique for most devices and used for device identification. Most importantly, it is much harder to circumvent, as it is difficult to spoof all available signals. Because of this, device fingerprinting is a good option for fraud detection applications.

**Pros and Cons:**

* Good uniqueness and stability.
* It is much harder to spoof.
* It can change over time due to device updates.

## How the library works

The [Fingerprint Android library](https://github.com/fingerprintjs/fingerprintjs-android) combines the abovementioned techniques to provide two stable and unique identifiers.

The first identifier provided is the DeviceID, which relies on GSF ID and ANDROID ID. They are stable, but it is possible to spoof them with the Xposed framework (as mentioned above).

For instances where you want to mitigate the risk of users spoofing their DeviceID, the library also generates a Device Fingerprint. Our fingerprinting process collects over 50 platform signals and calculates a unique hash for each user. You can easily see the collected signals and the resulting Device Fingerprint in our playground app.

The library aims to generate a Device Fingerprint with the best balance of stability and uniqueness. As such, the default Device Fingerprint hash omits installed application signals. Application signals are not stable because users can install or uninstall applications. But these signals are helpful when you need a highly unique fingerprint, as users rarely have the same set of installed applications.

Hardware signals, on the other hand, remain the same even after a factory reset and so are highly stable and contribute to an incremental increase in uniqueness. As such, we include hardware signals in our recommended Device Fingerprint configuration.

The advantage of using our [Android Fingerprint library](https://github.com/fingerprintjs/fingerprintjs-android) is that our team and the open-source community will further improve the stability and uniqueness of the recommended DeviceID over time. However, the library is flexible and allows developers to change the platform signals if needed manually.

## Why You Should Use Our Android Fingerprint Library

The device identification process is already complicated and will likely become much more complicated in the future, as with iOS and IFDA, Apple's advertising identifier.

To apply IFDA as an identifier, the user must explicitly opt-in to tracking permissions for advertising purposes. At the same time, a common trend for increasing user privacy across many platforms makes fraud prevention with these identifiers unreliable. Therefore, our library does not require additional permissions and will be kept up-to-date with Android's policies to guarantee that users can be identified with high accuracy as rules change.

Our Android Fingerprint library provides a stable Device Fingerprint generated using all available platform signals. Using the library allows developers to consistently get a reliable device ID regardless of accessibility and stability changes over time.

The library is in Kotlin – a modern and safe language that helps ensure the library does not crash. It also does not require transitive dependencies (except kotlin-stdlib for Java-only projects). The integration needs only a few lines to add the dependency. Finally, it provides convenient forward and backward compatibility without unexpected fingerprint changes during updates.

## Get Involved

We are excited to see what the open-source community will build with our Android Fingerprint library.

* Star, follow or fork our [Github project](https://github.com/fingerprintjs/fingerprint-android).
* [Email us](mailto:sales@fingerprint.com) your questions
* Is your company interested in further device fingerprint accuracy and stability? We would love to hear from you - reach out to [sales@fingerprint.com](mailto:sales@fingerprint.com).
* Need browser fingerprinting as well? Check out our open-source library, or create a free account to use our [Browser Fingerprinting API](https://fingerprint.com/), Fingerprint Pro, for 99.5% fingerprinting accuracy.