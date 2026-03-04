import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentItem, getAllSlugs } from '@/lib/content'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('essays')
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const essay = await getContentItem('essays', params.slug)
  if (!essay) return {}
  return {
    title: `${essay.title} — Shant Marootian`,
    description: essay.description,
  }
}

export default async function EssayPage({ params }: Props) {
  const essay = await getContentItem('essays', params.slug)
  if (!essay) notFound()

  return (
    <article className="space-y-8">
      <div>
        <Link 
          href="/essays" 
          className="text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors mb-6 block"
        >
          ← Essays
        </Link>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-2">{essay.title}</h1>
        {essay.date && (
          <p className="text-sm text-[#6b7280]">{formatDate(essay.date)}</p>
        )}
      </div>

      {essay.description && (
        <p className="text-[#9ca3af] text-lg leading-relaxed border-l-2 border-[#1f2937] pl-4">
          {essay.description}
        </p>
      )}

      <div 
        className="prose max-w-none text-[#d1d5db] leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: essay.html || '' }}
      />

      {essay.tags && essay.tags.length > 0 && (
        <div className="pt-8 border-t border-[#1f2937] flex flex-wrap gap-2">
          {essay.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded bg-[#1f2937] text-[#6b7280]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
