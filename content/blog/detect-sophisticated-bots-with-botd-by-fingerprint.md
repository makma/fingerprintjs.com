---
templateKey: long-form-content
metadata:
  title: Detect sophisticated bots with BotD by Fingerprint
  description: Read our recap on the BotD Webinar hosted by Co-Founder/CTO
    Valentin Vasilyev and Head of Product Jack Spirou. Learn the challenges
    sophisticated bots pose on the traditional means of bot detection and how
    our product is the future of fraud prevention.
  url: fingerprint.com/blog/botd-webinar-recap-bot-detection
  image: /img/uploads/botd-product-webinar-recap.jpg
  socialImage: /img/uploads/botd-product-webinar-recap.jpg
  imageAlt: BotD Image
  imageTitle: BotD Image
featured: true
publishDate: 2022-11-10T18:08:53.789Z
title: Detect sophisticated bots with BotD by Fingerprint
isPublished: true
isHidden: false
tags:
  - bot attacks
authors:
  - Kevin Roy
heroImage:
  image: /img/uploads/botd-product-webinar-recap.jpg
  imageAlt: BotD Image
  imageTitle: BotD Image
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
Last week, we hosted a webinar highlighting our new product BotD. Hosted by our Co-Founder/CTO Valentin Vasilyev and Head of Product Jack Spirou, both sat down to discuss the landscape surrounding sophisticated bots, their negative impacts, and what Fingerprint is doing to remedy the problem. Let’s walk through some of the biggest takeaways from the webinar and how you can get started using BotD. 



## Sophisticated bots pose the most significant challenge 

[Almost half](https://www.cpomagazine.com/cyber-security/bad-bot-traffic-report-almost-half-of-all-2021-internet-traffic-was-not-human/) of all internet traffic in 2021 was non-human and while there are many different types of bots that make up this number, from good bots like crawlers and editors to malicious ones like headless browsers and scrapers, some are more sophisticated. For more information on bots in general, check out our [guide on bot detection](https://fingerprint.com/blog/what-are-bots-how-to-detect-bots/). Sophisticated bots attempt to replicate human activity to evade detection and appear like normal human behavior. They do this in several ways: 

#### Automating popular browsers. 

Sophisticated bots will automate browsers like Google Chrome and Firefox that look exactly like human activity, and telling them apart from humans is increasingly difficult. Additionally, they won’t overflow your system with requests as some simpler bots might. 

#### Not reusing IP addresses. 

Sophisticated bots will pull IP addresses from a pool and use them for one session (around 30 minutes) before discarding the IP address and selecting a new one. 

#### Mimicking human behavior. 

To replicate human activity, sophisticated bots will pause between requests for seconds at a time. 



## Traditional means of bot detection don’t catch everything

If you have an API endpoint or web application, you would typically use a [web application firewall](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) (WAF) which works by using rule sets. These rules include IP address ranges, HTTP headers, and more. These rule sets are often manually created or provided by a third party like AWS (Amazon Web Services). 

In the diagram below, a human visitor is let through as they won’t cause any of the rules in the ruleset to go off and prevent them from entering the website. A simple bot might be stopped because it uses a known IP address from a reputation list or the HTTP header matches one of the rules. However, with the sophisticated bot, you can see its passing through the WAF undetected because it utilizes the same agent to access a system as a human would, like Google Chrome or a residential IP. 

![](https://lh4.googleusercontent.com/ezHhcQB17F5cVmAmJGgHSuxqS3rDH-x0If5GHTw7qGKYjKhaHVblPmcWkDS2Hws7IHopXiaCIEPmWf5F3vueIAEnltfXGdZX8-PJ7_Yd1oAC8QwTikcARQznW5O1AMnWF9klSYrlKlh23cIkz0NY6V0zSSiNSGf78qKNLgXcqMrbMABZwUcBFFEf3-Ap3Q)

## Designed to work with a WAF 

BotD does not block bots on its own. BotD should be integrated with a web application firewall to update those rule sets to detect a sophisticated bot and leverage your existing tech stack to block those bots. You can think of BotD as another layer of security to add to legacy detection methods, as we provide a higher level of protection with sophisticated bots.  

### Wrap Up 

If you’re interested in watching the BotD overview, you can do so [here](https://youtu.be/wok4zbepmZ0). 

<iframe width="560" height="315" src="https://www.youtube.com/embed/wok4zbepmZ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>