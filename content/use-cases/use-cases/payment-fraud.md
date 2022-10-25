---
templateKey: use-case-content
metadata:
  title: Payment Fraud - Technical Use Case - Fingerprint Pro
  url: https://fingerprint.com/use-cases/payment-fraud
  description: Payment fraud revolves around online financial transactions for
    goods or services. We provide a reliable identification signal that
    significantly allows our customers to improve their credit card anti-fraud
    workflows.
  image: /img/uploads/payment-fraud.png
  imageAlt: mobile checkout screen
  imageTitle: mobile checkout screen
  socialImage: /img/uploads/payment-fraud.png
publishDate: 2022-08-08T21:04:12.225Z
isPublished: true
title: Payment Fraud
description: Payment fraud revolves around online financial transactions for
  goods or services. We provide a reliable identification signal that
  significantly allows our customers to improve their credit card anti-fraud
  workflows.
funnel:
  - Payment
category:
  - Authentication
industry:
  - Payment Processing
useCaseCode:
  iframeUrl: https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md
  button1:
    url: ""
    buttonText: ""
  button2:
    url: https://github.com/makma/use-cases-credential-stuffing
    buttonText: View demo source on GitHub
---
## What is Payment Fraud?

Payment fraud revolves around online financial transactions for goods or services. The keyword is “payment.” This nefarious activity occurs when fraudsters obtain stolen credit, debit, or checking data. Then that fraudster uses the stolen financial data to make an unauthorized purchase, pretending to be the card or account owner. Often, the criminal will quickly sell the item or items purchased illegally to obtain cash.

## Why is Payment Fraud Important?

Payment Fraud is a serious issue for businesses that store, handle or process payment information. By processing stolen card data, fraudsters can leverage your business for money laundering operations or unauthorized goods/services that will create chargebacks. Chargebacks are when a merchant must return payment for an unauthorized transition and sometimes incurs a fee. Chargebacks directly impact margins, your business reputation, and customer service and financial accounting overhead.

### Why Fingerprint

Many businesses that build a sophisticated anti-fraud system consider suspicious flag purchases of a visitor’s device, IP address, and browser fingerprint. However, some fraudulent purchases still fall through the cracks. These companies find that the accuracy of their current fingerprinting solution is too low to catch all fraudulent activity, resulting in chargebacks, lost revenue, and a threat to their seller reputation.

**After comparing Fingerprint Pro with existing browser identifiers, most find Fingerprint Pro’s visitorIDs unparalleled in accuracy and contain far fewer false positives.** We provide a reliable identification signal that significantly allows our customers to improve their credit card anti-fraud workflows.

## How to Increase Account Growth by Identifying & Preventing Payment Fraud

Fingerprint Pro provides a unique identifier for every visitor to your website (the `visitorId`) collected behind the scenes anytime someone performs a specific action with our JavaScript fingerprinting agent installed. Since malicious attackers might forge this data, Fingerprint Pro also provides tools for validating these identifiers sent by your front end. As a result, you will protect your users and your business against various payment frauds with the proposed approaches. At the same time, your legit users won’t experience any additional friction while performing their payments.

Since you know your product and business landscape best, it’s up to you to decide how to configure anti-fraud workflows to utilize the `visitorId` to catch fraud on your website. Below, we have described some steps and best practices for your custom solution as a starting point.

### Configuring Fingerprint Pro for Payment Fraud prevention

To use Fingerprint Pro effectively to prevent payment frauds such as credit card cracking, chargeback fraud, or stolen card abuse, you should configure logic that utilizes the `visitorId` among other timestamped data in conjunction with information provided by a user. Therefore, it is crucial to think through the logic used to determine suspicious activity and that the correct actions are taken when a visitor is flagged.

### **Suspicious Activity Logic**

When a visitor attempts to pay for an order, we recommend sending the `visitorId`, `requestId`, and credit card data to your application server, where they persist in the storage layer. Using this data, you can compare the current `visitorId` and credit card pairing to previous attempts to catch threats.

