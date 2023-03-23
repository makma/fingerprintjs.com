---
templateKey: long-form-content
metadata:
  title: What is letterboxing, and can it prevent browser fingerprinting?
  url: fingerprint.com/blog/can-letterboxing-prevent-browser-fingerprinting
  description: Letterboxing forces your browser window dimensions to multiples of
    100 or 50 pixels and fills the extra space with gray bars on the sides of
    the page. Learn how letterboxing works and if letterboxing can truly prevent
    browser fingerprinting.
  imageAlt: letterboxing
  imageTitle: letterboxing
  image: /img/uploads/anti-fingerprinting-technique_-letterboxing.jpg
  socialImage: /img/uploads/anti-fingerprinting-technique_-letterboxing.jpg
featured: true
publishDate: 2023-03-21T14:17:28.594Z
title: What is letterboxing, and can it prevent browser fingerprinting?
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Juraj Uhlar
heroImage:
  imageAlt: letterboxing
  imageTitle: letterboxing
  image: /img/uploads/anti-fingerprinting-technique_-letterboxing.jpg
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?utm_source=blog&utm_medium=website&utm_campaign=blog
---
Letterboxing is a browser feature that adds gray bars around the web view to hide your browser dimensions. It has been available in [Tor since 2015](https://gitlab.torproject.org/legacy/trac/-/issues/14429) and [made its way to Firefox](https://www.zdnet.com/article/firefox-to-add-tor-browser-anti-fingerprinting-technique-called-letterboxing/) in [2019](https://bugzilla.mozilla.org/show_bug.cgi?id=1407366). As users become more concerned about advertisers tracking their browsing habits, browsers are [adopting more privacy features](https://fingerprint.com/blog/browser-fingerprinting-privacy/?utm_source=blog&utm_medium=website&utm_campaign=blog) and anti-fingerprinting techniques, including letterboxing. 

This article will explain how letterboxing works, how to enable it, what your window size reveals about you, and whether hiding it can prevent fingerprinting.

## What is browser fingerprinting?

[Browser fingerprinting](https://fingerprint.com/blog/browser-fingerprinting-techniques?utm_source=blog&utm_medium=website&utm_campaign=blog) is a technique used to identify visitors online by gathering information about their browser configuration. This can include screen resolution, operating system, browser version, installed fonts, plugins, and more. While not identifying on their own, when multiple signals are combined, they create a unique and stable “fingerprint” of the browser.

A browser fingerprint is an alternative to identifying returning visitors with [cookies](https://fingerprint.com/blog/cookieless-future-for-developers/?utm_source=blog&utm_medium=website&utm_campaign=blog) (which can be deleted or hidden via incognito mode) or their IP address (which is not unique and can be [changed using a VPN](https://fingerprint.com/blog/why-vpns-are-ineffective-against-browser-fingerprinting/?utm_source=blog&utm_medium=website&utm_campaign=blog)). While concerning privacy-minded users, the technique is widely used today to [detect fraud](https://fingerprint.com/blog/ecommerce-fraud-types/?utm_source=blog&utm_medium=website&utm_campaign=blog) and protect users from [account takeover](https://fingerprint.com/blog/prevent-account-takeover-in-banks-and-fintech/?utm_source=blog&utm_medium=website&utm_campaign=blog).

You can visit [Am I Unique](https://amiunique.org/fp) to see how each browser attribute distinguishes you from everyone else in their dataset. Browser dimensions are a few of the many public browser attributes useful for fingerprinting.

![](https://lh5.googleusercontent.com/0lEq_bcwI8h8_Homy-cTZc8DH7MKrXtipRk2x7fOffnTe8f6fOnKv5YyXkydRZViUJS76OqJea2SLsRMCxsnj08m1YyQfAZOfnSt9aEJH7VDHryd_9Q1bRSEj3WXx1o9m-7zoIwc-NwcMggeCKi2NKg)*My Am I Unique statistics show that I share my screen resolution with about 22% of their dataset. However, less than 0.6% of their visitors have the same available screen height. If you are interested in how all of these signals are gathered using JavaScript, look at [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs) — our leading open-source browser fingerprinting library.*

## How does letterboxing work?

To correctly render a webpage, your browser needs to know your window size. However, it doesn’t need to know the exact size. Letterboxing forces your browser window dimensions to be multiples of 100 or 50 pixels and fills the extra space with gray bars on the sides of the page. This makes your browser window size more common, such as 1200px x 900px, instead of exposing a more specific window size like 1231px by 895px, placing you into a large group of people with similar-sized browsers instead of singling you out.

The name “letterboxing” originates from [the film industry practice](https://en.wikipedia.org/wiki/Letterboxing_(filming)) of transferring movies shot in widescreen to standard-width video formats by adding black bars to the top and bottom, which are shaped like letter boxes on doors.

You can see letterboxing in action in comparison to a regular browser in this video:

<iframe style="aspect-ratio: 16 / 9; border-radius: 8px; width: 100%;" src="https://www.youtube.com/embed/tMJlB4JtCUw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Aside from the gray bars, [the demo](https://www.jurajuhlar.eu/letterbox) shows two differences:

* Chrome reports the actual window dimensions exactly. Firefox window height and width are always multiples of 100 or 50 pixels.
* Chrome reports the real screen size of 1920px x 1080px and the real available screen size. Firefox replaces the true values with letterboxed window dimensions, hiding both your physical screen resolution and the available screen resolution. Even if you put Firefox into fullscreen mode, it will only reveal 1800px x 1000px, not 1920px x 1080px.

The gray bars take some time to get used to. [While](https://www.reddit.com/r/TOR/comments/ep6bb2/does_anyone_know_why_im_getting_these_white_bars/) [not](https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/32311) [everyone](https://forum.torproject.net/t/border-around-websites/1812) [is](https://forum.torproject.net/t/letterboxing-on-tor-browser-for-desktop/967) [keen](https://tor.stackexchange.com/questions/20691/how-can-i-disable-the-grey-border) [on](https://www.reddit.com/r/TOR/comments/115423c/hi_everyone_i_just_upgraded_how_can_i_get_rid_of/) [making](https://www.reddit.com/r/TOR/comments/xjhnj1/how_can_i_get_rid_of_these_huge_white_bars/) [their](https://www.reddit.com/r/TOR/comments/xcgace/how_do_i_remove_the_white_bars_on_the_sides_and/) [browser](https://www.reddit.com/r/TOR/comments/li97mu/why_does_my_tor_have_these_bars_at_the_bottom_and/) [look](https://www.reddit.com/r/TOR/comments/kwib6t/aspect_ratio_problem_why_are_there_white_bars_i/) [like](https://www.reddit.com/r/TOR/comments/hwuiou/what_is_this_white_bar_at_the_bottom_of_tor_and/) [an old TV](https://tor.stackexchange.com/questions/20712/page-doesnt-fill-window-in-tor-browser), many people are happy to take them. As usual, there is a trade-off between better privacy and a worse user experience.

### How can you turn letterboxing on?

To turn on letterboxing in Firefox, go to about:config, create a new setting privacy.resistFingerprinting.letterboxing, and set it to true.

In Tor Browser, letterboxing is enabled by default.

## Is the window and screen size useful for fingerprinting signals anyway?

The usefulness of a fingerprinting signal depends on two dimensions:

* **Stability** — how infrequently the value changes.
* **Entropy** — how unique the value is.

Screen size, available screen size, and window size differ in these dimensions:

* **Screen size** is stable (people rarely change screens) and has moderate entropy.Many people will share a common value like a 1080p resolution. This is not a problem, as the added entropy still helps identify browsers when combined with other attributes.
* **Window size** is the opposite.The dimensions of a randomly resized browser window are much more unique than those of the screen size. However, stability is low and depends on user behavior.ome users don’t resize their browsers, while others do it frequently.
* **Available screen size** is screen size minus the operating system UI elements like a dock or a toolbar. It sits somewhere in between the other dimensions on our usefulness chart. It has [more possible values](https://old.reddit.com/r/TOR/comments/ebwcte/does_changing_the_window_size_still_reduce_my/) than screen size but is also less stable, and the opposite compared to window size.

![](https://lh3.googleusercontent.com/IUd5sX0bTK8MNVsSALYHDtJCpIz7VWbzaDkLZwYmSTra3ESpKvFW0wtxhQ9p24brvCwu9g_nE5EYi4wrtUjiBvgtwECimi6-N21e21jDYPJquCNncyeCf4JtAGdhZc4IStTv7zRo6NR4Mx9O9pbpm4c)

*Note: We are applying terms like “common” and “stable” for comparisons intentionally and loosely here. These dimensions are hard to quantify generally, and the results heavily depend on the dataset you use. Your screen size might be unique in a pool of visitors on a niche website but not unique at all in a larger population of people who saw a particular ad.*

Screen size and available screen size are often used as fingerprinting signals. Spoofing them can reduce the accuracy of naive fingerprinting tools. However, the window size is impractical for many fingerprinting use cases as it frequently changes during regular browser usage.

For example, consider a common fraud prevention technique where a website remembers the browser fingerprint assigned to your login sessions. If the fingerprint relied on your browser window size, you would need to re-confirm your identity every time you resize your browser window.

Another example is promo abuse prevention. An ecommerce website can use fingerprinting to limit how many times a promo code is applied from a single browser. If the fingerprint naively uses window size, the fraudster only needs to resize their window to apply the coupon repeatedly.

To see how basic fingerprinting works,  use our open-source [FingperprintJS demo](https://fingerprintjs.github.io/fingerprintjs/?utm_source=blog&utm_medium=website&utm_campaign=blog) in a regular browser. You can review all the browser attributes the library collects and [hashes](https://en.wikipedia.org/wiki/Hash_function) into a visitor identifier. Screen size is used as a signal, but window size is not. If any of the included attributes changes just by one bit, the hash function generates a completely new identifier.

However, you can reset your fingerprint by resizing your window if you open the demo with letterboxing on. This is because letterboxing spoofs the screen resolution and returns the approximate window size instead.

<iframe style="aspect-ratio: 16 / 9; border-radius: 8px; width: 100%;" src="https://www.youtube.com/embed/ZjNRB-ffkjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

While letterboxing can reset a simple hash-based fingerprint, there are more sophisticated solutions, such as [ Fingerprint Pro.](https://fingerprint.com/?utm_source=blog&utm_medium=website&utm_campaign=blog) In addition to client-side browser attributes, it collects server-side signals such as HTTP headers or the [TLS fingerprint,](https://fingerprint.com/blog/what-is-tls-fingerprinting-transport-layer-security/?utm_source=blog&utm_medium=website&utm_campaign=blog) which are much harder to spoof. Instead of simply hashing all the signals together, it uses prioritization, fuzzy matching, and machine-learning algorithms to create a visitor identifier that remains stable even if some of the signals change over time.

![](https://lh4.googleusercontent.com/CkCVwKkKVAJXVc7kST0VSDEiZQduKNLcSKlNC4bfB2ixIwjXHKz3l7du80ORmmVAvUMJctMAj4RDA_QMOjmXnRcLNOhC7v4HGGbw2-vz-zZgryNQWyuigPE8Bk3t2BRNHbULSs8fdzIIDzHQ_gc9Deo)

*Source: <https://fingerprint.com/github/>*

If you use Firefox with letterboxing to access the [Fingerprint Pro demo](https://fingerprint.com/?utm_source=blog&utm_medium=website&utm_campaign=blog), you can see that the fingerprint is stable even though letterboxing changes your reported screen size as you resize your window:

<iframe style="aspect-ratio: 16 / 9; border-radius: 8px; width: 100%;" src="https://www.youtube.com/embed/_BtgHXLD-r0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Can letterboxing prevent browser fingerprinting?

It all depends on your definition of “prevent” and “browser fingerprinting.” For example, consider a security use case: a login page that enforces multi-factor authentication if you log in from an unknown browser. To “defeat” fingerprint-based protection, the attacker would need to trick the website into assigning their browser the same fingerprint as the victim. This is [impractically difficult](https://hal.science/hal-02612461/document), and letterboxing is of no help at all.

However, if a  promo code can only be applied once per browser fingerprint, an attacker only needs an easy way to repeatedly reset their fingerprint. Letterboxing can make it easier to reset a simple hash-based identifier, but it will not confuse a more sophisticated algorithm like Fingerprint Pro.

If you wanted to make it impossible to generate a browser fingerprint at all, letterboxing is only one of many measures you would need to deploy simultaneously. FingerprintJS collects [dozens](https://github.com/fingerprintjs/fingerprintjs/tree/master/src/sources) of browser signals, and Fingerprint Pro uses more than a hundred, screen dimensions being just one of them. The Tor Browser is the current market leader in [fingerprinting prevention](https://blog.torproject.org/browser-fingerprinting-introduction-and-challenges-ahead/), but consumer-level browsers expose [plenty of information to generate fingerprints](https://fingerprint.com/blog/browser-anti-fingerprinting-techniques/?utm_source=blog&utm_medium=website&utm_campaign=blog), letterboxing or not.