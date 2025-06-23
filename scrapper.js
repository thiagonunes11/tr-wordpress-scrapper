const fetch = require('node-fetch');
const fs = require('fs');

async function getAllPostsContent() {
  let page = 1;
  let allContents = [];
  let keepFetching = true;

  while (keepFetching) {
    const res = await fetch(`https://testrigor.com/wp-json/wp/v2/posts?per_page=10&page=${page}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      keepFetching = false;
    } else {
      const contents = data.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        content: post.content.rendered
      }));

      allContents.push(...contents);
      page++;
    }
  }

  fs.writeFileSync('posts.json', JSON.stringify(allContents, null, 2));
  console.log('Conteúdo salvo em posts.json');
}

getAllPostsContent();
