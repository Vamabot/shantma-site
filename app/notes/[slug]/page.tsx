import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentItem, getAllSlugs, getBacklinks } from '@/lib/content'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('notes')
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getContentItem('notes', params.slug)
  if (!note) return {}
  return {
    title: `${note.title} — Shant Marootian`,
    description: note.description,
  }
}

export default async function NotePage({ params }: Props) {
  const note = await getContentItem('notes', params.slug)
  if (!note) notFound()

  const backlinks = getBacklinks(params.slug, 'notes')

  return (
    <article className="space-y-8">
      <div>
        <Link 
          href="/notes" 
          className="text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors mb-6 block"
        >
          ← Notes
        </Link>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-2">{note.title}</h1>
        {note.date && (
          <p className="text-sm text-[#6b7280]">{formatDate(note.date)}</p>
        )}
      </div>

      <div 
        className="prose max-w-none text-[#d1d5db] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: note.html || '' }}
      />

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded bg-[#1f2937] text-[#6b7280]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {backlinks.length > 0 && (
        <div className="pt-8 border-t border-[#1f2937]">
          <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-4">
            Linked from
          </h2>
          <ul className="space-y-2">
            {backlinks.map(bl => (
              <li key={bl.slug}>
                <Link 
                  href={`/notes/${bl.slug}`}
                  className="text-sm text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
                >
                  {bl.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
