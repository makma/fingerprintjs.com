---
templateKey: long-form-content
metadata:
  title: Account takeover indicators that businesses should know to prevent
    digital identity fraud
  image: /img/uploads/account-takeover-indicators.png
  description: Account takeover occurs when malicious actors steal login
    credentials to access customer accounts. Learn the tell-tale signs of
    account takeover attempts and how to prevent it from happening again.
  url: https://fingerprint.com/blog/account-takeover-indicators
  imageAlt: Account Takeover Fraud
  imageTitle: Account Takeover Fraud
featured: true
publishDate: 2021-09-16T16:52:25.550Z
title: Account takeover indicators that businesses should know to prevent
  digital identity fraud
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - account takeover
  - payment fraud
  - ecommerce fraud
authors:
  - Leon Yen
heroImage:
  image: /img/uploads/account-takeover-indicators.png
  imageAlt: Account Takeover Fraud
  imageTitle: Account Takeover Fraud
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
Organizations storing user login information should be especially wary of account takeover fraud to protect themselves and their customers.

Account takeover accounted for [two-thirds of the identity fraud cases](https://spycloud.com/blog/2023-cybersecurity-industry-statistics-account-takeover-ransomware-data-breaches-bec-fraud/) in 2021. To make matters worse, insurance may not cover the losses. A common form of [corporate account takeover](https://fingerprint.com/account-takeover/?utm_source=blog&utm_medium=website&utm_campaign=blog) is when hackers steal login credentials to access your business' bank accounts and often drain your balance.

Fraudsters have many methods for acquiring login information: [phishing attacks](https://fingerprint.com/blog/how-to-recognize-phishing-emails/), public website/database compromises, [social engineering](https://fingerprint.com/blog/why-social-engineering-attacks-are-successful-with-technical-staff/), etc. Because they are using legitimate usernames and passwords, it can be hard to identify fraud scenarios in action.



## What is an account takeover?

[Account takeover](https://fingerprint.com/blog/account-takeover-indicators/) occurs when malicious actors steal login credentials to access customer accounts. The account can be anything from an email to a mobile banking account and other online accounts. Once fraudsters have access, these accounts can be used to conduct various activities, such as transferring funds or accessing personal data. 



## Insiders are a leading cause of account takeovers

A critical rule of thumb for protecting yourself from corporate account takeover is safeguarding your account login information from within. Customers and staff frequently cause account takeovers, whether knowingly or inadvertently.

It's important to proactively monitor for issues involving customer account logins, password resets, or new account creation. These can be signs of a fraud scenario in progress, and recognizing them early on can make a crucial difference when mitigating or preventing damage. Additionally, the number of staff members with administrative access to account login information should be minimal.



## What are the major indicators of account takeovers that businesses should be aware of?

When malicious actors are trying to gain access to accounts, they often leave a digital pattern of activity. Knowing what to look for and carefully monitoring these signs can help identify account takeover fraud in real-time.

This is especially the case when cyber attackers steal volumes of customer login information from a single business—an uncommon occurrence. It's essential to be aware of the relevant signs so immediate action can be taken if customer accounts have indeed been compromised.



### Multiple accounts suddenly share similar details

When cyber attackers successfully log in to accounts, they often change some of the account owner's details. It's not uncommon for criminals to target multiple customer accounts at one business in a short period; when this happens, many customers may suddenly share the same details in their account profiles. For example, if 25 customers change their shipping address to the same address on the same day, their accounts will likely be taken over.

Account takeover protection methods can include enforcing a stand-down period between account detail changes and purchases or requiring address verification to ensure legitimacy.



### Accounts accessed from IP addresses in different countries

Customers typically use the same computer and IP address to access their accounts. Because IP addresses are associated with specific countries, they can be used to monitor if a user has logged in from an irregular location. The IP addresses of active website users can also be matched to the usual IP addresses of account holders.

For example, an account holder, usually based in Florida, is accessing the website from an IP address somewhere overseas. They may have gone away on vacation, or it may be an account takeover in progress.

In a short period of time, numerous unique account logins from a new location may also indicate an account takeover campaign. For example, if ten different accounts are accessed from the same, new country—it's safe to assume that not all those customers have traveled abroad simultaneously to the same place.



### Change in customer details from multiple accounts

An effective way of identifying compromised accounts in a corporate account takeover campaign is to trick the malicious actor into changing the accounts in question, thereby flagging them for review.

This can be accomplished by alerting a customer account when its details have been changed. This may trigger the malicious actor to change details such as passwords on all accounts they have access.

At a minimum, being aware of the overall behavior pattern of customers can make a critical difference. For example, it would be improbable for 15 customers to all change their passwords in a few minutes, even if you haven't signaled to the hacker that something might be awry.



### Accounts being logged in from different devices

Customers tend to use the same devices when accessing their accounts. While it's not uncommon for customers to use new devices, a large number of accounts accessed by an unknown device simultaneously is a likely sign of an account takeover.

Malicious actors can also use blocking software to hide information regarding the device in use. Customers may do this for legitimate privacy reasons, but again—a lot of these online at the same time is usually suspect.



### Multiple accounts from the same device

This account takeover indicator is relatively easy to spot: multiple customers accessing their accounts from the same device. It's highly improbable that several different customers would be using the same computer at the same time. An account takeover campaign is in progress if this scenario occurs.

To make matters more complex, cybercriminals are aware of the risk of discovery in this scenario. Therefore, they may conduct their activities outside business hours when administrators are less likely to monitor website activity. It's no wonder that [49% of attacks happen on weeknights](https://www.zdnet.com/article/most-ransomware-attacks-take-place-during-the-night-or-the-weekend/), and 27% happen on weekends.



### Signs of API Misuse

APIs are critical these days for integrating and connecting different web services—they are the glue of the internet. For example, a merchant may use an API to connect its web store to the payment processor for clearing credit card transactions. While they are helpful tools for businesses and developers, they can be misappropriated by bad actors in an [account takeover situation](https://techbeacon.com/security/how-prevent-api-abuse-your-mobile-apps).

Using an automated attack bot, cyber attackers may attempt to break through an API's security controls with randomized combinations of stolen usernames and passwords. This is one such example of why monitoring websites for API misuse is crucial, as it's likely to involve many failed login attempts in a short time.



## How can businesses mitigate the risks of account takeover?

Combating malicious actors is challenging, yet instituting measures of early detection and mitigation can help reduce the likelihood of successful account takeovers.



### Configure Web Application Firewall (WAF)

[Web Application Firewalls (WAFs)](https://www.f5.com/glossary/web-application-firewall-waf#:~:text=A%20web%20application%20firewall%20(WAF)%20protects%20web%20applications%20from%20a,and%20cookie%20poisoning%2C%20among%20others.) can be an invaluable asset in the fight against account takeover attacks. When configured with tailored policies, these tools can identify and halt malicious attempts such as brute force or bot operations - even if they weren't explicitly designed. By leveraging the power of WAFs, account security can drastically increase by deterring nefarious activities and keeping accounts away from those with malicious intentions.



### Implement multiple verification methods

Companies that rely solely on one verification method for user access risk becoming exposed to attack and fraud. To provide additional protection, [multiple identification methods should be implemented](https://fingerprint.com/blog/improve-online-user-identification/), including [Multi-Factor Authentication (MFA)](https://www.onelogin.com/learn/what-is-mfa), [SAML (Security Assertion Markup Language) Authentication](https://www.oracle.com/security/cloud-security/what-is-saml/), and [Single-Sign-On (SSO)](https://www.onelogin.com/learn/how-single-sign-on-works). Utilizing a range of measures creates an extra layer of security that guards against seemingly malicious activities from external sources or unauthorized individuals attempting to gain access. Therefore, multiple verification methods assure businesses that only trusted and legitimate users are allowed entry into their systems.



### Implement a device identification solution

Device identification isan effective way of verifying users and provides multiple benefits over traditional methods such as username and password combinations or email confirmation links. Its primary advantage is that device identifiers like the browser fingerprints are more difficult to forge than other credentials. Additionally, device identifiers do not require manual updating or renewal unlike passwords. They remain accurate for months without needing to be renewed or updated. Device identification models offer advanced security features that allow access only to known compatible device categories of operating systems.

Sophisticated solutions like [Fingerprint Pro](https://fingerprint.com/products/fingerprint-pro/) can help protect customers by generating a 99.5% accurate browser identifier. When malicious actors with a history of suspicious behavior attempt to log in to compromised accounts, Fingerprint Pro can accurately associate their previous visit history, making it easy to take action to secure all impacted accounts. The platform seamlessly integrates into existing workflows and is available for a [free ten-day test drive](https://dashboard.fingerprint.com/signup) with unlimited API access.



## Conclusion

Account takeover threats pose a grave risk to all organizations with an online presence. Customers expect to have their data protected, and compromised login credentials are inconvenient at best and, at worst, cause for taking their businesses elsewhere. Data breaches are also brand-damaging events—the kind of publicity to avoid at all costs. Fortunately, with these risk indicators in mind, companies can detect account takeovers and implement necessary damage control measures before they spiral out of control.