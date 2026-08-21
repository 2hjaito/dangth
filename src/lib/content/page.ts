import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToHtml } from '../core/mdx'

const pagesDir = path.join(process.cwd(), 'docs/pages')

export type PageBlock =
  | { type: 'markdown'; html: string }
  | { type: 'hero'; data: HeroBlock }
  | { type: 'skills'; data: SkillsBlock }
  | { type: 'expand-list'; title?: string; data: ExpandItemBlock[] }
  | { type: 'github-contributions'; title?: string; data: Record<string, never> }
  | { type: 'github-repositories'; title?: string; data: GithubRepositoriesBlock }
  | { type: 'certifications'; title?: string; data: CertificationBlock[] }
  | { type: 'cert-groups'; title?: string; data: CertGroupBlock[] }
  | { type: 'tools'; title?: string; data: ToolBlock[] }

export interface PageContent {
  slug: string
  title: string
  blocks: PageBlock[]
}

export interface HeroBlock {
  title: string
  description: string
  srTitle?: string
  socials: SocialBlock[]
}

export interface SocialBlock {
  icon: string
  link: string
  label: string
}

export interface SkillsBlock {
  label: string
  items: string[]
}

export interface ExpandItemBlock {
  title: string
  subtitle: string
  meta: string
  logo?: string
  content: string
}

export interface CertificationBlock {
  img: string
  title: string
  org: string
  date: string
}

export interface CertGroupBlock {
  org: string
  logo: string
  certs: CertItemBlock[]
}

export interface CertItemBlock {
  title: string
  image: string
  level?: string
}

export interface GithubRepositoriesBlock {
  username?: string
  topic?: string
  sort?: 'updated-desc' | 'updated-asc' | 'stars-desc' | 'stars-asc' | 'name-asc' | 'name-desc'
}

export interface ToolBlock {
  icon: string
  title: string
  description: string
  href?: string
}

type ParsedMarkdownBlock =
  | { type: 'markdown'; content: string }
  | { type: Exclude<PageBlock['type'], 'markdown'>; content: string; format: 'json' | 'fields'; title?: string }

const pageBlockPattern = /```page:([a-z-]+)\n([\s\S]*?)```/g
const daviBlockPattern = /^:::davi:([a-z-]+)(?:[ \t]+([^\n]+))?\n([\s\S]*?)^:::\s*$/gm

function parseJsonBlock<T>(type: string, content: string): T {
  try {
    return JSON.parse(content) as T
  } catch (error) {
    throw new Error(`Invalid JSON in page:${type} block: ${(error as Error).message}`)
  }
}

type FieldValue = string | string[]
type FieldGroup = Record<string, FieldValue>

