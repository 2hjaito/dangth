import type { MarkdownContent } from './mdx'

export async function getMarkdownClient(
  type: 'posts' | 'tutorials',
  slug: string
): Promise<MarkdownContent | null> {
  try {
    const res = await fetch(`/api/mdx/${type}/${slug}`)
    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    console.error(`Failed to fetch ${type}/${slug}`, err)
    return null
  }
}
