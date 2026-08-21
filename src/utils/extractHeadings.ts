import * as cheerio from 'cheerio'

export function extractHeadings(html: string) {
  const $ = cheerio.load(html)
  const headings: { id: string, text: string, level: number }[] = []

  $('h1, h2, h3').each((_, el) => {
    const id = $(el).attr('id')
    const text = $(el).text()
    const tag = el.tagName.toLowerCase()
    const level = parseInt(tag.replace('h', ''), 10)
    if (id && text) {
      headings.push({ id, text, level })
    }
  })

  return headings
}
