---
templateKey: use-case-content
metadata:
  title: Personalization - Technical Use Cases - Fingerprint Pro
  description: Most of your visitors are anonymous. Here’s how to tailor their
    experience without requiring sign-in.
  url: http://www.fingerprint.com/use-cases/personalization
  image: /img/uploads/account-takeover.png
  imageAlt: login screen
  imageTitle: login screen
  socialImage: /img/uploads/account-takeover.png
publishDate: 2022-08-12T17:17:34.973Z
isPublished: true
title: Personalization
description: Most of your visitors are anonymous. Here’s how to tailor their
  experience without requiring sign-in.
funnel:
  - Login
category:
  - Authentication
industry:
  - Identity Management
useCaseCode:
  iframeUrl: https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md
  button1:
    url: ""
    buttonText: ""
  button2:
    url: https://github.com/fingerprintjs/fingerprintjs-pro-use-cases
    buttonText: View demo source on GitHub
---
## **What is user personalization?**

User personalization is the delivery of content and functionality that fits a user’s wants and needs, without any effort required by the user.

“The term “eCommerce personalization” relates to the set of practices in which an online store displays dynamic content based on customer data, such as demographics, intent, preferences, browsing history, previous purchases, and device usage—for instance, whether the customer is shopping on a mobile, tablet, or even a smartwatch.” - [Magnolia CMS](<https://www.magnolia-cms.com/blog/ecommerce-personalization-everything-you-need-to-know.html#:~:text=The term “ecommerce personalization” relates,mobile%2C tablet%2C or even a>)

## **Why is user personalization important?**

Providing your users with a seamless, tailored experience helps with:

* Reducing bounce rates
* Improving conversion rates
* Increasing sales and revenue

## **How to Reduce Bounce Rate, Improve Conversions, and Increase Sales through Personalization**

### **Remember Light/Dark Mode Preference**

Offering a “dark mode” is proven to reduce bounce rates and retain visitors. Typically, a visitor’s site preferences are stored in session or local storage which does not persist between browsing modes (normal and incognito).

Browsing fingerprinting allows websites to remember anonymous visitor preferences regardless of a visitor’s browsing mode.

* On the light/dark mode toggle, save preference as a `linkedId` in Fingerprint request
* Look up `linkedId` on app launch using the server API

**Demo**: [Storing Anonymous Browsing Preferences Using Browser Fingerprinting](https://fingerprint.com/blog/storing-anonymous-browser-preferences/)

**Case Study:** [How Terra improved user engagement thanks to Dark Mode](https://web.dev/terra-dark-mode/)

### **Geolocation Suggestions**

Apps like Airbnb display content based on time to return visits, such as days or weeks later. An example of this is [Mozilla's Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

### **Stored Shopping Carts**

Persistent items in a visitor’s shopping cart can reduce sales lost to shopping cart abandonment. Remembering shopping carts days up to weeks can also decrease checkout time for return visitors.

* Save a list of items associated with a stable, unique identifier called “`visitorId`”
* When visiting the shopping cart, pull the list of items, if any, by the `visitorId`

### **Purchase and Browsing History**

Saving product purchases and browsing history can help drive sales from return visitors. Typical cookie-based solutions, fortunately for everyone, do not work when a visitor switches from normal to private browsing mode (or vice versa). We can solve this problem with browser fingerprinting.

* Fingerprint at checkout, return purchase history to the logged out user when they return and visitorId is a match.
* Fingerprint each session, save browsed items to the visitorId, and display the list when a visitor returns.

**Article:** [56% of shoppers more likely to return a site that recommends products](https://www.invespcro.com/blog/online-shopping-personalization/)

### **E-Commerce Promotions**

Running e-commerce promotions without user verification is risky and prone to abuse. Traditional methods of verification require signing up for email or phone number marketing lists. Fortunately, we can streamline the verification process without the user knowing. A stable and unique identifier is great for assigning promotions to anonymous visitors and preventing duplicate promotion abuse. Furthermore, promotions can be uniquely applied based on certain visit behavior, i.e. return visits.

* Reward visitors with free shipping after a certain number of visits to a landing page
* Offer limited-time promo codes for return visitors after numerous cart abandonments

## How to Increase Sales through Personalization with Fingerprint Pro

Fingerprint Pro provides a unique identifier for every visitor to your website (the `visitorId`) collected behind the scenes anytime someone performs a specific action with our JavaScript fingerprinting agent installed. Since the client-side data might be forged, Fingerprint Pro also provides tools for validating these identifiers sent by your front end. As a result, you can provide your users with a tailored experience between incognito and normal mode even without cookies.

Since you know your product and business landscape best, it’s up to you to decide how to configure personalization workflows to utilize the `visitorId` to improve user experience. Below, we have described some steps and best practices to use as a starting point for your custom solution.

### Configuring Fingerprint Pro for Personalization use-cases

We recommend that when a new user requests your site content, the `visitorId` and `requestId` are sent to your application server. Using this data, you can return personalized content such as search history, customized user interface, or even the user’s shopping cart.

At first, you need to obtain `visitorId` and `requestId` from Fingerprint Pro. Then, for the specific content that should be personalized, such as shopping cart, search queries, or dark mode, send these pieces of information within your request, persist necessary data if needed, and provide personalized content. Here are a few steps to provide these features to your users.

To start, you need to add the Fingerprint Pro [JavaScript agent](https://dev.fingerprintjs.com/docs/js-agent) to your webpage. Alternatively, if your frontend uses modern frameworks such as [React.js](https://dev.fingerprintjs.com/docs/fingerprintjs-pro-react) or [Angular](https://dev.fingerprintjs.com/docs/angular), one can use one of [our libraries](https://github.com/orgs/fingerprintjs/repositories) instead.

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
  .then(fpResult => { result = fpResult })
```

The `endpoint` property is quite important and is used for the [custom subdomain setup](https://dev.fingerprintjs.com/docs/subdomain-integration). Using a subdomain is required for correct identification while using Fingerprint Pro.

### Personalized Shopping Cart Content

Send the user's `visitorId` and `requestId` to your servers when requesting shopping cart content.

To get the user’s cart content on the server side, use similar code to the following.

```javascript
// Returns cart items for the given visitorId
const cartItems = await UserCartItem.findAll({
  where: {
    visitorId: {
      [Op.eq]: visitorId,
    },
  },
  order: [['timestamp', 'DESC']],
  include: Product,
});

return res.status(200).json({
  data: cartItems,
  size: cartItems.length,
});
```

To add an item to the user's shopping cart, update cart items for the given `visitorId`.

```javascript
// Adds an item to cart for the given visitorId
const [cartItem, created] = await UserCartItem.findOrCreate({
  where: {
    visitorId: {
      [Op.eq]: visitorId,
    },
    productId: {
      [Op.eq]: productId,
    },
  },
  defaults: {
    visitorId,
    count: 1,
    timestamp: new Date(),
    productId,
  },
});

if (!created) {
  cartItem.count++;

  await cartItem.save();
}

return res.status(200).json({
  data: cartItem,
});
```

### Personalized Search History

Send the user's `visitorId` and `requestId` when getting search history.

```javascript
// Get user search history for given visitorId
const history = await UserSearchHistory.findAll({
  order: [['timestamp', 'DESC']],
  where: {
    visitorId: {
      [Op.eq]: visitorId,
    },
  },
});

return res.status(200).json({
  data: history,
  size: history.length,
});
```

Similarly, to update the user's search history, use the following code to persist or retrieve the search history for the specific `visitorId`.

```javascript
// Persists search query for given visitorId
const existingHistory = await UserSearchHistory.findOne({
  where: {
    query: {
      [Op.eq]: query,
    },
    visitorId: {
      [Op.eq]: visitorId,
    },
  },
});

if (existingHistory) {
  existingHistory.timestamp = new Date().getTime();
  await existingHistory.save();
  return;
}

await UserSearchHistory.create({
  visitorId,
  query,
  timestamp: new Date().getTime(),
});
```

### User's Preferences and Dark Mode

Analogically, you can get or set other users' preferences such as user interface dark mode.

To get or set user's preferences according to their `visitorId`:

```javascript
// Updates user preferences for given visitorId
const { hasDarkMode } = JSON.parse(req.body);
const hasDarkModeBool = Boolean(hasDarkMode);

const [userPreferences, created] = await UserPreferences.findOrCreate({
  where: {
    visitorId: {
      [Op.eq]: visitorId,
    },
  },
  defaults: {
    visitorId,
    hasDarkMode: hasDarkModeBool,
  },
});

if (!created) {
  userPreferences.hasDarkMode = hasDarkModeBool;
  await userPreferences.save();
}

return res.status(200).json({
  data: userPreferences,
});
```

### Trusting the `visitorId` and `requestId` provided by the Client Side

Since data such as `visitorId` and `requestId` provided by the client-side might be spoofed, it's a good practice to check and validate provided data with our [Server API](https://dev.fingerprint.com/docs/server-api) or [Webhooks](https://dev.fingerprint.com/docs/webhooks). If some validation fails, we recommend serving default content instead. Take a look at the [source code](https://github.com/fingerprintjs/fingerprintjs-pro-use-cases/blob/main/api/personalization/visitor-validations.js) for more advanced validations or check recommended approaches for the [Payment Fraud](https://github.com/fingerprintjs/fingerprintjs-pro-use-cases/blob/main/pages/api/payment-fraud/place-order.js) use case.

### Explore our Personalization demo

We have a [Personalization demo](https://fingerprinthub.com/personalization) to demonstrate the above concepts. Use the demo to visualize using Fingerprint Pro in conjunction with simple logic rules provides a tailored experience to your users. If you want to explore code, check our interactive [Stackblitz demo](https://stackblitz.com/edit/nextjs-dmv5c7?file=README.md) or open-source GitHub repository. If you have any questions, please feel free to reach out to [support@fingerprint.com](mailto:support@fingerprint.com).