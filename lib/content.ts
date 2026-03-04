import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title: string
  date?: string
  description?: string
  tags?: string[]
  content: string
  html?: string
  backlinks?: BacklinkItem[]
}

export interface BacklinkItem {
  slug: string
  title: string
  section: string
}

export async function getContentItem(
  type: string,
  slug: string
): Promise<ContentItem | null> {
  const filePath = path.join(contentDir, type, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Resolve wikilinks before rendering
  const resolvedContent = resolveWikilinks(content, type)
  
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(resolvedContent)

  return {
    slug,
    title: data.title || slug,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    content,
    html: processedContent.toString(),
  }
}

export async function getAllContent(type: string): Promise<ContentItem[]> {
  const dir = path.join(contentDir, type)
  
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  const items = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(dir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      content,
    }
  })

  // Sort by date descending
  return items.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export async function getRecentContent(
  type: string,
  limit: number
): Promise<ContentItem[]> {
  const all = await getAllContent(type)
  return all.slice(0, limit)
}

export function getAllSlugs(type: string): string[] {
  const dir = path.join(contentDir, type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function getBacklinks(targetSlug: string, sourceType: string): BacklinkItem[] {
  const dir = path.join(contentDir, sourceType)
  if (!fs.existsSync(dir)) return []

  const backlinks: BacklinkItem[] = []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    if (slug === targetSlug) continue

    const filePath = path.join(dir, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Check for wikilinks to targetSlug
    const wikilinkRegex = /\[\[([^\]]+)\]\]/g
    let match
    while ((match = wikilinkRegex.exec(content)) !== null) {
      const linked = match[1].split('|')[0].trim()
      const linkedSlug = linked.toLowerCase().replace(/\s+/g, '-')
      if (linkedSlug === targetSlug || linked === targetSlug) {
        backlinks.push({
          slug,
          title: data.title || slug,
          section: sourceType,
        })
        break
      }
    }
  }

  return backlinks
}

function resolveWikilinks(content: string, sourceType: string): string {
  // [[Note Title]] → [Note Title](/notes/note-title)
  // [[Note Title|Display Text]] → [Display Text](/notes/note-title)
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, inner) => {
    const parts = inner.split('|')
    const target = parts[0].trim()
    const display = parts[1]?.trim() || target
    const slug = target.toLowerCase().replace(/\s+/g, '-')
    
    // Try to determine the section
    const targetPath = `/notes/${slug}`
    return `<a href="${targetPath}" class="wikilink">${display}</a>`
  })
}
