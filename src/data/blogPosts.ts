export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  /** ISO date for sorting */
  dateSort: string;
  excerpt: string;
  paragraphs: string[];
  sourceUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hidden-cost-clean-code-ai',
    title: 'The Hidden Cost of “Clean Code” in AI-Generated Software',
    date: 'Feb 20, 2025',
    dateSort: '2025-02-20',
    excerpt:
      'Why agents trained on clean-code dogma over-abstract, and why the “future agent” pays the price.',
    sourceUrl: 'https://x.com/SaaiArora',
    paragraphs: [
      'One of the most ironic things I’ve noticed while coding with agents is that they’re trained on “clean code” dogma.',
      'A lot of their training emphasizes DRY, abstraction, and helper functions. So they end up pattern-matching: “I see similar code in two places, extract a helper.” Sometimes they even over-abstract code that should obviously stay inline. I’ve had cases where the inline version is literally three lines, and the agent still creates a helper that makes the total code five times longer, without ever asking, “Is this indirection actually worth it?”',
      'The deeper irony is that they don’t feel the future cost of these decisions. When an agent creates something like a getNames() helper, it never experiences the pain of having to search for it, jump across files, or reconstruct the context later. The “future agent” is a different instance with no memory of why this abstraction exists in the first place, and it is the one that suffers from context bloat, extra indirection, and more mental overhead.',
      'So there is no real feedback loop teaching the system that some abstractions are a net negative.',
      'Agents optimize for the current task, not for the long-term health of the codebase. Extracting a helper feels productive in the moment. Fewer duplicated lines, more “clean architecture,” a nice little refactor box checked. But the long-term cost is invisible to them. More files, more indirection, more cognitive overhead, more searching.',
      'In a weird way, it is like agents are creating technical debt for their future selves. They do not pay for it themselves. The future instance does.',
    ],
  },
  {
    slug: 'you-are-not-being-replaced',
    title: 'You Are Not Being Replaced. You Are Being Compressed.',
    date: '2025',
    dateSort: '2025-02-01',
    excerpt:
      'Automation, lean teams, and why the unit of value for engineers is changing—not disappearing.',
    sourceUrl: 'https://x.com/SaaiArora',
    paragraphs: [
      'The AI programmer is closer than you think.',
      'Researchers behind the “AI 2027” forecast argue that software engineering could be largely automated as early as January 2027. That sounds extreme. It also sounds increasingly defensible.',
      'You have watched frontier models go from autocomplete on steroids to agents that can plan, refactor, run tests, open pull requests, and argue with you about your own architecture.',
      'And the models are only half the story. The tooling layer is compounding just as quickly.',
      'Companies like Stripe, Ramp, Shopify, Meta, and OpenAI are building internal sandbox agents that can reason over their entire codebases. At Ramp, their internal agent “Inspect” reportedly merged around 60 percent of all pull requests in a single week. Sixty percent.',
      'That is not a flashy proof of concept. That is the operating model changing underneath your feet.',
      'Models are getting better. Tooling is getting better. Orchestration is getting better. And every company in the Valley knows it.',
      'So when layoffs hit, they do not feel random anymore.',
      'You have already seen massive cuts from companies like Google, Meta, Amazon, Salesforce, and Microsoft over the last two years. And then came one of the hardest announcements in recent memory.',
      'Jack Dorsey announced that Block would reduce its workforce from over 10,000 people to under 6,000. Over 40% of people asked to leave.',
      'He wrote something that should make you sit up.',
      'They were not making the decision because the business was weak. Gross profit was growing. Profitability was improving. Customers were increasing. The reason was different.',
      'Intelligence tools paired with smaller and flatter teams were enabling a new way of working that fundamentally changes what it means to build and run a company. And that shift is accelerating rapidly.',
      'Read that again.',
      'Not because they are failing.',
      'Because AI plus smaller teams works.',
      'He had two options, he said. Cut gradually over months and years. Or be honest about where things are going and act now. He chose to take the hard, clear action.',
      'That is not panic. That is a directional bet.',
      'And if you are a software engineer, that sentence should hit your chest.',
      'Because if smaller, flatter teams powered by intelligence tools can build and run companies, what happens to you?',
      'Here is the doom.',
      'Every month the models get better. Every month the context windows grow. Every month the agents handle more of the boring, mechanical, cognitively expensive work that used to justify entire teams. Today the code is sometimes slop. Tomorrow it is less slop. Then one random Tuesday it writes a system cleaner than what most senior engineers would ship under deadline pressure.',
      'You are lying to yourself if you think this curve politely flattens.',
      'So you ask the dramatic question.',
      'Why are you grinding LeetCode. Why are you learning new frameworks. Why are you adopting Claude Code, Codex, Cursor, Conductor, Graphite. Why are you optimizing your repo to be agent friendly.',
      'If you are all going to be replaced, why not just quit and go work at Citadel, Jane Street, or Hudson River Trading and make a million dollars optimizing some fuckass double ended multi producer multi consumer lock free atomic queue. At least there the data is guarded like nuclear launch codes and no one wants an LLM near it.',
      'Maybe that is the only safe job left.',
      'Or maybe that is cope.',
      'The truth is none of us can predict the exact shape of what comes next. But pretending that coding will not be largely automated in the next five years is delusion. The code might be mediocre today. But the slope is violent. There will be a month where the median model writes better backend code than most mid level engineers. There will be a year where product features are specified in English and compiled directly into production systems with guardrails.',
      'That does not mean software engineers disappear.',
      'It means the unit of value changes.',
      'Here is what people miss.',
      'Demand for software is about to explode.',
      'Legal workflows. Financial compliance. Healthcare diagnostics. Garbage collection routing. Food harvesting optimization. Water infrastructure monitoring. Aerospace manufacturing. Construction permitting. Mining operations. Local government budgeting. Elder care coordination. Climate adaptation systems.',
      'Every industry that felt too messy, too regulated, too human to be transformed by software is about to get flooded with it.',
      'And that transformation does not happen without people who understand systems.',
      'It just happens with fewer of you.',
      'So then why will you get laid off.',
      'Not because you are useless.',
      'Because teams will get smaller.',
      'Leaner teams have always moved faster. Less bureaucracy. Fewer status meetings. Less alignment theater. Tighter feedback loops. Clear ownership. Stronger cohesion. Harder accountability.',
      'AI supercharges that dynamic.',
      'In a small team, context is concentrated. Fewer decision makers. Fewer conflicting abstractions. Agents perform better when system boundaries are clean and intent is clear. A five person team with strong product sense and agent leverage can out ship a fifty person team drowning in Slack threads.',
      'AI does not eliminate the need for engineers. It amplifies the sharpest ones and compresses the rest.',
      'That is the brutal part.',
      'The layoffs are not a statement that your skills are worthless.',
      'They are a statement that the market needs fewer people to create more value.',
      'Your skills are not less in demand. They are more leveraged. Which means the bar rises. Which means the margin for mediocrity disappears.',
      'You might get laid off not because you are unnecessary, but because someone else with similar fundamentals plus agent fluency plus product instinct can do the work of three.',
      'That is violent.',
      'But it is clarifying.',
      'So how do you end this story.',
      'Not with doom. Not with blind optimism.',
      'With responsibility.',
      'If intelligence is becoming infrastructure, then you need to become someone who can direct it. Someone who defines problems clearly. Someone who understands tradeoffs, constraints, risk, distribution, human behavior. Someone who decides what should be built, not just how to build it.',
      'The future does not belong to people who type the fastest.',
      'It belongs to people who can see systems.',
      'Yes, there will be layoffs. Yes, teams will shrink. Yes, some of you will get punched in the face by this transition.',
      'But software is not dying.',
      'It is escaping the terminal.',
      'If the autonomous engineer is coming, you do not compete with it.',
      'You command it.',
    ],
  },
].sort((a, b) => (a.dateSort < b.dateSort ? 1 : -1));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Shareable URL for a post (title is reflected in the slug). */
export function blogPostPath(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}