Here are the recommended logic rules for Payment Fraud prevention:

* First, you need to add the Fingerprint Pro [JavaScript agent](https://dev.fingerprintjs.com/docs/js-agent) to your webpage. Alternatively, if your frontend uses modern frameworks such as [React.js](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-react) or [Angular](https://dev.fingerprintjs.com/docs/angular), one can use one of [our libraries](https://github.com/orgs/fingerprintjs/repositories) instead.

```javascript
 Initialize the agent
 const fpPromise = import('https://fpcdn.io/v3/your-public-api-key')
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://metrics.yourdomain.com'
  }));

// Once you need a result, get and store it.
// Typically on page load or on button click.
fpPromise
  .then(fp => fp.get())
  .then(fpResult => {result = fpResult})
```

The endpoint property is quite important and is used for the [Custom subdomain setup](https://dev.fingerprintjs.com/docs/subdomain-integration). Using a subdomain is required for correct identification while using Fingerprint Pro.

* Send the user’s credit card data together with `visitorId` and `requestId` to your API.

```javascript
const orderData = {
  cardNumber,
  cardCvv,
  cardExpiration,
  visitorId,
  requestId,
};

const response = await fetch('/api/place-order', {
  method: 'POST',
  body: JSON.stringify(orderData),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
```

All next steps should be performed on the backend. If your backend logic is built on top of Node.js, you can use [Fingerprint Server API Node.js SDK](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-server-api-nodejs-sdk).

* Check if the request contains valid `visitorId` and `requestId`. Stop users with forged data.

```javascript
const visitorId = req.body.visitorId;
const requestId = req.body.requestId;

const isRequestIdFormatValid = /^\d{13}\.[a-zA-Z0-9]{6}$/.test(requestId);
const isVisitorIdFormatValid = /^[a-zA-Z0-9]{20}$/.test(visitorId);

if (!isRequestIdFormatValid || !isVisitorIdFormatValid) {
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* All next steps and checks will be performed using data provided by [Fingerprint Pro Server API](https://dev.fingerprintjs.com/docs/server-api). Therefore, we need to obtain visitor data, first. Alternatively, one can also use the [Webhooks functionality](https://dev.fingerprintjs.com/docs/webhooks).

```javascript
const fingerprintJSProServerApiUrl = new URL(
  `https://api.fpjs.io/visitors/${visitorId}`
);

fingerprintJSProServerApiUrl.searchParams.append('request_id', requestId);

const visitorServerApiResponse = await fetch(
  fingerprintJSProServerApiUrl.href, { method: 'GET', headers: { 'Auth-API-Key': 'secret-api-key' } }
);

// If there's something wrong with provided data, Server API might return non 200 response.
// We consider these data unreliable.
if (visitorServerApiResponse.status !== 200) {
  reportSuspiciousActivity(req);
  // Handle error internaly, refuse the action.
}

const visitorData = await visitorServerApiResponse.json();
return visitorData;
```

* The Server API response must contain information about this specific identification request. If not, the request might have been tampered with and we don't trust this identification attempt.

```javascript
if (visitorData.error || visitorData.visits.length !== 1) {
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* An attacker might have acquired a valid `requestId` and `visitorId` via phishing. It's recommended to check the freshness of the identification request to prevent replay attacks.

```javascript
if (new Date().getTime() - visitorData.visits[0].timestamp > 3000) {
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* The [Confidence Score](https://dev.fingerprintjs.com/docs/understanding-your-confidence-score) reflects the system's degree of certainty that the visitor identifier is correct. If it's lower than the certain threshold we recommend using an additional way of verification, e.g. 2FA or email.

```javascript
if (visitorData.visits[0].confidence.score < 0.95) {
  persistPaymentAttempt(req);
  reportSuspiciousActivity(req);
  return getForbiddenReponseAndChallenge();
}
```

* We want to check if the order request comes from the same IP address as the identification request.

```javascript
// This is an example of obtaining the client IP address.
// In most cases, it's a good idea to look for the right-most external IP address in the list to prevent spoofing.
if (
  request.headers['x-forwarded-for'].split(',')[0] !==
  visitorData.visits[0].ip
) {
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* Checks if the order request comes from a known origin and if the order request's origin corresponds to the origin provided by the Fingerprint Pro Server API. Additionally, one should also set the [Request Filtering](https://dev.fingerprintjs.com/docs/request-filtering) in the dashboard.

```javascript
const ourOrigins = [
  'https://protect-card.example.com',
];

const visitorDataOrigin = new URL(visitorData.visits[0].url).origin;
if (
  (visitorDataOrigin !== request.headers['origin'] ||
    !ourOrigins.includes(visitorDataOrigin) ||
    !ourOrigins.includes(request.headers['origin']))
) {
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* In real-world applications, we want to prevent chargeback frauds. Check if this `visitorId` has a positive chargeback history. Prevent users with positive chargeback history from placing new orders without further investigation.

```javascript
// Gets all chargebacks during the last 365 days for the visitorId.
const countOfChargebacksForVisitorId = await db.query("SELECT COUNT(*) AS count FROM payment_attempts WHERE visitor_id = ? AND is_chargebacked = 1 AND timestamp > ?", [visitorId, new Date().getTime() - 365 * 24 * 60 * 1000]);

// If the visitorId performed more than 1 chargeback during the last 1 year we do not process the payment.
// The count of chargebacks and time window might vary.
if (countOfChargebacksForVisitorId.count > 1) {
  persistPaymentAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* We typically want to forbid placing orders for users who historically used stolen cards.

```javascript
// Get all attempts with a stolen credit card for the given visitorId.
const stolenCardUsedCount = await db.query("SELECT COUNT(*) AS count FROM payment_attempts WHERE visitor_id = ? AND used_stolen_card = 1", [visitorId]);

// If the visitorId performed more than 1 payment with a stolen card during the last 1 year we do not process the payment.
// The time window duration might vary.
if (stolenCardUsedCount.count > 0) {
  persistPaymentAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
  }
```

* [Card cracking](https://fingerprint.com/payment-fraud/) (also known as carding) happens when fraudsters look to exploit the systems of e-commerce businesses to gather credit card information. Fraudsters may have obtained partial card information beforehand, or they can be starting from scratch. We typically want to forbid placing orders to users who historically used stolen cards as we did in the previous step or those who try the excessive amount of credit card details.

```javascript
// Gets all unsuccessful attempts for the visitorId during the last 365 days.
const invalidCardAttemptCountQueryResult = await db.query("Select COUNT(*) as count from payment_attempts where visitor_id = ? and timestamp > ? and check_result != 'Passed'", [visitorId, new Date().getTime() - 365 * 24 * 60 * 1000]);

// If the visitorId performed 3 unsuccessful payments during the last 365 days we do not process any further payments from them.
// The count of attempts and time window might vary.
if (invalidCardAttemptCountQueryResult.count > 2) {
  persistPaymentAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

### **Challenge Actions**

You can require additional verification or authentication steps to stop fraudsters from further progress for suspicious payment attempts as defined by your suspicious activity logic. In all the cases above, we suggest ignoring payment attempts, notifying possible account owners about the suspicious activity via email/SMS/phone, or challenging the attempted payment with two-factor authentication in specific scenarios.

### Explore our Payment Fraud prevention demo

We have built a [Payment Fraud prevention demo](https://fingerprinthub.com/payment-fraud) to demonstrate the above concepts. Use this demo to see how you can use Fingerprint Pro in conjunction with simple logic rules to protect a payment form. If you want to explore code, check our interactive [Stackblitz demo](https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md) or open-source [GitHub repository](https://github.com/makma/use-cases-credential-stuffing). If you have any questions, please feel free to reach out to [support@fingerprint.com](mailto:support@fingerprint.com).
