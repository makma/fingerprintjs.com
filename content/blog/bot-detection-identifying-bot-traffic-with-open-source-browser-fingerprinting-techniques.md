---
templateKey: long-form-content
metadata:
  title: Bot Detection Using Browser Fingerprinting - Fingerprint BotD
  description: Learn the most common bot detection techniques, and learn to
    implement bot detection and threat mitigation using browser fingerprinting
    techniques.
  url: https://fingerprint.com/blog/bot-detection/
  image: /img/uploads/bot-detection.png
  imageAlt: Bot detection radar
  imageTitle: Bot detection radar
featured: true
publishDate: 2021-06-03T17:12:58.481Z
title: "Bot Detection: Identifying Bot Traffic with Open-source Browser
  Fingerprinting Techniques"
isPublished: true
isHidden: false
tags:
  - bot attacks
  - account takeover
  - payment fraud
  - fingerprinting
authors:
  - Karl Hughes
heroImage:
  image: /img/uploads/bot-detection.png
  imageAlt: Bot detection radar
  imageTitle: Bot detection radar
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
In 2020, **[more than one-third](https://ppcprotect.com/how-many-of-the-internets-users-are-robots/) of internet traffic was bot traffic**. Some of these bots serve a practical purpose as search engine crawlers, uptime monitors, and podcast feed fetchers. Others attempt to impersonate real users, steal data, or fill your website's comments with spam.

Unfortunately, bot detection is challenging because these malicious bots are good at impersonating legitimate users.

> "Sophisticated bots look and act like humans when they visit websites, click on ads, fill out forms, take over accounts, and commit payment fraud...causing billions of dollars in losses to companies and impacting the customer experience." - [Dan Lowden](https://www.techradar.com/news/sophisticated-bots-pose-a-massive-threat), CMO at White Ops

On top of that, [browsers have added privacy measures](/blog/browser-fingerprinting-privacy/?&utm_source=blog&utm_medium=website&utm_campaign=blog) that make it harder for programmers to identify real traffic from bot traffic consistently. Fortunately, some proven methods exist to stand up to bots in your web application.

In this article, I'll introduce a few standard bot detection techniques and show you how to implement bot detection and threat mitigation using [Fingerprint BotD](https://fingerprint.com/products/bot-detection/?&utm_source=blog&utm_medium=website&utm_campaign=blog), one of the most robust open-source fingerprinting libraries.



## Bot Detection Techniques

Good bots will [declare themselves in the User-Agent HTTP header](https://websiteadvantage.com.au/Request-HTTP-Header-Info) so that you can filter them out of your logs. Unfortunately, malicious bots aren't easy to spot. If not detected and deterred, bad bots can fill your access logs, scrape proprietary data from your site, steal from your users, and bog down your servers. There are a few ways you can detect bots that might intend to abuse your web application, though:

* Usage abnormalities like quick navigation or form completion are often an indicator of bot traffic.
* IP address blocklists can block all traffic from servers or geographies where bad bots are more likely to originate.
* Suspicious URL requests such as users randomly trying paths on your site to find unsecured login or admin pages might indicate a bot.
* Machine learning models can detect likely bots based on other known bot traffic.
* Fingerprinting allows you to track known users (even without cookies) and implement deterrents to bots without a known fingerprint. Fingerprinting can also help you spot many requests from a single bot attempting to obscure its IP address or origin.

Bots are getting [much more sophisticated](https://datadome.co/bot-management-protection/bot-detection-how-to-identify-bot-traffic-to-your-website/), so you'll likely have to use more than one of these techniques, especially if your company is a high-value target like a financial institution, payment processor, or large enterprise.

## Detecting Bot Traffic with Fingerprint

While it's worth learning about all the above bot detection methods (and probably others), I will focus on fingerprinting for the remainder of this article. [Browser fingerprinting](/blog/what-is-browser-fingerprinting/?&utm_source=blog&utm_medium=website&utm_campaign=blog) uses hardware details, browser extensions, WebGL behavior, [and many other factors](/blog/browser-fingerprinting-techniques/?&utm_source=blog&utm_medium=website&utm_campaign=blog) to generate a unique visitor ID for each user on your site.

When a user signs up or confirms their email address, you can use a library like  [Fingerprint](/) to create and associate this visitor ID with the user. Then, when someone comes back to your site and attempts to log in, you can block the attempt or force them to perform a second authentication factor if their fingerprint doesn't match the one known to this user.

In this article, I'll show you how to use Fingerprint in a [ReactJS](https://reactjs.org/) web application to fingerprint your users. Then, I'll show you how to create a script that detects likely bots using a [custom React hook](https://reactjs.org/docs/hooks-custom.html). Using this detection method, you can force bots to perform extra verification like captchas or two-factor authentication.\
You can follow each step along the way [or get the finished code on GitHub](https://github.com/karllhughes/fingerprintjs-bot-detection). While I won't go into detail on all the server-side code you might need to implement; I will give you a starting point for implementing bot detection using client-side fingerprinting.

### Setting up the Project

Assuming you have [NodeJS](https://nodejs.org/en/) installed, create a new React application by running the following in your terminal:

```shell
npx create-react-app bot-detection  
```

Inside your React application's root directory, run the following command to install [Fingerprint from npm](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs):

```shell
npm i @fingerprintjs/fingerprintjs
```

### Getting a User's Fingerprint

You're ready to collect your first fingerprint with your React application and Fingerprint installed.

First, import `FingerprintJS` and React's `useEffect` and `useState` in your `src/App.js` file:

```javascript
import {useEffect, useState} from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
...
```

Next, add a new [Effect Hook](https://reactjs.org/docs/hooks-effect.html) that calls the Fingerprint library's `load()` method. This will retrieve an agent instance for the current user, so when you call `get()`, you'll be able to log the current user's fingerprint to your console.

In order to display the `visitorId` that Fingerprint generates, you can also add a [State Hook](https://reactjs.org/docs/hooks-state.html):

```javascript
...
    const [visitorId, setVisitorId] = useState(null);
    
    useEffect(() => {
        (async () => {
            const agent = await FingerprintJS.load();
            const fingerprint = await agent.get();
            setVisitorId(fingerprint.visitorId);
            console.log(fingerprint);
        })();
    }, []);
...
```

Finally, define the `return` statement so that your application shows the user their visitor ID:

```javascript
...
    return (
        <div className="App">
            <h1>Welcome!</h1>
            {visitorId ? (
                <p>Your visitor ID is <br/>{ visitorId }</p>
            ) : (
                <p>We are currently detecting your browser's fingerprint.</p>
            )}
        </div>
    );
...
```

In the real world, it wouldn't be useful to show this ID to visitors, but you'll need it in the next section for detecting bot traffic.

To test this portion of the tutorial out, run `npm start` from your terminal and visit `localhost:3000`. Your fingerprint will be different from mine, but you should see something like this:

![Showing a user's fingerprint in the console](/img/uploads/ebevt8z.png)

The `fingerprint` variable that you logged to the console contains dozens of components to create your unique visitor ID. These components help block bots. You might find that specific combinations of values tend to indicate bot traffic.

This approach requires a lot of data or existing knowledge of the specific bots you're trying to prevent. Another method (which I'll show you below) uses the unique `visitorId` to detect when a visitor attempts to use a known username with a new browser fingerprint.

### Detecting and Mitigating Bot Traffic Based on Fingerprint

Bots often run on shared accounts to scrape data or brute force attacks on login pages. For example, an attacker might buy a license to your software and then run a bot that downloads and resells this information to others. In that case, the attacker's bot will likely have a different fingerprint than the legitimate user who logged in, so you can check usernames against known fingerprints to slow this kind of attack down.

First, you need a list of usernames and visitor IDs from your fingerprint in the previous section. In production, you’ll use an API to store this data on the server, but for demonstration purposes, just add an object to the top of your `src/App.js` file:

```
const users = {
    // Replace one of these with your actual visitor ID for testing purposes
    'karl': '8c20fbeb78deaf5ad84080cfa48c0dd8',
    'john': 'e4105e5a4b313300a6776f41740dd0cc',
    'mike': 'e87855e1bc64d3bfa9300ed97d2c47e9',
};
...
```

Next, create a function to check a username against their last known visitor ID from Fingerprint, and add a piece of state to indicate whether the username and visitor ID combination is valid or not:

```
...
    const [valid, setValid] = useState(null);

    const checkUserId = (e) => {
        if (e.target.value && users[e.target.value]) {
            setValid(users[e.target.value] === visitorId);
        } else {
            setValid(null);
        }
    }
...
```

Finally, update the `return` function. Here I’ve included an input form for users to enter their username and a message to let them know whether that username matches our known visitor ID from their fingerprint:

```
...
    return (
        <div className="App">
            <h1>Welcome!</h1>
            <label>Enter your username</label><br/>
            <input type="text" name="username" onChange={checkUserId}/>
            {valid === true ? (
                <p>Your username matches your visitor ID!</p>
            ) : valid === false ? (
                <p>Your username <strong>does not</strong> match your visitor ID. We'll need additional verification.</p>
            ) : (
                <p>Enter your username to check your fingerprint.</p>
            )}
        </div>
    );
…
```

Refresh or restart your React application. Now, when you enter a username that does not match your current fingerprint, you’ll see an error message:

![Your fingerprint does not match this username](/img/uploads/rl96ebq.png)

On the other hand, when your username **does** match the known visitor ID, you will see a success message:

![Your fingerprint does match this username](/img/uploads/gfcmq4o.png "Your fingerprint does match this username")

This way, you can use a browser fingerprint to help you identify and mitigate bot traffic. While this method alone won't stop all kinds of bots, it's one piece that will improve your application's ability to stand up to malicious bots.

## Bot Detection is a Never-Ending Challenge

As attackers improve their techniques to create more sophisticated bots, software engineers must continue updating their software to keep up. While it's possible to build some of this in-house, leaning on proven, thoroughly-tested libraries like[Fingerprint](/) will save you a lot of time.

In addition to the free, open-source library, [Fingerprint has a pro version](/) that includes [bot detection](https://fingerprint.com/blog/bot-detection/), advanced browser fingerprinting, and anonymous user identification. As a result, the job as an application developer becomes even easier because you can lean on Fingerprint's expertise rather than keeping up with the changing bot detection landscape.