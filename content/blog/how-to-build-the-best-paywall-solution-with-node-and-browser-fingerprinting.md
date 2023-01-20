---
templateKey: long-form-content
metadata:
  title: How to Build the Best Paywall Solution with Node and Browser
    Fingerprinting - Fingerprint
  url: https://fingerprint.com/blog/paywall-solution
  description: Creating high-quality digital content is time-consuming and
    expensive. Creating a paywall helps websites generate revenue through
    subscriptions to consume articles. In this how-to, we’ll show you how to
    create a content paywall to limit free articles utilizing Node and Browser
    fingerprinting.
  image: /img/uploads/paywall-banner.png
  imageAlt: Paywall software solution
  imageTitle: Paywall software solution
featured: false
publishDate: 2021-05-12T16:26:22.579Z
title: How to Build the Best Paywall Solution with Node and Browser Fingerprinting
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - js
  - paywall
authors:
  - Lukonde Mwila
heroImage:
  image: /img/uploads/paywall-banner.png
  imageAlt: Paywall notification
  imageTitle: Paywall notification
customCTA:
  openCtaNewTab: true
  title: Sign Up for Fingerprint
  description: Start identifying anonymous site visitors with 99.5% accuracy to
    prevent online fraud
  ctaText: Create Free Account
  ctaUrl: https://dashboard.fingerprint.com/signup?&utm_source=blog&utm_medium=website&utm_campaign=blog
---
Paywalls are becoming commonplace as online publications transition from monetization through digital advertising to charging consumers directly for high-quality premium content. And right on their heels are numerous innovations in circumventing them. For developers tasked with restricting site access to subscribers, keeping up with current paywall architecture and the latest tricks for getting around them is essential. Know what you’re guarding against before building your paywall.

There are varying levels of restriction when it comes to paywalls. However, content paywalls fall into two categories:

* **Hard paywall:** Requires a subscription-based membership plan to access high-quality content. Policies are enforced server-side.
* **Soft paywall:** Limits the number of free articles accessible before requiring a subscription for premium content. Policies are enforced client-side.

As you probably know, there are various measures a reader can take to circumvent or bypass a paywall:

* Using a browser extension
* Using an ad blocker extension
* Blocking HTTP requests for popular paywall libraries
* Switching to private browsing or incognito mode
* Signing up for a free account, sometimes with multiple email addresses
* Resetting browser cookies
* Hiding their IP address
* Manually deleting the paywall source code

