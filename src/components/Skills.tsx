import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Code } from 'lucide-react'

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Ruby', 'Go', 'Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS']
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['Ruby on Rails', 'React', 'Express.js', 'Django', 'Bootstrap', 'MUI', 'Angular', 'Intel Embree', 'Pandas', 'NumPy', 'Matplotlib', 'TensorFlow', 'Seaborn', 'Openpyxl']
    },
    {
      title: 'Tools & Platforms',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Git', 'Supabase', 'AWS', 'GCP', 'PostgreSQL', 'MongoDB', 'Redash', 'OWASP ZAP', 'Podman', 'Linux', 'CI/CD', 'REST APIs']
    },
    {
      title: 'Other',
      skills: ['Jira', 'Figma', 'Excel', 'PowerPoint', 'Data Analysis', 'Problem Solving']
    }
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <Card key={index} className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-light-gray transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-spotify-green" />
                <CardTitle className="text-white text-lg">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-spotify-light-gray text-white text-sm rounded-full hover:bg-spotify-green transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Skills
