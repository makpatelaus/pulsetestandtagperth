PULSE TEST AND TAG PERTH — GITHUB PAGES VERSION

FREE HOSTING
This version is static HTML/CSS/JavaScript and is designed for GitHub Pages.
GitHub Pages does not run PHP, so the quote form uses FormSubmit for email delivery.

FILES
- index.html          Main website
- styles.css          Website styling
- app.js              Quote calculator + FormSubmit preparation
- thanks.html         Thank-you page
- assets/pulse-logo.png
- .nojekyll           Prevents Jekyll processing of the static files

HOW TO PUBLISH
1. Create a free GitHub account at https://github.com/
2. Create a NEW PUBLIC repository.
3. Easiest option: name it YOUR-GITHUB-USERNAME.github.io
   Example: makpatel.github.io
4. Upload ALL files in this folder. Make sure index.html is at the top level.
5. Open repository Settings > Pages.
6. Under Build and deployment, choose "Deploy from a branch".
7. Select Branch: main and Folder: / (root), then Save.
8. Wait a few minutes. GitHub will show the live site URL.

FORM EMAIL SETUP
The form is configured for:
mak.p@pulsetestandtag.com.au

The first time the quote form is submitted, FormSubmit sends an activation/confirmation
email to that address. Click the activation link. After activation, future submissions
will be forwarded to Mak, and the customer will receive the automatic response.

IMPORTANT
- Do not put passwords, API keys, or private customer data in this repository.
- GitHub Pages sites are public on the internet.
- This version does not require a paid domain or paid hosting.
- FormSubmit is an external free form-email service; its service terms/privacy policy apply.

FREE URL EXAMPLE
https://YOUR-GITHUB-USERNAME.github.io/

PROJECT-REPOSITORY OPTION
If you instead name the repository pulse-test-and-tag, the URL will be:
https://YOUR-GITHUB-USERNAME.github.io/pulse-test-and-tag/
The website code is designed to work from that path too.
