---
templateKey: long-form-content
metadata:
  title: Five Mistakes You’re Making with Your Login Page Security and How to Fix Them
  image: /img/uploads/five-mistakes-you’re-making-on-your-login-page.png
  imageAlt: login screen illustration
  imageTitle: login screen illustration
  socialImage: /img/uploads/five-mistakes-you’re-making-on-your-login-page.png
  description: Your login page is a perfect target for hackers because it serves
    as the primary defense between the internet and sensitive data. Most web
    applications allow users to log into accounts and view sensitive
    information. If your login page isn’t secure, you’re likely making these
    five mistakes.
  url: https://fingerprint.com/blog/five-mistakes-login-page-security-how-to-fix
featured: true
publishDate: 2022-09-13T17:56:10.602Z
title: Five Mistakes You’re Making with Your Login Page Security and How to Fix Them
isPublished: true
isHidden: false
tags:
  - anti-fraud technology
authors:
  - Jennifer Marsh
heroImage:
  image: /img/uploads/five-mistakes-you’re-making-on-your-login-page.png
  imageAlt: login screen illustration
  imageTitle: login screen illustration
customCTA:
  openCtaNewTab: false
---
Your login page is a perfect target for hackers because it serves as the primary defense between the internet and sensitive data. Most web applications allow users to log into accounts and view sensitive information. As a result, your login page is the gateway defense between the user’s personally identifiable information (PII) and the open internet. If your login page isn’t secure, you’re likely making these five mistakes.

## Not Identifying Users vs. Bots

Every request for the login page has several distinguishing features, some of which can be spoofed, but others are much more difficult to fake. Determining if a page request is a bot or a real user helps with fraud detection, so specific threats can be stopped before too many authentication requests are made. For example, an attacker with account takeover tools could automate authentication requests on your login page and perform brute-force attacks. Therefore, immediately knowing if a request is a bot or a real user reduces your risk.

The user’s browser sends data such as a user agent and cookies with the request, but these elements can be spoofed. Simple botted attacks won’t have a user agent value that matches a real browser, and the bot won’t send a valid cookie. Sophisticated bots, however, send these values to your login page to bypass fraud detection and pretend to be human users.

