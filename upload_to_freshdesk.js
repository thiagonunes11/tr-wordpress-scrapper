const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

async function uploadArticlesToFreshdesk() {
  try {
    // Check if environment variables are loaded
    if (!process.env.FRESHDESK_API_KEY || !process.env.FRESHDESK_API_URL) {
      console.error('Error: Missing required environment variables.');
      console.error('Please create a .env file with FRESHDESK_API_KEY and FRESHDESK_API_URL');
      return;
    }
    
    // Read the posts.json file
    const postsData = fs.readFileSync('posts.json', 'utf8');
    const posts = JSON.parse(postsData);
    
    // Take only the first 10 articles
    const first10Posts = posts.slice(0, 10);
    
    console.log(`Uploading ${first10Posts.length} articles to Freshdesk...`);
    
    const apiKey = process.env.FRESHDESK_API_KEY;
    const apiUrl = process.env.FRESHDESK_API_URL;
    
    for (let i = 0; i < first10Posts.length; i++) {
      const post = first10Posts[i];
      
      const payload = {
        title: post.title,
        description: post.content,
        status: 1,
        seo_data: {
          meta_keywords: ["testrigor", "automation", "testing"]
        }
      };
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`
          },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✓ Article ${i + 1}/10 uploaded successfully: "${post.title}"`);
          console.log(`  ID: ${result.id}, URL: ${result.url || 'N/A'}`);
        } else {
          const errorText = await response.text();
          console.error(`✗ Failed to upload article ${i + 1}/10: "${post.title}"`);
          console.error(`  Status: ${response.status}, Error: ${errorText}`);
        }
        
        // Add a small delay between requests to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`✗ Error uploading article ${i + 1}/10: "${post.title}"`);
        console.error(`  Error: ${error.message}`);
      }
    }
    
    console.log('Upload process completed!');
    
  } catch (error) {
    console.error('Error reading posts.json file:', error.message);
    console.error('Make sure you have run the scraper first to generate posts.json');
  }
}

uploadArticlesToFreshdesk();