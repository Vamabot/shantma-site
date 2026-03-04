import { Metadata } from 'next'
import Link from 'next/link'
import { getAllContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notes — Shant Marootian',
  description: 'Second brain — a living system of notes, ideas, and connections.',
}

export default async function Notes() {
  const notes = await getAllContent('notes')

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-2">Notes</h1>
        <p className="text-[#6b7280] text-sm max-w-lg">
          A living knowledge system. These are atomic notes — short, specific, and linked 
          to each other. Think of it as a second brain made visible.
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="text-[#6b7280] text-sm">Notes coming soon.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.slug} className="flex items-baseline justify-between gap-4">
              <Link 
                href={`/notes/${note.slug}`}
                className="text-sm text-[#9ca3af] hover:text-[#d1d5db] transition-colors"
              >
                {note.title}
              </Link>
              {note.date && (
                <span className="text-xs text-[#374151] shrink-0">
                  {formatDate(note.date)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