One way to defend against this attack is to use [Fingerprint’s bot detection solution](https://fingerprint.com/products/bot-detection/) to probe different aspects of a web request to identify if the request is from a bot or a user. In addition, the sophisticated Fingerprint JavaScript engine uses several unique identifiers, and it can link a user to a specific device to stop duplicate user signups and block botted requests.

## No Multi-Factor Authentication (MFA) Implemented

Web admins should require multi-factor authentication for any web application that stores sensitive information. Check with applicable web app compliance because MFA might be a compliance requirement to protect users from account takeover. However, even without it being a compliance requirement, MFA eliminates many issues related to login page authentication.

Most developers think that MFA means they must implement a way for users to have a personal identification number (PIN) sent to their smartphone using text messages. Still, developers can use various methods to send users a secondary authentication PIN. The idea behind MFA is that only the user should have access to a PIN sent to a device or account. Together with a password, the chance of account takeover is significantly reduced.

A secondary PIN could be sent to the user’s smartphone via SMS or email, or an authenticator app can be used to eliminate the need for the system to generate the PIN. Implementing an MFA solution needs minor changes to coding and authentication workflows, but it also dramatically reduces the risk of fraud. It also stops bots from performing brute-force attacks using stolen user credentials.

## Not Limiting Login Attempts

Attackers buy long lists of hacked user accounts and passwords and use automation tools to run through credentials against your login page. There are several reasons hackers do this. The first is that they verify that the user account and password are accurate. Once they find a match on your site, hackers can use the stolen credentials to attempt authentication on sites with more sensitive data (e.g., bank accounts or money transfer services) and better cybersecurity to detect account takeover bots. 

Another reason attackers use brute-force authentication is to gain access to the user’s account. If your site hosts PII or other sensitive data, the site is a target for data theft. The login page is a primary target to gain access to user account data or to steal the user’s money. 

Brute-force attacks work by sending automated authentication attempts against your login page. Without limitations, an attacker could conceivably attempt thousands of authentication requests in a short period or continually send authentication requests until a match is found. Your login page should detect too many requests, and you can take several steps to inhibit this behavior.

The first and primary method to stop automated authentication requests is using a CAPTCHA service. You can require the user to solve the CAPTCHA initially or after several authentication attempts. Both strategies are acceptable. 

Third-party denial-of-service (DoS) protection also detects rapid authentication requests, and it will block further attempts. This strategy can be used with a CAPTCHA to block more sophisticated attacks. If too many requests are made, the system can return a server [429 status message](https://www.rfc-editor.org/rfc/rfc6585#section-4), which is the appropriate response for many requests.

A third strategy is to lock a user account after too many failed authentication attempts. While this is useful, it should not be the only defense. Locking user accounts stops attempts on the user but does not stop an attacker from continuing with other accounts. CAPTCHA, request limitations, and account lockouts should be used together to prevent brute-force attacks.

## Not Hashing Stored Passwords or Using Vulnerable Hashing Algorithms

Developers are not hackers, so they often take missteps in dealing with security in their applications. One common misstep is the way passwords are stored in the application database. At worst, developers store passwords in plaintext, which is a severe security flaw and leaves users vulnerable to credential theft and the company to compliance violations. In addition, users commonly use the same credentials across multiple sites, so developers should take necessary precautions to protect users from account takeover after a breach on your application.

Hashing passwords is the expert-approved best practice, but developers must know that hashing is not encryption. OWASP advises that passwords should [not be encrypted](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). They should instead be hashed. Hashing is a one-way algorithm, meaning it cannot be decrypted with a key as it can be with symmetric or asymmetric encryption. The only way to determine the plaintext value from a hashed string is using dictionary attacks where words and stolen passwords are hashed, and the resulting value is compared to the stolen stored hash. If they match, then the attacker now has the user’s password.

[Salt should be used with hashing](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/). User passwords are vulnerable to dictionary attacks by just hashing passwords, often using [rainbow tables](https://www.sciencedirect.com/topics/computer-science/rainbow-table#:~:text=Rainbow%20tables%20are%20tables%20of,it%20to%20the%20stored%20hash.). However, the attacker needs the password and a random salt value. Therefore, the salt should be different for each password and appended to the end of the user’s password before hashing. Adding a random salt to a password before hashing makes it much more challenging to determine the user’s password, but it should always be different for every hash and can be stored in the same database as the hash. So, having a unique salt for every hash does not allow an attacker to feasibly run through a list of passwords and create a rainbow table of possibilities for every dictionary term and randomized salt value.

Finally, the type of hashing algorithm you use is essential. [SHA-1](https://en.wikipedia.org/wiki/SHA-1) and [MD5](https://en.wikipedia.org/wiki/MD5) are cryptographically insecure. These two algorithms are vulnerable to collisions, which means that two different passwords result in the same hash. They are also computationally susceptible to dictionary attacks using current computing power. The hashing algorithm you use should resist brute-force dictionary attacks and collisions. SHA-2 is the typical choice, but SHA-3 is available. SHA-3 is considered more secure by some experts, but it takes more computing power and can affect the performance of your application.

## Use All Five Security Strategies, Not Just One

Remediate these five mistakes on your web application, not just one. By implementing all five remediation strategies, your risk dramatically drops. In addition, being the reason for a user losing their data and password causes irreparable damage to brand reputation, so security should be a priority for any business.

[Hashing passwords](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/), [using CAPTCHA](https://www.makeuseof.com/captcha-validation-html-css-javascript/), and [implementing MFA](https://www.okta.com/resources/whitepaper/8-steps-for-effectively-deploying-mfa/) can be done in-house without third-party tools, but detecting bots and automated authentication requires more sophisticated tools. [Fingerprint Pro](https://fingerprint.com/products/fingerprint-pro/) helps developers quickly detect duplicate users, and when paired with the bot detection solution, it can also detect bots. 

Try out our [demo](https://fingerprint.com/demo/) or [get started for free](https://fingerprint.com/products/bot-detection/).