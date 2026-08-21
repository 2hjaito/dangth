import { getAllPostsMeta } from '@/lib/content/post'
import PostListClient from './postListClient'
import { getRequestLocale } from '@/lib/i18n'

export default async function PostListServer() {
  const locale = await getRequestLocale()
  const posts = await getAllPostsMeta(locale)

  return <PostListClient posts={posts} />
}
