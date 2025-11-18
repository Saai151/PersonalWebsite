import React, { useState } from 'react'
import { Play, X, Github } from 'lucide-react'
import { Button } from './ui/button'

interface Project {
  name: string
  period: string
  year: string
  type: string
  technologies: string[]
  description: string[]
  gradient: string
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      name: 'PickUp',
      period: 'June 2023 – Present',
      year: '2023',
      type: 'Full Stack Web App',
      technologies: ['Express.js', 'React', 'Material UI', 'Docker', 'AWS'],
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      description: [
        'Developed a full-stack web application, with Express.js for the back-end and React for the front-end',
        'Implemented authentication using Google OAuth and developed interfaces for user registration',
        'Deployed AWS RDS for storing user data and game records'
      ]
    },
    {
      name: 'Caitlyn',
      period: '2023 - Present',
      year: '2023',
      type: 'Renderer Engine',
      technologies: ['C++', 'Docker', 'Intel Embree', 'CUDA'],
      gradient: 'from-blue-400 via-indigo-500 to-purple-500',
      description: [
        'Developed ray-tracing renderer using C++, Embree, CUDA, optimizing rendering speeds by 53% using GPU',
        'Containerized the application using Docker, ensuring seamless deployment across different environments',
        'Developed functionality for rendering images in JPG and PNG formats as well as instantiate objects with embree'
      ]
    },
    {
      name: 'Diamond Predictor',
      period: 'May 2022',
      year: '2022',
      type: 'ML Model',
      technologies: ['Python', 'Scikit-Learn', 'Pandas'],
      gradient: 'from-emerald-400 via-cyan-500 to-blue-500',
      description: [
        'Developed a Linear Regression model using Pandas and Scikit Learn to predict diamond prices based on characteristics like cut, color, and clarity',
        'Achieved an error rate of less than 10%, demonstrating the accuracy of the prediction model'
      ]
    }
  ]

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Discography</h2>
        <Button variant="ghost" className="text-sm font-bold text-spotify-text-secondary hover:text-white uppercase tracking-widest hover:underline">
          Show All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="bg-[#181818] hover:bg-[#282828] p-4 rounded-md transition-all duration-300 group cursor-pointer hover-lift animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedProject(project)}
          >
            <div className={`w-full aspect-square bg-gradient-to-br ${project.gradient} mb-4 rounded-md shadow-lg relative group-hover:shadow-xl transition-shadow flex items-center justify-center`}>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-2 right-2 translate-y-2 group-hover:translate-y-0 shadow-xl">
                <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 fill-black ml-1" />
                </div>
              </div>
              <span className="text-4xl font-black text-white/20 select-none">EP</span>
            </div>
            <h3 className="font-bold text-white text-base truncate mb-1">{project.name}</h3>
            <p className="text-sm text-spotify-text-secondary line-clamp-2">
              {project.year} • {project.type}
            </p>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-[#121212] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border border-[#282828] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Album Art Side */}
            <div className={`w-full md:w-64 h-48 md:h-auto bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center flex-shrink-0 relative`}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 left-2 text-white/50 hover:text-white md:hidden"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              <Play className="w-16 h-16 text-white/80 fill-white/20" />
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-black text-white mb-1">{selectedProject.name}</h2>
                  <p className="text-spotify-text-secondary font-medium">{selectedProject.type} • {selectedProject.year}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-spotify-text-secondary hover:text-white hidden md:flex"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-[#282828] text-white text-xs font-bold rounded-full border border-white/5 hover:bg-[#333] transition-colors">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                 <h3 className="text-white font-bold text-sm uppercase tracking-widest">About this release</h3>
                 <ul className="space-y-3">
                  {selectedProject.description.map((desc, i) => (
                    <li key={i} className="text-spotify-text-secondary text-sm leading-relaxed flex gap-3">
                      <span className="text-spotify-green mt-1">•</span>
                      {desc}
                    </li>
                  ))}
                 </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#282828] flex gap-4">
                 <Button className="flex-1 bg-spotify-green hover:bg-spotify-green-hover text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95">
                    <Play className="w-4 h-4 mr-2 fill-black" />
                    View Demo
                 </Button>
                 <Button variant="outline" className="flex-1 border-[#282828] hover:border-white hover:bg-transparent text-white font-bold rounded-full transition-colors">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                 </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
