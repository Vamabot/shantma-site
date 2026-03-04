import Link from 'next/link'
import { getRecentContent } from '@/lib/content'

export default async function Home() {
  const recentEssays = await getRecentContent('essays', 3)
  const recentNotes = await getRecentContent('notes', 4)

  return (
    <div className="space-y-16">
      {/* Intro */}
      <section>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-4">
          Shant Marootian
        </h1>
        <p className="text-[#9ca3af] leading-relaxed mb-4">
          Entrepreneur, builder, systems thinker. I build things at the intersection of 
          technology, capital, and human coordination.
        </p>
        <p className="text-[#9ca3af] leading-relaxed">
          Currently: building agentic organizations and{' '}
          <a 
            href="https://capitalonchain.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
          >
            Capital Onchain
          </a>
          . 
          The goal is always the same — create real value, for real people.
        </p>
      </section>

      {/* What I'm working on */}
      <section>
        <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-6">
          Now
        </h2>
        <ul className="space-y-3 text-[#9ca3af]">
          <li className="flex gap-3">
            <span className="text-[#374151] mt-1">—</span>
            <span>Building AI-native organizations that operate faster than human consensus</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#374151] mt-1">—</span>
            <span>Exploring on-chain capital formation and programmable incentives</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#374151] mt-1">—</span>
            <span>Writing about mental models, systems, and how I think</span>
          </li>
        </ul>
      </section>

      {/* Recent Essays */}
      {recentEssays.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">
              Essays
            </h2>
            <Link href="/essays" className="text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors">
              All essays →
            </Link>
          </div>
          <ul className="space-y-4">
            {recentEssays.map((item) => (
              <li key={item.slug}>
                <Link href={`/essays/${item.slug}`} className="group block">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[#d1d5db] group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                    {item.date && (
                      <span className="text-xs text-[#4b5563] shrink-0">
                        {formatDate(item.date)}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-[#6b7280] mt-1">{item.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent Notes */}
      {recentNotes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">
              Notes
            </h2>
            <Link href="/notes" className="text-xs text-[#6b7280] hover:text-[#9ca3af] transition-colors">
              All notes →
            </Link>
          </div>
          <ul className="space-y-2">
            {recentNotes.map((item) => (
              <li key={item.slug}>
                <Link 
                  href={`/notes/${item.slug}`}
                  className="text-sm text-[#9ca3af] hover:text-[#d1d5db] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Connect */}
      <section className="pt-4">
        <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-6">
          Connect
        </h2>
        <div className="flex gap-6 text-sm">
          <a 
            href="https://x.com/shantma" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#9ca3af] hover:text-[#d1d5db] transition-colors"
          >
            X / Twitter
          </a>
          <a 
            href="https://linkedin.com/in/shantmarootian" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#9ca3af] hover:text-[#d1d5db] transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:shant@shantma.com"
            className="text-[#9ca3af] hover:text-[#d1d5db] transition-colors"
          >
            Email
          </a>
        </div>
      </section>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
