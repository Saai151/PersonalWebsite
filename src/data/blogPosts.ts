export interface BlogSection {
  /** URL fragment for #anchor links and sidebar TOC */
  id: string;
  title: string;
  level: 'h2' | 'h3' | 'h4';
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  /** ISO date for sorting */
  dateSort: string;
  excerpt: string;
  /** Plain posts: body copy. Use [] when `sections` is set. */
  paragraphs: string[];
  /** Optional: headings + TOC sidebar with scroll-to anchors */
  sections?: BlogSection[];
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
  {
    slug: 'how-to-get-your-first-user',
    title: 'how to get your first paid user',
    date: 'Mar 25, 2026',
    dateSort: '2026-03-25',
    excerpt:
      'speed beats ego early, distribution beats a perfect product, and conversion beats vanity traffic.',
    paragraphs: [],
    sections: [
      {
        id: 'intro',
        title: 'intro',
        level: 'h2',
        paragraphs: [
          'if you’re building startups you’ve probably felt this',
          'you can build fast, ship consistently, ideas are flowing, everything feels good',
          'then you try to get your first user and suddenly it’s crickets',
          'this is where most builders get exposed. not because it’s impossible, but because it forces you to do things you’ve been lowkey avoiding the whole time',
          'i’ve built products and worked with early teams backed by yc and other vcs and seen this pattern over and over',
          'your first paid user isn’t magic',
          'you’re just overcomplicating it',
        ],
      },
      {
        id: 'step-0-market',
        title: 'don’t shoot yourself in the foot',
        level: 'h2',
        paragraphs: [
          'before anything else, look at the market you chose',
          'if you decided to start in healthcare, government, or selling to big enterprises early, congrats you picked hard mode for no reason',
          'long sales cycles, too many stakeholders, compliance everywhere, and no one trusts you yet',
          'and then people are surprised they can’t get their first user',
          'like yeah no shit',
          'you didn’t fail, you just picked a market where nobody is going to move',
          'early on your only real advantage is speed',
          'so go where people actually move fast',
          'startups, small teams, people who are willing to try something new and not make you sit through 6 meetings just to say no',
          'you can go upmarket later',
          'right now you need signal, not ego',
        ],
      },
      {
        id: 'consumer-distribution',
        title: 'consumer: distribution is the game',
        level: 'h2',
        paragraphs: [
          'if you’re building for consumers and blaming your product, you’re probably coping',
          'nobody has seen it',
          'you can build something insane and it still won’t matter if it’s sitting in a corner of the internet with zero distribution',
          'early on distribution is the whole game',
          'if you don’t have budget, you’re doing organic whether you like it or not',
          'which means actually showing up',
          'post on x',
          'reply to people',
          'be in reddit threads',
          'drop demos',
          'build in public',
          'talk to real humans',
          'you’re not trying to go viral',
          'you’re trying to get literally 1 person to care',
          'most people skip this part because it’s slow and a bit embarrassing',
          'but that’s the work',
        ],
      },
      {
        id: 'funnel',
        title: 'understanding the funnel',
        level: 'h3',
        paragraphs: [
          'there are only two things that matter early',
          'getting people in',
          'getting them to pay',
        ],
      },
      {
        id: 'top-vs-middle',
        title: 'top vs middle',
        level: 'h4',
        paragraphs: [
          'top of funnel is easy',
          'you can always get more traffic',
          'post more, spend more, whatever',
          'middle of funnel is where things fall apart',
          'if people aren’t converting, traffic is not your problem',
          'your product is confusing',
          'your onboarding is mid',
          'or your value just isn’t strong enough yet',
          'adding more features here is just you coping again',
        ],
      },
      {
        id: 'conversion',
        title: 'conversion is the truth',
        level: 'h3',
        paragraphs: [
          'this is the only metric that actually matters early',
          'are people willing to pay',
          'you can have thousands of users and still be delusional',
          'conversion is the reality check',
          'if nobody is paying, something is off',
          'and it’s usually not fixed by building more',
          'it’s fixed by reducing friction and getting people to value fast',
          'free trials help',
          'good onboarding helps',
          'a clear use case helps',
          'trying to do everything does not help',
          'also actually look at your data',
          'where do people drop',
          'what do they click',
          'what do paying users do differently',
          'tools like posthog are useful, but the real point is',
          'stop guessing and start looking',
        ],
      },
      {
        id: 'b2b-conversations',
        title: 'b2b: talk to people',
        level: 'h2',
        paragraphs: [
          'if you’re building b2b and waiting for users to magically show up, you’re gonna be waiting for a while',
          'your first users come from talking to people',
          'cold dms',
          'warm intros',
          'asking for calls',
          'following up',
          'yeah it doesn’t scale',
          'that’s why it works',
          'most people avoid this because it feels awkward',
          'but that awkwardness is literally the job',
          'you don’t understand your user until you’ve actually talked to them enough times',
        ],
      },
      {
        id: 'design-partners',
        title: 'the cheat code: design partners',
        level: 'h3',
        paragraphs: [
          'if there’s one thing that feels like a cheat code early, it’s this',
          'find design partners',
          'someone who actually has the problem and is willing to build with you',
          'not just give feedback once and disappear',
          'someone who stays in the loop',
          'they tell you what matters',
          'they call out what’s useless',
          'they help you iterate way faster',
          'sometimes they even pay early',
          'instead of guessing, you’re building with real pressure',
          'if you can solve a real problem for even one design partner, you’re already ahead of most people building in silence',
        ],
      },
      {
        id: 'what-people-get-wrong',
        title: 'what people get wrong',
        level: 'h3',
        paragraphs: [
          'most builders think they need more features, better design, more polish before they can get users',
          'this is almost always cap',
          'building feels productive',
          'talking to users feels uncertain',
          'so people hide in building',
          'you convince yourself “one more feature” will fix it',
          'it won’t',
          'your first user is not thinking about your long term vision',
          'they’re asking one thing',
          'does this help me right now',
        ],
      },
      {
        id: 'final-thoughts',
        title: 'final thoughts',
        level: 'h2',
        paragraphs: [
          'getting your first user isn’t about some secret growth hack',
          'it’s about doing the obvious things most people avoid',
          'pick a market where people actually respond',
          'put your product in front of real people',
          'talk to users even when it feels awkward',
          'fix what’s clearly broken',
          'that’s it',
          'it’s simple, but not easy',
          'most people won’t do it consistently, which is why most people never get there',
          'once you get your first user things start to click',
          'until then you’re just guessing and calling it strategy',
        ],
      },
    ] as BlogSection[],
  },
].sort((a, b) => (a.dateSort < b.dateSort ? 1 : -1));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Shareable URL for a post (title is reflected in the slug). */
export function blogPostPath(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}
