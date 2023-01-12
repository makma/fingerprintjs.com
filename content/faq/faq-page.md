---
title: Faq page
templateKey: faq-page
faqBlocks:
  - title: Fingerprint Pro
    id: fingerprint-pro
    faq:
      - question: What is Fingerprint Pro's uptime SLA?
        answer: Fingerprint Pro guarantees at least a 99.9% uptime. In addition, you can
          check our current status, view previous incidents, and subscribe to
          updates on our [status page](https://status.fingerprint.com).
      - question: What is your typical response time when there is an issue or bug?
        answer: Response times are based on the issue's size or the bug's severity and
          are approached on a case-by-case basis.
      - question: Do you provide a hosted service?
        answer: Fingerprint uses a series of global Amazon Web Services (AWS)
          datacenters with enterprise-grade physical and network security.
      - question: How do the machine learning aspects of Fingerprint work?
        answer: Fingerprint Pro's server-side API processes and analyzes a vast amount
          of data, searching for patterns and recurring fraudulent activity.
      - question: What types of companies do you typically work with?
        answer: Fingerprint works with companies of all sizes and industries like
          eCommerce, Financial Services, Travel, Gaming, Crypto, and more across
          many regions, including the US, EU, APAC, and LATAM.
      - question: What can you do with a visitorID once Fingerprint generates it?
        answer: Fingerprint has tiered self-serve plans that scale by the number of API
          calls per month up until 1 million/month. After that, anything over
          requires an enterprise contract. For more pricing information, [click
          here](/pricing/).
      - question: What are the advantages of using the custom subdomain?
        answer: The custom subdomain allows API calls through ad blockers and specific
          security policies.
      - question: Should we implement Fingerprint Pro on specific pages, every page, or
          the first page where a visitor lands?
        answer: The desired use case largely dictates the implementation of Fingerprint.
          For more information on what pages you should consider implementing,
          check out our best practices doc
          [here](https://dev.fingerprint.com/docs/best-practices).
      - question: How do you count users? For example, if the same person comes in
          multiple times with the same visitorID does that count as multiple API
          calls?
        answer: Yes, every time the API is called to generate a visitorID, even if for
          the same user, it will count towards the API call volume. This is
          because every time it's called, our servers need to process it
          irrespective of being a new ID vs an old one.
  - title: Open-source software
    id: open-source
    faq:
      - question: What is open-source software?
        answer: Open source software includes public source code access, which anyone
          can review, edit, and add over time. Generally, open source software
          is free for anyone to use and it can be incorporated into other
          software. Some famous examples of open source software include
          [Firefox](https://www.mozilla.org/en-US/firefox/products/),
          [OpenOffice](https://www.openoffice.org/), and
          [MySQL](https://www.mysql.com/).
      - question: What is FingerprintJS?
        answer: FingerprintJS is a browser fingerprinting library that queries browser
          attributes and computes a hashed visitor identifier from them. Unlike
          cookies and local storage, a fingerprint stays the same in
          incognito/private mode, even when browser data is purged.
      - question: How can I find your open-source library, FingerprintJS?
        answer: "Our open-source software, FingerprintJS, is [available on
          GitHub](https://github.com/fingerprintjs/fingerprintjs/).
          FingerprintJS is the #1 browser fingerprinting solution on GitHub,
          with over 17,000 stars."
      - question: Is your open-source software always free to use?
        answer: FingerprintJS will always be free to use.
      - question: How is Fingerprint Pro different from FingerprintJS open source?
        answer: You can view a complete breakdown of the two in our [technical
          documentation](https://dev.fingerprint.com/docs/pro-vs-open-source).
          However, the most significant difference is that FingerprintJS is less
          accurate than the Pro version because it does not include additional
          server-side identification methods, as well as machine learning
          processing included in the Pro version.
  - faq:
      - question: What is browser fingerprinting? How does browser fingerprinting work?
        answer: >-
          Browser fingerprinting is a technique of identifying a website's
          visitors to be uniquely identifiable among other visitors. It combines
          many different pieces of information about the visitor, known as
          signals, to help machine learning ingest the signals and assign a
          unique identifier to a user.


          Examples of signals that could be collected during browser fingerprints include, device operating system, browser version, preferred language, or screen resolution.
      - question: Is browser fingerprinting safe?
        answer: >-
          For a business, browser fingerprinting aims to identify visitors to a
          site better and separate those that may be fraudulent and those that
          may not. Therefore, we do not track across sites nor reveal PII
          (personally identifiable information) during our fingerprinting
          process.


          The benefits of browser fingerprinting as a consumer include an overall safer browsing experience and user experience when using software or viewing a website.
      - question: What is my browser fingerprint?
        answer: |+
          You can view your detected VisitorID on [our Demo page](/demo/).

      - question: Can you detect a user in incognito mode or on a VPN?
        answer: >+
          Yes, we can uniquely identify website visitors in most cases using an
          incognito mode or a VPN. This is because we ingest over 100 signals
          about a visitor before assigning them a unique identifier. So, even if
          they change a signal, such as IP address, we can still identify them
          with 99.5% accuracy.

    title: Browser Fingerprinting
    id: browser-fingerprinting
  - faq:
      - question: What is device identification?
        answer: >+
          Device identification is a process in which several signals from a
          device, user, browser, etc are collected and used to create and assign
          a unique number identifying that device. The act of signal collection
          can vary by methodology and technology.

      - question: How does device identification differ from browser fingerprinting?
        answer: >+
          Browser fingerprinting is just one of the many signal collection forms
          incorporated into device identification. Previously, device
          identification was achieved through signals like IP addresses and
          cookies. However, browser fingerprinting is a much more robust method
          given the number of signals collected, leading to the most accurate
          device identification generation.

      - question: Does Fingerprint Pro do device identification or browser
          fingerprinting?
        answer: >+
          To generate our unique VisitorID, Fingerprint incorporates device
          identification and browser fingerprinting. For mobile apps, we
          identify devices; for web and mobile browsers, we identify browsers as
          this allows us to achieve higher accuracy.

      - question: What is an IMEI, and is it part of a device identification?
        answer: >+
          IMEI stands for “International Mobile Equipment Identity.” It’s a
          unique number for identifying a device on a mobile network, and you
          can think of it as your phone’s social security number. IMEI factors
          into device identification of mobile devices but isn’t the only signal
          utilized when building a fingerprint.

    title: Device Identification
    id: device-identification
  - faq:
      - question: How is your accuracy % defined?
        answer: >+
          We define our accuracy by how many returning visitors to a site we
          successfully identify as returning visitors, not new ones. So, for
          example, a 99.5% accuracy rate means we correctly identify 995 out of
          1000 returning visitors on any site.

    title: Accuracy
    id: accuracy
  - faq:
      - question: What information does Fingerprint store? Do you collect PII?
        answer: >+
          We collect close to 100 signals from the browser to create a snapshot.
          This snapshot is used to generate the fingerprint. We store than on
          our servers for 90 days and don't collect any PII data except for IP
          address.

      - question: How do changes within browsers regarding privacy and tracking affect
          Fingerprint?
        answer: >+
          Security and privacy policies are rapidly changing; thus, the
          available signals from a user’s device are very dynamic. This requires
          constant tuning, machine learning, and other advanced techniques to
          keep our accuracy high. Due to this, we invest heavily in this exact
          area of the business.

      - question: Is Fingerprint Pro GDPR compliant?
        answer: Yes - Fingerprint is GDPR compliant. You can learn more about our
          security certifications on [our Security page](/security/).
      - question: Is Fingerprint Pro CCPA compliant?
        answer: >
          Yes - Fingerprint is CCPA compliant. You can learn more about our
          security certifications on [our Security page](/security/).
      - question: Does Fingerprint Pro or FingerprintJS track website traffic
          automatically?
        answer: >+
          We never automatically track traffic - our customers can configure
          under what conditions visitors are tracked, and we never do
          cross-domain tracking.

      - question: Is Fingerprint SOC2 Compliant?
        answer: >+
          Yes - Fingerprint is SOC 2 compliant. You can learn more about our
          security certifications on [our Security page](/security/).


          Please [contact sales](/contact-sales/) if you want to see our SOC 2 report.

      - question: Does Fingerprint Pro require consent?
        answer: >+
          Our technology is intended to be used for fraud detection only; for
          this case, no user consent is required. However, any use outside of
          fraud detection must comply with GDPR user consent rules.

      - question: Where is Fingerprint Pro’s data stored?
        answer: >+
          When you create your account, you can choose between Global/US data
          storage (Richmond, Virginia), data EU storage (Frankfurt, Germany) and
          Asia-Pacific storage (Mumbai).


          We can set up servers in additional locations for enterprise customers. To learn more, please [contact sales](/contact-sales/).

    title: Privacy, Security, & Legal
    id: privacy-security-legal
  - faq:
      - question: What are the types of payment fraud?
        answer: >+
          Digital payment fraud can take many forms. We help businesses detect
          several of them, including credit card fraud, credit card chargebacks
          (friendly fraud), coupon and promo code abuse, and card cracking. You
          can learn more about each [here](/payment-fraud/).

      - question: What is account takeover fraud (ATO)?
        answer: >+
          [Account takeovers](/account-takeover/) can appear in several forms,
          including credential stuffing and phishing attempts.


          With credential stuffing, fraudsters will try to test thousands of login details they’ve obtained from an external source like a data breach of another site to try and gain access to a user’s accounts. This happens when users reuse passwords or unsecured passwords across multiple sites.


          Phishing attempts are some of the most challenging fraud attempts to detect due to their level of social engineering sophistication. Phishing attempts happen in several ways, including through email, social media, phone calls, false web pages, and even direct mail.




      - answer: >+
          Multi-accounting fraud is when one person signs up for multiple
          accounts with the same service. This can happen for non-nefarious
          reasons or in attempts to gain something, including a winning
          advantage in an online poker game.


          Multi-accounting is a growing problem in online gambling, gaming, and poker, and we discuss ways to detect and prevent multi-accounting in those industries [here](/blog/stop-multi-accounting-gaming/).


        question: What is multi-accounting fraud?
    title: Common Fraud Types
    id: common-fraud-types
---
