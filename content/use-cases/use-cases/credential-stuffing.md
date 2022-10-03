---
templateKey: use-case-content
metadata:
  title: Credential Stuffing Prevention - Technical Use Case - Fingerprint Pro
  image: /img/uploads/credentialstuffing.png
  imageAlt: Credential stuffing illustration
  imageTitle: Credential stuffing illustration
  description: Explore our full code use case for credential stuffing prevention.
    Stop automated attacks on your login page with our user identification API.
  url: https://fingerprint.com/use-cases/credential-stuffing
  socialImage: /img/uploads/credentialstuffing.png
publishDate: 2021-11-12T15:48:01.198Z
isPublished: true
title: Credential Stuffing
description: Detect automated injection of stolen usernames and passwords on
  your login page before an attacker can do any damage.
funnel:
  - Login
category:
  - Bot Attacks
  - Identity Fraud
industry:
  - Ecommerce
  - Gaming
  - Gambling
  - Financial
bottomLinks: []
useCaseCode:
  iframeUrl: https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md
  button1:
    url: ""
    buttonText: ""
  button2:
    url: https://github.com/fingerprintjs/fingerprintjs-pro-use-cases
    buttonText: View demo source on GitHub
isHidden: false
---
## **What is Credential Stuffing?**

Credential Stuffing is a method of account takeover where an attacker attempts to gain access to as many customer accounts as possible. Typically performed as an automated (brute force) attack, credential stuffing occurs when random combinations of usernames and passwords are submitted until a valid set is found and login is successful. [OWAPS notes](https://owasp.org/www-community/attacks/Credential_stuffing) that “credential stuffing is one of the most common techniques used to take over user accounts.”

Credential Stuffing attacks are effective because of the high probability of password reuse. [Some studies suggest](https://tech.co/news/most-people-reusing-passwords-multiple-sites) that as high as 85% of users will reuse the same credentials for multiple services. As long as password reuse is a common user behavior, Credential Stuffing will always be an attack vector of interest to bad actors.

### Attack Stages:

1. An attacker accesses lists of username and password pairs collected from data breaches.
2. An attacker uses automated tools to test the username and password pairs on a web application.
3. As soon as a successful login happens, an attacker uses credentials for profit. They may use the account to make fraudulent purchases, phishing attempts, online scams, sell private information, or sell the login credentials.

## Why is **Credential** Stuffing Prevention Important?

While the success of Credential Stuffing attacks is generally low in the [one to three percent range](https://go.recordedfuture.com/hubfs/reports/cta-2019-0425.pdf), the negative effect of a successful attack can be tremendous. [EY Global research](https://www.ey.com/en_gl/financial-services/cybercrime-what-does-the-most-damage-losing-data-or-trust) found that customer trust can be destroyed by a cyber attack.

Businesses are being increasingly held accountable by the public and regulators to ensure their user’s data security and safety. It has become common for companies to sustain stiff fines and legal action under laws such as [GDPR](https://gdpr.eu/) if their security standards, breach communication processes, and best practices are lacking in compliance.

In 2018, the UK's Information Commissioner's Office (ICO) [fined Uber £385,000](https://ico.org.uk/media/action-weve-taken/mpns/2553890/uber-monetary-penalty-notice-26-november-2018.pdf) for "a series of avoidable data security flaws" exposing the data of approximately 2.7 million UK customers. In 2021, the French Data Protection Authority (CNIL) fined a data controller and its data processor €225,000 “for failure to implement adequate security measures to protect customer data against credential stuffing attacks on the website of the data controller.”

## How to Prevent **Credential** Stuffing

FingerprintJS Pro provides a unique identifier for every visitor to your website (the `visitorId`) collected behind the scenes anytime someone visits a webpage with our JavaScript fingerprinting agent installed. Since malicious attackers might forge this data, FingerprintJS Pro also provides tools for validating these identifiers sent by your front end. As a result, you will protect your users and your business against Credential Stuffing and other account takeover attacks with the proposed approaches. At the same time, your legit users won’t experience any additional friction.

Since you know your product and business landscape best, it’s up to you to decide how to configure anti-fraud workflows to utilize the `visitorId` to catch fraud on your website. Below, we have described some steps and best practices to use as a starting point for your custom solution.

### **Configuring FingerprintJS Pro for Credential Stuffing prevention**

To use FingerprintJS Pro effectively to prevent all forms of account-related fraud, you should configure logic that utilizes the `visitorId` among other timestamped data in conjunction with credentials provided by a user. It is crucial to think through both the logic used to determine suspicious activity, as well as the challenge actions that should be taken when a visitor is flagged.

### **Suspicious Activity Logic**

We recommend that when a visitor attempts to log in, the `visitorId` and login credentials are sent to your application server, where they persist in the storage layer. Using this data, you can compare the current `visitorId` and credential pairing to previous attempts to catch threats.

Here are the recommended logic rules for Credential Stuffing:

* First, you need to add the FingerprintJS Pro [JavaScript agent](https://dev.fingerprintjs.com/docs/js-agent) to your webpage. Alternatively, if your frontend uses modern frameworks such as [React.js](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-react) or [Angular](https://dev.fingerprintjs.com/docs/angular), one can use one of [our libraries](https://github.com/orgs/fingerprintjs/repositories) instead.

```javascript
// Initialize the agent
const fpPromise = import('https://fpcdn.io/v3/your-public-api-key')
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://metrics.yourdomain.com'
  }));

// Once you need result, get and store it.
// Typically on page load or on button click.
fpPromise
  .then(fp => fp.get())
  .then(fpResult => {result = fpResult})
```

The endpoint property is quite important and is used for the [Subdomain setup](https://dev.fingerprintjs.com/docs/subdomain-integration). Using a subdomain is required for correct identification while using Fingerprint Pro.

* Send the user’s credentials together with `visitorId` and `requestId` to your authentication API.

```javascript
// Send the user’s credentials together with `visitorId` and `requestId` to your authentication API.
const loginData = {
  userName,
  password,
  visitorId: result.visitorId,
  requestId: result.requestId,
};
    
const response = await fetch('/api/authenticate', {
  method: 'POST',
  body: JSON.stringify(loginData),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

```

All next steps should be performed on the backend. If your backend logic is built on top of Node.js, you can use [FingerprintJS Server API Node.js SDK](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-server-api-nodejs-sdk).

* All next steps should be performed on the backend. If your backend logic is built on top of Node.js, you can use [FingerprintJS Server API Node.js SDK](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-server-api-nodejs-sdk).

```javascript
const visitorId = req.body.visitorId;
const requestId = req.body.requestId;

const isRequestIdFormatValid = /^\d{13}\.[a-zA-Z0-9]{6}$/.test(requestId);
const isVisitorIdFormatValid = /^[a-zA-Z0-9]{20}$/.test(visitorId);

if (!isRequestIdFormatValid || !isVisitorIdFormatValid) {
  reportSuspiciousActivity(req);
  persistUnsuccessfulLoginAttempt();
  return getForbiddenReponse();
}
```

* All next steps and checks will be performed using data provided by [FingerprintJS Pro Server API](https://dev.fingerprintjs.com/docs/server-api). Therefore, we need to obtain visitor data, first. Alternatively, one can also use the [Webhooks functionality](https://dev.fingerprintjs.com/docs/webhooks).

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
  persistUnsuccessfulLoginAttempt();
  // Handle error internaly, refuse login.
}

const visitorData = await visitorServerApiResponse.json();
return visitorData;
```

* The Server API response must contain information about this specific identification request. If not, the request might have been tampered with and we don't trust this identification attempt.

```javascript
if (visitorData.error || visitorData.visits.length !== 1) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* An attacker might have acquired a valid `requestId` and `visitorId` via phishing. It's recommended to check the freshness of the identification request to prevent replay attacks.

```javascript
if (new Date().getTime() - visitorData.visits[0].timestamp > 3000) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* The [Confidence Score](https://dev.fingerprintjs.com/docs/understanding-your-confidence-score) reflects the system's degree of certainty that the visitor identifier is correct. If it's lower than the certain threshold we recommend using an additional way of verification, e.g. 2FA or email.

```javascript
if (visitorData.visits[0].confidence.score < 0.95) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponseAndChallenge();
}
```

* We want to check if the authentication request comes from the same IP address as the identification request.

```javascript
// This is an example of obtaining the client IP address.
// In most cases, it's a good idea to look for the right-most external IP address in the list to prevent spoofing.
if (
  request.headers['x-forwarded-for'].split(',')[0] !==
  visitorData.visits[0].ip
) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* Checks if the authentication request comes from a known origin and if the authentication request's origin corresponds to the origin provided by the FingerprintJS Pro Server API. Additionally, one should also set the [Request Filtering](https://dev.fingerprintjs.com/docs/request-filtering) in the dashboard.

```javascript
const ourOrigins = [
  'https://protect-login.example.com',
];

const visitorDataOrigin = new URL(visitorData.visits[0].url).origin;
if (
  (visitorDataOrigin !== request.headers['origin'] ||
    !ourOrigins.includes(visitorDataOrigin) ||
    !ourOrigins.includes(request.headers['origin']))
) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* We also need to get all unsuccessful attempts during the last 24 hours for this given visitor. If a visitor reached the threshold, we won’t perform login action. If the `visitorId` performed five unsuccessful login attempts during the last 24 hours, we do not perform the login. The count of attempts and time window might vary.

```javascript
// Gets all unsuccessful login attempts during the last 24 hours or the visitorId.
const visitorLoginAttemptCountQueryResult = await db.query("SELECT COUNT(*) AS count FROM login_attempts WHERE visitor_id = ? AND timestamp > ? AND login_attempt_result NOT IN (?, ?, ?)", [visitorId, new Date().getTime() - 24 * 60 * 1000, "Passed", "TooManyLoginAttempts", "Challenged"]);

// If the visitorId performed 5 unsuccessful login attempts during the last 24 hours we do not perform the login.
// The count of attempts and time window might vary.
if (visitorLoginAttemptCountQueryResult.count > 5) {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}
```

* Finally, we can check if the provided credentials are correct. It’s also a good practice to check if they’ve ever logged in using the provided `visitorId` before. If not, we recommend using an additional way of verification, e.g. 2FA or email.

```javascript
if (areCredentialsCorrect(request.body.userName, request.body.password)) {
  if (
    isLoggingInFromKnownDevice(
      visitorData.visitorId,
      mockedUser.knownVisitorIds
    )
  ) {
    persistSuccessfulLoginAttempt();
    return getOkReponse();
  } else {
    persistUnsuccessfulLoginAttempt();
    reportSuspiciousActivity(req);
    return getForbiddenReponse();
  }
} else {
  persistUnsuccessfulLoginAttempt();
  reportSuspiciousActivity(req);
  return getForbiddenReponse();
}

function isLoggingInFromKnownDevice(providedVisitorId, knownVisitorIds) {
  return knownVisitorIds.includes(providedVisitorId);
}
```

### **Challenge Actions**

You can require additional verification or authentication steps to stop fraudsters from further access for suspicious login attempts as defined by your suspicious activity logic.

In all the cases above, we suggest ignoring login attempts, notifying account owners about the suspicious activity via email/SMS/phone, or challenging the attempted login with two-factor authentication.

### Explore our Credential Stuffing prevention demo

We have built a [Credential Stuffing prevention demo](https://fingerprinthub.com/credential-stuffing) to demonstrate the above concepts. Use this demo to see how you can use Fingerprint Pro in conjunction with simple logic rules to protect a login form. If you want to explore code, check our interactive [Stackblitz demo](https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md) or open-source [GitHub repository](https://github.com/fingerprintjs/fingerprintjs-pro-use-cases). If you have any questions, please feel free to reach out to [support@fingerprintjs.com](mailto:support@fingerprintjs.com).