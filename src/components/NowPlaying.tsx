import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, List } from 'lucide-react'
import { Button } from './ui/button'
import profileImage from '../assets/images/Profile.jpeg'

interface Project {
  name: string
  technologies: string[]
  progress: number
  description: string
}

const NowPlaying: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [showQueue, setShowQueue] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const projects: Project[] = [
    {
      name: 'Squeak',
      technologies: ['React', 'Go', 'Supabase', 'AWS'],
      progress: 85,
      description: 'LLM-driven language learning platform with 700+ users. Built full-stack infrastructure with Supabase, React, Go with JWT authentication.'
    },
    {
      name: 'PickUp',
      technologies: ['Express.js', 'React', 'Material UI', 'Docker', 'AWS'],
      progress: 75,
      description: 'Full-stack web application with Express.js backend and React frontend. Implemented Google OAuth authentication and deployed on AWS RDS.'
    },
    {
      name: 'Caitlyn',
      technologies: ['C++', 'Docker', 'Intel Embree', 'CUDA'],
      progress: 90,
      description: 'Ray-tracing renderer using C++, Embree, CUDA. Optimized rendering speeds by 53% using GPU acceleration.'
    }
  ]

  const currentProject = projects[currentProjectIndex]
  const queue = projects.filter((_, i) => i !== currentProjectIndex)

  // Simulate progress animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= currentProject.progress) {
            return currentProject.progress
          }
          return prev + 0.5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentProject.progress])

  const handleNext = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
    setCurrentProgress(0)
  }

  const handlePrevious = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setCurrentProgress(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Generate animated waveform bars
  const WaveformBar = ({ delay }: { delay: number }) => (
    <div
      className="w-1 bg-spotify-green rounded-full animate-pulse"
      style={{
        height: `${20 + Math.random() * 60}%`,
        animationDelay: `${delay * 0.1}s`,
        animationDuration: '0.8s'
      }}
    />
  )

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-spotify-light-gray border-t border-spotify-gray z-50 px-2 md:px-4 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-24'}`}>
      {/* Minimize/Maximize Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -top-8 right-4 w-8 h-8 bg-spotify-light-gray rounded-t-lg border-t border-l border-r border-spotify-gray hover:bg-spotify-gray transition-colors flex items-center justify-center"
      >
        <svg
          className={`w-4 h-4 text-white transition-transform ${isMinimized ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2">
        {/* Left: Project Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-spotify-green to-blue-500 rounded flex-shrink-0 overflow-hidden relative flex items-center justify-center">
            <img 
              src={profileImage} 
              alt="Project" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium text-sm truncate">{currentProject.name}</p>
            <p className="text-spotify-text-secondary text-xs truncate">
              {currentProject.technologies.join(' • ')}
            </p>
          </div>
        </div>

        {/* Center: Controls & Waveform */}
        <div className={`flex flex-col items-center gap-2 flex-1 max-w-2xl ${isMinimized ? 'hidden md:flex' : ''}`}>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white" onClick={handlePrevious}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              variant="spotify" 
              size="icon" 
              className="w-10 h-10 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white" onClick={handleNext}>
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar with Waveform */}
          {!isMinimized && (
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-spotify-text-secondary w-10 text-right">{formatTime(Math.floor(currentProgress * 60 / 100))}</span>
            <div className="flex-1 relative">
              {/* Waveform visualization */}
              <div className="absolute inset-0 flex items-center justify-center gap-0.5 h-4 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <WaveformBar key={i} delay={i} />
                ))}
              </div>
              {/* Progress bar */}
              <div className="h-1 bg-spotify-gray rounded-full cursor-pointer group relative z-10">
                <div 
                  className="h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-spotify-text-secondary w-10">{formatTime(Math.floor(currentProject.progress * 60 / 100))}</span>
          </div>
          )}
        </div>

        {/* Right: Queue & Volume */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-spotify-text-secondary hover:text-white ${showQueue ? 'text-spotify-green' : ''}`}
            onClick={() => setShowQueue(!showQueue)}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
            <Volume2 className="w-4 h-4" />
          </Button>
          <div className="w-24 h-1 bg-spotify-gray rounded-full cursor-pointer group hidden md:block">
            <div className="h-full bg-white rounded-full w-2/3 group-hover:bg-spotify-green transition-colors"></div>
          </div>
        </div>
      </div>

      {/* Queue Dropdown */}
      {showQueue && (
        <div className="absolute bottom-24 right-4 w-80 bg-spotify-gray border border-spotify-light-gray rounded-lg shadow-xl p-4 z-50">
          <h3 className="text-white font-semibold mb-3">Queue</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {queue.map((project, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-2 rounded hover:bg-spotify-light-gray cursor-pointer transition-colors"
                onClick={() => {
                  setCurrentProjectIndex(projects.indexOf(project))
                  setCurrentProgress(0)
                  setShowQueue(false)
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-spotify-green/30 to-blue-500/30 rounded flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{project.name}</p>
                  <p className="text-spotify-text-secondary text-xs truncate">
                    {project.technologies.slice(0, 3).join(' • ')}
                  </p>
                </div>
                <span className="text-spotify-text-secondary text-xs">{project.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Description Tooltip */}
      {isPlaying && !isMinimized && (
        <div className="absolute bottom-24 left-4 md:left-8 w-80 bg-spotify-gray border border-spotify-light-gray rounded-lg shadow-xl p-4 z-50 hidden md:block">
          <p className="text-white text-sm leading-relaxed">{currentProject.description}</p>
        </div>
      )}
    </div>
  )
}

export default NowPlaying

