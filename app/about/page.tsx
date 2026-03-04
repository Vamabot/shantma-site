import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Shant Marootian',
  description: 'Who I am, how I think, what I believe.',
}

export default function About() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-[#f9fafb] mb-2">About</h1>
        <p className="text-[#6b7280] text-sm">Who I am, how I think, what I believe.</p>
      </div>

      <section className="prose prose-invert max-w-none space-y-6">
        <p className="text-[#9ca3af] leading-relaxed">
          I'm Shant. Entrepreneur, builder, systems thinker. Armenian-American. Based in the US.
        </p>

        <p className="text-[#9ca3af] leading-relaxed">
          Most of my energy right now is pointed at a question I can't stop thinking about: 
          <em className="text-[#d1d5db]"> what does an organization look like when intelligence is abundant?</em> 
          {' '}We're building those at{' '}
          <a href="https://capitalonchain.com" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
            Capital Onchain
          </a>.
        </p>

        <p className="text-[#9ca3af] leading-relaxed">
          I've always been drawn to systems — how things connect, where leverage hides, 
          what assumptions everyone is making without realizing it. This site is an attempt 
          to think in public. It's a second brain as much as a personal brand.
        </p>
      </section>

      <section>
        <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-6">
          How I Think
        </h2>
        <ul className="space-y-4">
          {beliefs.map(({ title, body }) => (
            <li key={title} className="border-l-2 border-[#1f2937] pl-4">
              <p className="text-sm font-medium text-[#d1d5db] mb-1">{title}</p>
              <p className="text-sm text-[#6b7280] leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-6">
          What I Believe
        </h2>
        <ul className="space-y-3">
          {principles.map((p) => (
            <li key={p} className="flex gap-3 text-sm text-[#9ca3af]">
              <span className="text-[#374151] mt-0.5">—</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-6">
          Background
        </h2>
        <p className="text-sm text-[#9ca3af] leading-relaxed">
          I've built and operated across startups, worked at the intersection of technology 
          and capital markets, and spent a lot of time studying how high-performing people 
          and organizations actually work — not how they say they do.
        </p>
        <p className="text-sm text-[#9ca3af] leading-relaxed mt-4">
          I keep a notes system that's been running for years. The best ideas compound. 
          I'm trying to make that visible here.
        </p>
      </section>
    </div>
  )
}

const beliefs = [
  {
    title: 'Systems over tactics',
    body: 'Tactics are answers to questions. Systems are the ability to generate answers. Build systems.',
  },
  {
    title: 'Value is upstream of money',
    body: 'Money is a lagging indicator of value created. Get obsessed with the value, not the capture.',
  },
  {
    title: 'People are the purpose',
    body: 'Everything worth building — companies, relationships, communities — is ultimately in service of people. Never lose the thread.',
  },
  {
    title: 'Trust is compound interest',
    body: 'Trust = competence + intent. It takes years to build and seconds to destroy. Play long games with long-term people.',
  },
  {
    title: 'Clarity is kindness',
    body: 'Vague instructions, soft feedback, and buried disagreements are forms of disrespect. Say the thing.',
  },
]

const principles = [
  'Long-term games with long-term people',
  'The meaning of life is the meaning we give it',
  'Complexity is the enemy — simplicity is the moat',
  'Every decision is a bet. Make the odds explicit.',
  'Don\'t confuse motion for progress',
  'The best mental models are ones you can act on today',
]
