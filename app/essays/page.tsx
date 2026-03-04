import { Metadata } from 'next'
import Link from 'next/link'
import { getAllContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Essays — Shant Marootian',
  description: 'Long-form writing on systems, technology, capital, and building.',
}

export default async function Essays() {
  const essays = await getAllContent('essays')

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-2">Essays</h1>
        <p className="text-[#6b7280] text-sm">
          Long-form thinking on systems, technology, capital, and building.
        </p>
      </div>

      {essays.length === 0 ? (
        <p className="text-[#6b7280] text-sm">Coming soon.</p>
      ) : (
        <ul className="space-y-8">
          {essays.map((essay) => (
            <li key={essay.slug}>
              <Link href={`/essays/${essay.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-[#d1d5db] font-medium group-hover:text-white transition-colors">
                    {essay.title}
                  </h2>
                  {essay.date && (
                    <span className="text-xs text-[#4b5563] shrink-0">
                      {formatDate(essay.date)}
                    </span>
                  )}
                </div>
                {essay.description && (
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {essay.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
