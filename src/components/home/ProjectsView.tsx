import { projects } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectsView() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <Card
            key={i}
            className="bg-white/5 border-white/10 hover:border-white/25 transition-colors"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">
                {project.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded-full border border-white/20 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
