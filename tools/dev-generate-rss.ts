import { generateRssFeed } from '../src/lib/core/generateRssFeed';

generateRssFeed().then(() => console.log('✅ Local RSS generated'));
