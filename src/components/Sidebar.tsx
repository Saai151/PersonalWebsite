import React from 'react'
import { Home, Search, Library, Plus, ArrowRight, Heart, Sparkles, Mail, Linkedin, Github } from 'lucide-react'
import { cn } from '../lib/utils'

interface SidebarProps {
  onWrappedClick?: () => void
  onNavClick?: (href: string) => void
  isWrappedOpen?: boolean
  isMobile?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ onWrappedClick, onNavClick, isWrappedOpen, isMobile = false }) => {
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    
    if (onNavClick) {
      onNavClick(href)
    } else {
      // Default behavior - scroll to section
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 50)
    }
  }

  return (
    <div className={cn(
      "flex flex-col gap-2 p-2 bg-black",
      isMobile 
        ? "w-full h-full" 
        : "hidden md:flex w-[280px] h-screen fixed left-0 top-0 z-50"
    )}>
      {/* Top Navigation Block */}
      <div className="bg-[#121212] rounded-lg p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4 text-white cursor-pointer" onClick={(e) => handleNavClick('#home', e)}>
          <Home className="w-6 h-6" />
          <span className="font-bold text-base">Home</span>
        </div>
        <div className="flex items-center gap-4 text-spotify-text-secondary hover:text-white transition-colors cursor-pointer" onClick={(e) => handleNavClick('#about', e)}>
          <Search className="w-6 h-6" />
          <span className="font-bold text-base">About</span>
        </div>
      </div>

      {/* Library Block */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 shadow-md z-10">
          <div className="flex items-center justify-between text-spotify-text-secondary hover:text-white transition-colors cursor-pointer mb-4">
            <div className="flex items-center gap-2">
              <Library className="w-6 h-6" />
              <span className="font-bold text-base">Your Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 hover:bg-[#1a1a1a] rounded-full p-0.5" />
              <ArrowRight className="w-5 h-5 hover:bg-[#1a1a1a] rounded-full p-0.5" />
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="px-3 py-1.5 bg-[#232323] hover:bg-[#2a2a2a] rounded-full text-sm font-medium text-white cursor-pointer whitespace-nowrap transition-colors">
              Playlists
            </span>
            <span className="px-3 py-1.5 bg-[#232323] hover:bg-[#2a2a2a] rounded-full text-sm font-medium text-white cursor-pointer whitespace-nowrap transition-colors">
              Artists
            </span>
          </div>
        </div>

        {/* Library Content */}
        <div className="flex-1 overflow-y-auto px-2 hover:overflow-y-auto custom-scrollbar">
          <div className="space-y-1 py-2">
            {/* Liked Songs Placeholder */}
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#450af5] to-[#c4efd9] rounded-md flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate group-hover:text-spotify-green transition-colors">Liked Songs</p>
                <p className="text-sm text-spotify-text-secondary truncate">Auto-generated • 1,234 songs</p>
              </div>
            </div>

            {/* Wrapped Item */}
            {onWrappedClick && (
              <div 
                onClick={onWrappedClick}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group transition-colors",
                  isWrappedOpen ? "bg-[#232323]" : ""
                )}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#1ED760] via-[#00D4FF] to-[#8B5CF6] rounded-md flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-bold truncate transition-colors", isWrappedOpen ? "text-spotify-green" : "text-white group-hover:text-spotify-green")}>
                    2025 Wrapped
                  </p>
                  <p className="text-sm text-spotify-text-secondary truncate">Your year in code</p>
                </div>
              </div>
            )}

            {/* Experience */}
            <div 
              onClick={(e) => handleNavClick('#experience', e)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#282828] rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💼</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate group-hover:text-spotify-green transition-colors">Experience</p>
                <p className="text-sm text-spotify-text-secondary truncate">Work History</p>
              </div>
            </div>

            {/* Skills */}
            <div 
              onClick={(e) => handleNavClick('#skills', e)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#282828] rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚡</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate group-hover:text-spotify-green transition-colors">Skills</p>
                <p className="text-sm text-spotify-text-secondary truncate">Tech Stack</p>
              </div>
            </div>

             {/* Education */}
             <div 
              onClick={(e) => handleNavClick('#education', e)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#282828] rounded-md flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎓</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate group-hover:text-spotify-green transition-colors">Education</p>
                <p className="text-sm text-spotify-text-secondary truncate">University of Waterloo</p>
              </div>
            </div>
          </div>

          {/* Contact Info Footer */}
          <div className="mt-4 p-4 border-t border-[#282828] space-y-3">
            <a href="mailto:saai.arora@uwaterloo.ca" className="flex items-center gap-3 text-spotify-text-secondary hover:text-white transition-colors text-sm group">
              <Mail className="w-4 h-4" />
              <span>Email Me</span>
            </a>
            <a href="https://www.linkedin.com/in/saaiarora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-spotify-text-secondary hover:text-white transition-colors text-sm group">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/saai151" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-spotify-text-secondary hover:text-white transition-colors text-sm group">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
