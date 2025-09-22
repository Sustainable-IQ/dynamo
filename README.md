DynamoWebsite

This repository contains the static website for the DYNAMO project, deployed via Cloudflare Pages under my custom domain.

📂 Project Structure

dynamowebsite/
├─ index.html → Landing page (/)
├─ bmad-dynamo-brief/ → /bmad-dynamo-brief
│ └─ index.html
├─ demo/ → /demo/
│ ├─ index.html → demo homepage
│ ├─ community/ → /demo/community
│ │ └─ index.html
│ └─ memorydashboard/ → /demo/memorydashboard
│ └─ index.html
├─ assets/ → shared CSS and JS
│ ├─ common.css
│ ├─ mainsite.css
│ ├─ demositeindex.css
│ ├─ community.css
│ ├─ memorydashboard.css
│ └─ demodata.js
└─ CNAME → defines custom domain for Cloudflare

🌐 Deployment

Hosted on Cloudflare Pages

Root directory is set to: dynamowebsite

Custom domain managed via CNAME file

URLs served:

/

/bmad-dynamo-brief

/demo/

/demo/community

/demo/memorydashboard

🔧 Local Development

Clone the repo and cd into project.

Use a simple static server to test locally:

Python 3:
python -m http.server 8080

Then visit: http://localhost:8080

🚀 Git Essentials

Check what repo you’re pushing to: git remote -v

Confirm your current branch: git branch --show-current

Push changes:

git add .

git commit -m "Update site"

git push origin main

📝 Notes

This repo is structured to ensure clean URLs without .html endings.

All deploys happen automatically on push to the main branch.

Cloudflare Pages is configured to publish only from the dynamowebsite/ folder.