function toArray(value: FieldValue | undefined) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function toText(value: FieldValue | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

function addField(group: FieldGroup, key: string, value: string) {
  const current = group[key]
  if (!current) {
    group[key] = value
    return
  }

  group[key] = Array.isArray(current) ? [...current, value] : [current, value]
}

function parseFieldGroups(content: string, splitKey?: string): FieldGroup[] {
  const groups: FieldGroup[] = []
  let current: FieldGroup = {}
  let activeKey: string | null = null

  for (const line of content.split('\n')) {
    const field = line.match(/^\[([a-zA-Z][\w-]*)\]\s*(.*)$/)

    if (field) {
      const [, key, value] = field

      if (splitKey && key === splitKey && Object.keys(current).length > 0) {
        groups.push(current)
        current = {}
      }

      addField(current, key, value.trim())
      activeKey = key
      continue
    }

    if (activeKey && line.trim()) {
      const previous = toText(current[activeKey])
      current[activeKey] = previous ? `${previous}\n${line.trim()}` : line.trim()
    }
  }

  if (Object.keys(current).length > 0) {
    groups.push(current)
  }

  return groups
}

function parseDelimited(value: string) {
  return value.split('|').map((item) => item.trim())
}

function parseDaviBlock(type: string, content: string) {
  switch (type) {
    case 'hero': {
      const fields = parseFieldGroups(content)[0] ?? {}
      return {
        title: toText(fields.title) || toText(fields.name),
        description: toText(fields.description) || toText(fields.role),
        srTitle: toText(fields.srTitle) || undefined,
        socials: toArray(fields.social).map((value) => {
          const [icon, link, label] = parseDelimited(value)
          return { icon, link, label }
        }),
      } satisfies HeroBlock
    }
    case 'skills': {
      const fields = parseFieldGroups(content)[0] ?? {}
      return {
        label: toText(fields.label),
        items: toText(fields.items).split(',').map((item) => item.trim()).filter(Boolean),
      } satisfies SkillsBlock
    }
    case 'expand-list':
      return parseFieldGroups(content, 'title').map((fields) => ({
        title: toText(fields.title),
        subtitle: toText(fields.subtitle),
        meta: toText(fields.meta) || toText(fields.time),
        logo: toText(fields.logo) || undefined,
        content: toText(fields.content),
      })) satisfies ExpandItemBlock[]
    case 'github-contributions':
      return {}
    case 'github-repositories': {
      const fields = parseFieldGroups(content)[0] ?? {}
      const sort = toText(fields.sort)
      const supportedSorts = ['updated-desc', 'updated-asc', 'stars-desc', 'stars-asc', 'name-asc', 'name-desc']
      return {
        username: toText(fields.username) || undefined,
        topic: toText(fields.topic) || undefined,
        sort: supportedSorts.includes(sort) ? sort as GithubRepositoriesBlock['sort'] : 'updated-desc',
      } satisfies GithubRepositoriesBlock
    }
    case 'certifications':
      return parseFieldGroups(content, 'title').map((fields) => ({
        img: toText(fields.img),
        title: toText(fields.title),
        org: toText(fields.org),
        date: toText(fields.date),
      })) satisfies CertificationBlock[]
    case 'cert-groups':
      return parseFieldGroups(content, 'org').map((fields) => ({
        org: toText(fields.org),
        logo: toText(fields.logo),
        certs: toArray(fields.cert).map((value) => {
          const [title, image, level] = parseDelimited(value)
          return { title, image, level: level || undefined }
        }),
      })) satisfies CertGroupBlock[]
    case 'tools':
      return parseFieldGroups(content, 'title').map((fields) => ({
        icon: toText(fields.icon),
        title: toText(fields.title),
        description: toText(fields.description),
        href: toText(fields.href) || undefined,
      })) satisfies ToolBlock[]
    default:
      throw new Error(`Unknown davi block: ${type}`)
  }
}

function getStructuredMatches(content: string) {
  const matches = [
    ...Array.from(content.matchAll(pageBlockPattern)).map((match) => ({
      raw: match[0],
      index: match.index ?? 0,
      type: match[1],
      blockContent: match[2],
      format: 'json' as const,
      title: undefined,
    })),
    ...Array.from(content.matchAll(daviBlockPattern)).map((match) => ({
      raw: match[0],
      index: match.index ?? 0,
      type: match[1],
      title: match[2]?.trim(),
      blockContent: match[3],
      format: 'fields' as const,
    })),
  ]

  return matches.sort((a, b) => a.index - b.index)
}

function splitPageBlocks(content: string): ParsedMarkdownBlock[] {
  const blocks: ParsedMarkdownBlock[] = []
  let cursor = 0

  for (const match of getStructuredMatches(content)) {
    const { raw, type, blockContent, format, title, index } = match
    const markdown = content.slice(cursor, index).trim()

    if (markdown) {
      blocks.push({ type: 'markdown', content: markdown })
    }

    blocks.push({
      type: type as ParsedMarkdownBlock['type'],
      content: blockContent.trim(),
      format,
      title,
    })

    cursor = index + raw.length
  }

  const tail = content.slice(cursor).trim()
  if (tail) {
    blocks.push({ type: 'markdown', content: tail })
  }

  return blocks
}

export async function getPage(slug: string): Promise<PageContent | null> {
  const filePath = path.join(pagesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  const blocks = await Promise.all(
    splitPageBlocks(content).map(async (block): Promise<PageBlock> => {
      if (block.type === 'markdown') {
        return { type: 'markdown', html: await markdownToHtml(block.content) }
      }

      const parseBlock = <T,>(type: string, blockContent: string) =>
        block.format === 'fields'
          ? parseDaviBlock(type, blockContent) as T
          : parseJsonBlock<T>(type, blockContent)

      switch (block.type) {
        case 'hero':
          return { type: 'hero', data: parseBlock<HeroBlock>(block.type, block.content) }
        case 'skills':
          return { type: 'skills', data: parseBlock<SkillsBlock>(block.type, block.content) }
        case 'expand-list':
          return { type: 'expand-list', title: block.title, data: parseBlock<ExpandItemBlock[]>(block.type, block.content) }
        case 'github-contributions':
          return { type: 'github-contributions', title: block.title, data: {} }
        case 'github-repositories':
          return { type: 'github-repositories', title: block.title, data: parseBlock<GithubRepositoriesBlock>(block.type, block.content) }
        case 'certifications':
          return { type: 'certifications', title: block.title, data: parseBlock<CertificationBlock[]>(block.type, block.content) }
        case 'cert-groups':
          return { type: 'cert-groups', title: block.title, data: parseBlock<CertGroupBlock[]>(block.type, block.content) }
        case 'tools':
          return { type: 'tools', title: block.title, data: parseBlock<ToolBlock[]>(block.type, block.content) }
        default:
          throw new Error('Unknown page block')
      }
    })
  )

  return {
    slug,
    title: data.title ?? slug,
    blocks,
  }
}