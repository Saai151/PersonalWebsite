import React, { useState } from 'react'
import { Play, Clock, ChevronDown, ChevronUp, Pause } from 'lucide-react'
import { cn } from '../lib/utils'

interface ExperienceItem {
  company: string
  role: string
  period: string
  duration: string
  achievements: string[]
  image?: string
}

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [playingId, setPlayingId] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index)
  }

  const togglePlay = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPlayingId(playingId === index ? null : index)
    setExpandedId(expandedId === index ? null : index)
  }

  const experiences: ExperienceItem[] = [
    {
      company: 'Shopify',
      role: 'Software Engineer Intern',
      period: 'Sep 2025',
      duration: '4 mos',
      image: '/images/Shopify.png',
      achievements: [
        'Supporting Checkout platform processing 500M+ transactions across Ruby/Rails, GraphQL, and TypeScript',
        'Reduced validation errors by 55% & latency by 20% by unifying React hooks & streamlining GraphQL logic',
        'Prevented 90+ E2E test flakes by implementing a Ruby Kafka writer wrapper that suppressed Monorail events during test runs'
      ]
    },
    {
      company: 'IBM',
      role: 'Machine Learning Engineer Intern',
      period: 'May 2025',
      duration: '4 mos',
      image: '/images/IBM.png',
      achievements: [
        'Built Python FastMCP server enabling AI-powered debugging assistant for z/OS via Model Context Protocol (MCP), reducing developer troubleshooting time by 30%',
        'Contributed to Kubernetes open source project through IBM\'s jump start OSS program with core maintainers',
        'Integrated dynamic application security testing by containerizing OWASP ZAP with Podman into Jenkins CI/CD pipeline, saving 30+ annual work hours'
      ]
    },
    {
      company: 'IBM',
      role: 'Software Developer Intern',
      period: 'Jan 2025',
      duration: '5 mos',
      image: '/images/IBM.png',
      achievements: [
        'Built secure REST API endpoints in Java/JAX-RS for IMS debugger configuration management for IBM Z/OS client generating $1M+ annual revenue',
        'Created CI/CD pipeline with Jenkins, Linux and shell scripting for deploying Java service on hybrid cloud',
        'Eliminated 50+ security vulnerabilities in C/C++ codebase using SonarQube static analysis'
      ]
    },
    {
      company: 'Squeak',
      role: 'Technical Founder',
      period: 'Nov 2024',
      duration: '7 mos',
      image: '/images/Squeak.png',
      achievements: [
        'Launched LLM-driven language learning platform generating revenue with 700+ users',
        'Built full-stack infrastructure using Supabase, React, Go with JWT authentication and PostgreSQL storage',
        'Deployed scalable backend with AWS Lambda/SQS and Terraform supporting distributed story generation',
        'Integrated RAG pipeline with Tavily/GCP Translation enabling multilingual story output'
      ]
    },
    {
      company: 'Autotrader',
      role: 'Software Developer Intern',
      period: 'Jan 2024',
      duration: '5 mos',
      image: '/images/Autotrader.ca.png',
      achievements: [
        'Built Linear Regression model with Scikit-Learn delivering analytics to 1,500+ dealerships',
        'Improved data accuracy by 85% optimizing processing algorithms with tabula library',
        'Automated data pipeline with Python scripts, CLI tools in Linux environment, saving 200+ hours annually',
        'Processed 5,000+ vehicle records with Pandas/SQL on Redash providing market insights',
        'Automated image uploads to 350+ websites with Python, saving 200+ hours annually'
      ]
    }
  ]

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
      
      {/* Table Header */}
      <div className="grid grid-cols-[16px_4fr_2fr_1fr] md:grid-cols-[16px_6fr_4fr_1fr] gap-4 px-4 py-2 text-sm text-spotify-text-secondary border-b border-white/10 mb-2">
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="hidden md:block">Date Added</span>
        <span className="flex justify-end"><Clock className="w-4 h-4" /></span>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === index
          const isPlaying = playingId === index

          return (
            <div 
              key={index} 
              className="group animate-fade-in-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                onClick={() => toggleExpand(index)}
                className={cn(
                  "grid grid-cols-[16px_4fr_2fr_1fr] md:grid-cols-[16px_6fr_4fr_1fr] gap-4 px-4 py-3 rounded-md items-center hover:bg-white/10 transition-colors cursor-pointer group",
                  isExpanded ? "bg-white/10" : ""
                )}
              >
                {/* Index / Play Button */}
                <div className="flex items-center justify-center w-4 relative">
                  <span className={cn("text-spotify-text-secondary group-hover:hidden", isPlaying ? "text-spotify-green" : "")}>
                    {isPlaying ? <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" className="w-3 h-3" /> : index + 1}
                  </span>
                  <button 
                    onClick={(e) => togglePlay(index, e)}
                    className="hidden group-hover:flex text-white absolute inset-0 items-center justify-center"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                </div>

                {/* Title / Company */}
                <div className="flex items-center gap-3 min-w-0">
                  {exp.image && (
                     <img src={exp.image} alt={exp.company} className="w-10 h-10 rounded object-contain bg-white/10 p-1" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className={cn("font-medium truncate", isPlaying ? "text-spotify-green" : "text-white")}>
                      {exp.company}
                    </span>
                    <span className="text-sm text-spotify-text-secondary truncate group-hover:text-white transition-colors">
                      {exp.role}
                    </span>
                  </div>
                </div>

                {/* Date Added */}
                <div className="hidden md:flex items-center text-sm text-spotify-text-secondary group-hover:text-white transition-colors">
                  {exp.period}
                </div>

                {/* Duration / Expand */}
                <div className="flex items-center justify-end gap-4 text-sm text-spotify-text-secondary group-hover:text-white transition-colors">
                   <span className="mr-2">{exp.duration}</span>
                   {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              </div>

              {/* Expanded Details (Lyrics style) */}
              <div 
                className={cn(
                  "px-12 py-0 overflow-hidden transition-all duration-300 ease-in-out",
                  isExpanded ? "max-h-[500px] opacity-100 py-4 mb-4" : "max-h-0 opacity-0"
                )}
              >
                 <div className="text-white/90 space-y-2">
                    <p className="text-xs uppercase tracking-widest text-spotify-text-secondary mb-2 font-bold">Achievements</p>
                    {exp.achievements.map((achievement, i) => (
                      <p key={i} className="text-sm md:text-base leading-relaxed font-medium pl-4 border-l-2 border-spotify-green/30 hover:border-spotify-green transition-colors">
                        {achievement}
                      </p>
                    ))}
                 </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Experience
