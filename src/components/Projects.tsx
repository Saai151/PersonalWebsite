import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { FolderKanban } from 'lucide-react'

interface Project {
  name: string
  period: string
  technologies: string[]
  description: string[]
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      name: 'PickUp',
      period: 'June 2023 – Present',
      technologies: ['Express.js', 'React', 'Material UI', 'Docker', 'AWS'],
      description: [
        'Developed a full-stack web application, with Express.js for the back-end and React for the front-end',
        'Implemented authentication using Google OAuth and developed interfaces for user registration',
        'Deployed AWS RDS for storing user data and game records'
      ]
    },
    {
      name: 'Caitlyn',
      period: '2023 - Present',
      technologies: ['C++', 'Docker', 'Intel Embree'],
      description: [
        'Developed ray-tracing renderer using C++, Embree, CUDA, optimizing rendering speeds by 53% using GPU',
        'Containerized the application using Docker, ensuring seamless deployment across different environments',
        'Developed functionality for rendering images in JPG and PNG formats as well as instantiate objects with embree'
      ]
    },
    {
      name: 'Diamond Predictor',
      period: 'May 2022',
      technologies: ['Python', 'Matplotlib', 'NumPy', 'Seaborn', 'Pandas', 'Scikit-Learn'],
      description: [
        'Developed a Linear Regression model using Pandas and Scikit Learn to predict diamond prices based on characteristics like cut, color, and clarity',
        'Achieved an error rate of less than 10%, demonstrating the accuracy of the prediction model'
      ]
    }
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Projects & Activities</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={index} className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-light-gray transition-all cursor-pointer group">
            <div className="relative h-48 bg-gradient-to-br from-spotify-green/20 to-blue-500/20 rounded-t-lg flex items-center justify-center">
              <FolderKanban className="w-16 h-16 text-spotify-green" />
              <button className="absolute bottom-4 right-4 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110">
                <span className="text-2xl">▶</span>
              </button>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                <span className="text-spotify-text-secondary text-xs">{project.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-spotify-light-gray text-white text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1.5">
                {project.description.map((desc, i) => (
                  <li key={i} className="text-spotify-text-secondary text-xs flex items-start gap-2">
                    <span className="text-spotify-green mt-1">▸</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Projects
