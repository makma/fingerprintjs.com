---
templateKey: long-form-content
metadata:
  title: Product Update - November 2021
  url: https://fingerprintjs.com/blog/product-update-11-2021
  image: /img/uploads/product-update.png
  imageAlt: November 2021 product update
  imageTitle: November 2021 product update
  socialImage: /img/uploads/product-update.png
  description: Learn about all the new features and updates for FingerprintJS Pro
    as of November 2021.
featured: true
publishDate: 2021-11-08T17:39:09.786Z
title: Product Update - November 2021
isPublished: true
tags:
  - engineering
  - announcements
authors:
  - Ravi Bhanot
heroImage:
  image: /img/uploads/product-update.png
  imageAlt: November 2021 product update
  imageTitle: November 2021 product update
customCTA:
  openCtaNewTab: true
  title: Have questions?
  description: Ask us anything about getting set up with our new features.
  ctaText: Contact support
  ctaUrl: mailto:support@fingerprintjs.com
---
First and foremost, I’d like to share some amazing news: FingerprintJS has raised [$32M Series B from Craft Ventures!](https://venturebeat.com/2021/11/03/fraud-prevention-platform-fingerprintjs-lands-32m-to-launch-premium-services/)

From a product perspective, the past few months have been very busy and we have some exciting updates for you. You can find our general documentation [here](https://dev.fingerprintjs.com/docs) and if you have any questions, please feel free to reach out to [support@fingerprintjs.com](mailto:support@fingerprintjs.com).

- - -

<br>

# Confidence Score for Identifications

FingerprintJS performs browser identification, which is by nature, probability-based. We recently incorporated a Confidence Score in the API response that reflects our system’s degree of certainty that the visitor identifier is correct. 

The confidence score is a floating-point number between 0 and 1 that represents the probability of accurate identification. The closer the score is to 1, the more sure we are that the visitorID is correct. The closer it is to 0, the more uncertainty we have about the identification results.

The confidence Score requires no additional integration work and should show up in your API response if you are on our JS Agent [v3.5.3](https://dev.fingerprintjs.com/changelog/3-5-3) or later.

### Common Use Case

A common use case of the confidence score is for setting thresholds - for example, if the result is below a certain threshold, 2FA may be invoked for the visitor in question. Alternatively, a captcha or additional challenge can be presented to the visitor in this case. 

![Confidence Score](https://lh6.googleusercontent.com/3zO_EWtitI_ztq4I7Q9s0svljvR5vuGpzjSDCrzTP9qSiGff1a5KRjkF1xB4_afHiQy2t3d9W7Lkhpum_3sUD92b0bJ_mZQ05VzPf64Sil6A5CSSAUbNkI7LuDCwj1N74MNpbavT)

- - -

<br>

### Health and Integration Status

We pride ourselves on the ease of integration with FingerprintJS, but it can be easy to miss a few steps or an update to the most current version of our JS Agent. We made it easier for you to keep tabs of these things on our dashboard. 

### Health Status

The Health Status page is a new dedicated page in the customer dashboard which also has a widget that can be seen on the overview page. The Health Status page lets you know if you are using the most current JS Agent version, as well as if any of your requests are being throttled. 

![Health Status](https://lh4.googleusercontent.com/BGFFNwWdjvpunHC7tQcXcQJzxwWRPSLjrOKgJE0fHGnaYBe6sVsVOoSOQqyOB3vB2t808AlE1zM1T-SmCAFt1pp4wP6iSWN91R8S5MktKW25IaSoPQmbkzNSdcWm3QcG3DuD95Yd)

If you are on an older version, we will highlight this - showing you your current version as well as what the most recent version is.

![](https://lh6.googleusercontent.com/kbSvQ5e1iSLFKcpfoQcabWkbqRvvw5LnCV4vtNurPJptnelDBCbnb3E4PhCLNmIxmO8Wvrl9peJJa2T7QfhJITTBP5_VAnPvJcJxXnlWNcxbrUkaJPFRwvFtujgiJyr-Q4OP9Lzh)

<br>

### Integration Status

We have added an Integration Status check-list that highlights the key steps to get the most from FingerprintJS. We break this down to 4 main steps:

1. [API Calls](https://dev.fingerprintjs.com/docs/quick-start-guide): First and foremost, we want to ensure you are successfully making requests with our JS Agent. When you make your first identification, this step will mark itself as complete, and you’ll start seeing usage data on the overview page.
2. [Subdomain Integration](https://dev.fingerprintjs.com/docs/subdomain-integration): We highly recommend utilizing our subdomain integration which has a few benefits:

* Significant increase to accuracy on Safari
* Cookies are now recognized as “first-party” which means they can live longer in the browser and extend the lifetime of visitorIds
* Ad blockers will not block our JS Agent from loading
* FingerprintJS becomes harder to detect by automated blockers and fraudsters

3. [Request Filtering](https://dev.fingerprintjs.com/docs/request-filtering): You can filter out unwanted visitor identifications using the request filtering rules by either whitelisting or blacklisting websites that use your application token.
4. [Webhooks](https://dev.fingerprintjs.com/docs/webhooks): Utilize server-to-server network communication to request your application’s API when an event occurs. This allows you to be notified immediately when an event occurs on your application.

![Integration Status](https://lh5.googleusercontent.com/XrzMI1uUj7LYRGDS9zcVoyJ6lS9GGrTz14BOy7Y7ut1oShuqVycYE-t_EzP24PP1H_91WWeq2ap1DPByAmSLzjSxYtPkWwM-QyoE8132ZgSRPpqGGaX03CIl947-fqN1zygraL8Y)

- - -

<br>

## User Management

You now have the ability to invite users to your FingerprintJS subscription directly from our UI by navigating to the “wheel” at the top right corner and selecting “Settings”. Under the “User Management” section you can click on the “Add User” button to invite users to your subscription. We currently have three roles - Owner (ability to create/delete users and make changes to your subscription), Member (ability to make changes to your subscription), and Read-only. We will be adding additional access controls in the very near future.

![User management](https://lh4.googleusercontent.com/YPdalOz7QEEUp6jdTUMk7e1KQAxW9IVdMTfSsx8r6TvcORKkGVAZrUdpHIh6K0sIqVVxNNdYTzbRNtRxX-n3v-Mh34sbn-hmiNQo0_OG375VvlC0PCsUGVI30mss_kKAeobZ4uR3)

- - -

<br>

## Wildcard Support for Request Filtering

The request filtering section of the customer dashboard now allows you to use a wildcard symbol ("*") instead of listing out each individual subdomain. See below for the appropriate syntax. For more information about request filtering, please reference our [documentation](https://dev.fingerprintjs.com/docs/request-filtering).

![Request filtering](https://lh4.googleusercontent.com/A56r7Y_JRltbo3zNwd8lgpzaX-z4SfN23whDXRpgBy3I1EBEFbhqbruwYG9rSxcDN8LcC3ePxU2J6oFxOQ8hIjfvcZPgb3OmVfji0plkiUiftSuZbwZ8JqXat7ldLPo-WQIBApiz)

- - -

<br>

## Additional Updates

We have a ton of exciting updates in store for the coming months, including improvements to our JS Agent upgrade process, adding SSO, adding additional signals, improving identifications and updating our subdomain integration (just to name a few).

Our team is looking forward to the coming improvements that will benefit your experience with utilizing FingerprintJS. Thank you for being a part of our journey - we truly appreciate our partnership!