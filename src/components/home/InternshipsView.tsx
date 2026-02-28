import { experiences } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InternshipsView() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Internships</h2>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <Card
            key={i}
            className="bg-white/5 border-white/10 hover:border-white/25 transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="flex items-baseline justify-between gap-4">
                <CardTitle className="text-white text-lg">
                  {exp.company}
                </CardTitle>
                <span className="text-white/40 text-sm shrink-0">
                  {exp.period} &middot; {exp.duration}
                </span>
              </div>
              <p className="text-white/60 text-sm">{exp.role}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {exp.achievements.map((a, j) => (
                  <li
                    key={j}
                    className="text-white/70 text-sm leading-relaxed pl-3 border-l border-white/15"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