Many websites depend on third-party tools and libraries for their paywall implementations instead of developing in-house solutions. Vendors like [Fingerprint](https://fingerprint.com/), for example, offer “paywall-as-a-service” products.

## Creating a Soft Paywall Sample Site

In this post, you will create a news website using Node.js and implement a soft paywall using Fingerprint to track users and limit the number of articles they can read on your site. Each site visitor will have their unique ID from Fingerprint stored inside a database to track the number of unique articles they have read.

The complete source code, along with access to the [Pug templates](https://pugjs.org/api/getting-started.html) and the public static assets, can be found in [this GitHub repository](https://github.com/LukeMwila/fingerprintjs-paywall).

Prerequisites:

* Node.js version 10 or higher installed on your computer.
* A basic understanding of JavaScript.
* PostgreSQL server installed.
* Created database and user with access granted.

### Sign Up for Fingerprint

First, create an account with Fingerprint. The sign-up process is quick, intuitive, and conventional, and you can try it without usage limits for ten days.


Once you sign up, there is a quick start guide for a CDN and an NPM implementation. The code snippet for each approach will include your generated public API key, which you’ll use later in this tutorial, so keep this value close at hand. You can access the API Keys page from the left-side menu at any point to fetch and generate public and secret API keys.

### Set Up the Web Application

You can set up your application environment and create the relevant folder structure. Then, provided that you have all the prerequisites outlined earlier, you can proceed to initialize your Node.js application.

```
npm init 
```

You can then fill in the relevant details when prompted by the terminal, which generates a package.json file. The next step will be to install the following application dependencies:

* [Express](https://expressjs.com/): A Node.js web framework
* [Pug](https://pugjs.org/api/getting-started.html): A template engine for generating HTML
* [Node Postgres](https://node-postgres.com/): A PostgreSQL client for Node.js

To install these dependencies in your workspace, run the following command in the same directory of package.json file:

```
npm i --save express pg pug
```

The folder structure for the application is based on the following paradigm:

* Public: The location for all client-side static access. i.e., images, CSS, and JavaScript files
* Source: The location for the backend business logic
* Views: The location for the frontend Pug templates

You can create these folders in your root directory to match the following structure:

```
├── node_moduiles/
├── public/
├── src/
├── views/
├── package-lock.json
└── package.json
```

The last step for you to carry out in this section is to modify the `package.json` file. After that, the application will require a script to start the server, so you can run the following node command against the main server file that you’ll create in the next section:

```
 "scripts": {
    "start": "node src/index.js"
 }
```

### Configure the Database Connection

Next, you’ll configure the PostgreSQL client to connect to the database server. The database will have a single table to track the articles read by a single site visitor.

Inside the source directory (`src`), you can create a file called `index.js`. In this file, you will import the PostgreSQL client library and configure it with the relevant database user details to establish a connection and create a table to record the unique articles read per visitor.

```
const { Pool } = require("pg");

const pgClient = new Pool({
   user: '',
   host: 'localhost',
   database: '',
   password: '',
   port: 5432
});
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
 .query(
   `
   create table article_reads (
     id serial primary key,
     visitor_id text not null,
     article_id int not null,
     created_at timestamp default now()
   )
`
 )
 .catch(err => console.log(err));

pgClient
 .query(`create index idx_article_reads_on_visitor_id on article_reads(visitor_id)`)
 .catch(err => console.log(err));
```

### Set Up the Template Engine with Express

This section will provide the required settings to render the frontend templates. First, implement the following changes in the `src/index.js` file. After that, you can import the Express framework and initialize an Express application.

```
const express = require("express");
const app = express();
```

After this, you can configure your application to render the Pug template files. To accomplish this, you can update the application settings with the following properties:

* Views: This will determine the directory location of the template files.
* View engine: This determines the template engine the application should use.

In addition to this, you can serve static files from the public directory using the `express.static` built-in middleware function. 

```
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
```

Then create a route to render the `home.pug` file:

```
app.get("/", (req, res) => {
 res.render("home");
});
```

### Create API Routes

In the previous section, you configured the Express application to render Pug templates from the views directory. The following steps are for you to ensure that the application displays the relevant premium content based on the selected article and enable the paywall when a user surpasses the free content threshold.

To display content for a specific article, add the following code snippet to the `index.js` file:

```
app.get("/articles/:id", (req, res) => {
 let id = req.params['id']
 res.render(`articles/article-${id}`)
});
```

The route handling the logic for enabling the paywall will require additional helper functions. These helper functions query the database to check if a visitor has reached their maximum number of articles and to insert a new record in the database when they read a new article for the first time.

```
app.get("/paywall", async (req, res) => {
 let visitorId = req.query['visitorId'];
 let articleId = parseInt(req.query['articleId']);
 let articleIds = await getAlreadyReadArticleIds(visitorId);
 let paywallEnabled = true;
  // paywall is enabled only in one scenario:
 // visitor already read 2 distinct articles in the last 7 days
 // and current article is not the one that was read in the last 7 days
 if (articleIds.length < 2 || articleIds.includes(articleId)) {
   paywallEnabled = false;
   // if no paywall, we need to register current event of reading in the DB
   insertArticleReadRow(visitorId, articleId);
 }
 res.json({ enabled: paywallEnabled });
});
```

```
let getAlreadyReadArticleIds = async (visitorId) => {
 let sql = "select distinct(article_id) as article_id from article_reads where visitor_id = $1 and created_at > $2";
 let currentTimestamp = new Date().getTime();
 let weekAgoTimestamp = currentTimestamp - 7 * 24 * 3600 * 1000;
 let queryParams = [visitorId, new Date(weekAgoTimestamp)];
 let res = await pgClient.query(sql, queryParams);
 let articleIds = res.rows.map(r => r.article_id);
 return articleIds;
}

let insertArticleReadRow = async (visitorId, articleId) => {
 let sql = "insert into article_reads(visitor_id, article_id) values ($1, $2)";
 let insertParams = [visitorId, articleId];
 await pgClient.query(sql, insertParams);
}
```

### Implement the Paywall

Finally, implement the paywall for your news website. You’ll add the scripts to the main layout template to ensure that the Fingerprint library is loaded and initialized across all website pages.

```
doctype html
head
 meta(charset='utf-8')
 meta(name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no')
 title Tennis Chronicles
 link(href="https://fonts.googleapis.com/css?family=Miriam+Libre&display=swap" rel="stylesheet")
 link(href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet')
 link(href='/css/main.css' rel='stylesheet')
 script(async src="https://www.googletagmanager.com/gtag/js?id=UA-144459549-2")
 script.
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'UA-144459549-2');
body
 header
   .navbar.navbar-dark.bg-dark
     .container
       a.navbar-brand(href='/')
         img.img-fluid(src="/img/logo.png")
 main
   block content
 footer.text-center.py2
   .container
     .row
       .col
         | &copy; Tennis Chronicles, 2021
         p
           b Disclaimer:&nbsp;
           | Not a real newspaper. Created to demonstrate the
           a(href="https://fingerprint.com" target="_blank") Fingerprint Pro Paywall technology
           | , provided by
           a(href="https://fingerprint.com" target="_blank") fingerprint.com
     .row.mb-2
       .col.text-center
         a(href="https://github.com/fingerprintjs/paywall-demo" target="_blank")
           img(src="/img/github.svg" height="30px")

 include modal
 script(src="https://code.jquery.com/jquery-3.3.1.min.js")
 script(src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js")
 script(src="/js/main.js")
 script(
   async
   src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
   onload="initFingerprintJS()"
 )
```

The previous code snippet shows that additional JavaScript functions are loaded to the site using the `main.js` file from the `public/js` directory. This file has two parts: one is responsible for initializing Fingerprint with your public API key once the library has finished downloading. The other uses the loaded and API key configured Fingerprint object to fetch the unique visitor ID. Finally, query the paywall API route using the visitor ID to track the articles read.

```
var fpLoaded = function (fp) {
 var match = location.href.match(/articles\/(\d+)$/)
 if(!match){
   return
 }
 fp.get().then(function (res) {
   var query = {
     visitorId: res.visitorId,
     articleId: match[1]
   };
   $.getJSON("/paywall", query, function (res) {
     if(res.enabled){
       $("#paywall-modal").modal({ keyboard: false, show: true, backdrop: "static" });
     }
   });
 });
}

function initFingerprintJS() {
 FingerprintJS.load({apiKey: 'your-public-api-key', region: 'eu'})
   .then(fp => fpLoaded(fp));
}
```

### Test the Application

Before you test the application, ensure that all the Pug templates are stored inside the views directory and add the required static assets inside the public directories for the CSS files and images. You can then run the main script command in the root directory of your application.

```
npm start
```

When the server runs, you can access your news website at: `http://localhost:8080,` and get started reading articles as you would on other sites. However, as soon as you exceed the maximum number of articles read, the paywall modal will pop up and inform you of the need to subscribe to regain access to the site’s content.

![An article on a home page with free articles and without a paywall displayed](/img/uploads/paywall-article-on.png "An article on a home page with free articles and without a paywall displayed")

![Fingerprint’s test paywall modal for subscription based premium content](/img/uploads/paywall-test-modal.png "Fingerprint’s test paywall modal for subscription based premium content")

## Conclusion

Apart from restriction configurations, the example in this tutorial demonstrates how the usage of third-party paywall libraries typically requires minimal effort from a site integration point of view. The hard part is for companies to strategize *how* to restrict access to their content. These third-party libraries have dedicated teams to ensure that their services cater to various enforcement mechanisms, user identification, policies, and insights.

JavaScript-based websites continue to increase in popularity, and this scenario, simple as it may be, lays enough groundwork for building other Node-based solutions. For example, if you’re looking to implement a paywall, fingerprinting services like [Fingerprint](https://fingerprint.com/) are a great option to help publications restrict content access and generate revenue.