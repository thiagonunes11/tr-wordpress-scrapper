# tr-wordpress-scrapper
This project scrapes WP articles from a WP site and uploads them to Freshdesk
**Setup**

1. **Install dependencies**:
```npm install```

2. **Create environment file**:

Add `.env` to store credentials

3. **Add your Freshdesk API credentials to .env**

Configure your credentials:

```
# Edit .env file
FRESHDESK_API_KEY=your_api_key_here:X
FRESHDESK_API_URL=your_freshdesk_url_here
```

**Usage**

Scrape articles:
```npm run scrape```

Upload to Freshdesk:
```npm run upload```

Run both commands:
```npm start```

**Files**

`scrapper.js` - Scrapes WP articles
`upload-to-freshdesk.js` - Uploads articles to Freshdesk
`.env` - Environment variables (not committed)
`posts.json` - Generated file with scraped articles (not committed)
