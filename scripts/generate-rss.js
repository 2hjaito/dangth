const { generateRssFeed } = require('../src/lib/core/generateRssFeed');

generateRssFeed()
  .then(() => console.log('✅ RSS feed generated'))
  .catch((err) => {
    console.error('❌ Failed to generate RSS:', err);
    process.exit(1);
  });
