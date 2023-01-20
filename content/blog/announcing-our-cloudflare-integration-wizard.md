---
templateKey: long-form-content
metadata:
  title: "Announcing our Cloudflare Integration Wizard "
  socialImage: /img/uploads/cloudflare-wizard-release-blog-.png
  image: /img/uploads/cloudflare-wizard-release-blog-.png
  url: https://fingerprint.com/blog/cloudflare-integration-wizard-announcement
  imageAlt: cloudflare integration wizard
  imageTitle: cloudflare integration wizard
  description: We recently released an integration with Cloudflare and have an
    exciting new update that makes it incredibly easy to set up and implement
    the integration. Let's highlight what’s possible with Fingerprint’s
    Cloudflare integration.
featured: true
publishDate: 2022-09-23T22:30:38.922Z
title: "Announcing our Cloudflare Integration Wizard "
isPublished: true
isHidden: false
tags:
  - announcements
authors:
  - Kevin Roy
heroImage:
  image: /img/uploads/cloudflare-wizard-release-blog-.png
  imageAlt: cloudflare integration wizard
  imageTitle: cloudflare integration wizard
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
We recently released an integration with Cloudflare and have an exciting new update that makes it incredibly easy to set up and implement the integration. But before we go into detail about our new Cloudflare Integration Wizard, we want to highlight what’s possible with Fingerprint’s Cloudflare integration. 

## What is Cloudflare? 

[Cloudflare](https://www.cloudflare.com/learning/what-is-cloudflare/) is an internet infrastructure provider that offers solutions to enhance security, reliability, speed, and web applications. Cloudflare powers businesses, non-profits, bloggers, and more with data centers in more than 256 cities fulfilling up to 36 million HTTP requests per second. 

## How does the Fingerprint’s integration with Cloudflare work? 

Our Cloudflare integration allows Fingerprint customers to generate a browser fingerprint even when ad blockers are present, ensuring our Fingerprint script and request are not blocked. 

Before the integration, an API request would go through the default Fingerprint endpoint (<https://api.fpjs.io>), and JavaScript source code would be downloaded from our domain. Ad blockers could potentially see the Fingerprint URL and block it, preventing fingerprinting by either blocking Fingerprint’s JavaScript or the request itself. 

Now, with the Cloudflare integration, the API request goes through the user’s domain and where the JavaScript source code is downloaded. Because of this change, ad blockers don’t see an external URL, and fingerprinting is not blocked. 

## What are the benefits of using the integration? 

With the threat of ad blockers preventing a fingerprint from being generated now removed, Fingerprint users utilizing the Cloudflare integration receive a host of benefits:

* Significant increase in accuracy in browsers with strict privacy features such as Safari or Firefox.
* Cookies are now recognized as “first-party,” which means they can live longer in the browser and extend the lifetime of visitorIds.
* Ad blockers will not block our Fingerprint Pro JS agent from loading. However, most ad blockers will stop attempts to connect to an external URL, while attempts to connect to the same site URL will be allowed.
* Ad blockers will not block our identification requests since they are sent to the specific path or subdomain that belongs to the same site.
* Insight and control over the identification requests can be combined with other Cloudflare features like WAF or Analytics.
* You can manage unlimited subdomains and paths to provide Fingerprint Pro services to all your customers at any scale while benefiting from all the 1st-party integration improvements.

## Cloudflare Integration Wizard

![fingerprint pro cloudflare integration start page](/img/uploads/screen-shot-2022-09-15-at-11.38.01-1-.png "fingerprint pro cloudflare integration start pagefingerprint pro cloudflare integration start page")

The new Cloudflare Integration Wizard makes setting up the integration seamless and quick. In addition, it is an optional step completed in new customer onboarding where previously, Fingerprint support was needed to engage the integration.

The Cloudflare Integration Wizard is for new Fingerprint customers and is available during the onboarding process. However, if you are an existing customer who would like to use Cloudflare integration, you can [contact support](https://fingerprint.com/support/) to get set up. Additional information can be found in our docs [here](https://dev.fingerprint.com/docs/cloudflare-integration). 

## Want more information on Fingerprint? 

* Curious if one of our products fits your use case? Check out our use case demos [here](https://fingerprint.com/use-cases/). 
* Learn more about our other integrations [here](https://dev.fingerprint.com/docs). 
* To speak with our sales team about how Fingerprint Pro can help your business, click [here](https://fingerprintjs.com/contact-sales/).