import React from 'react'
import { Home, User, Briefcase, FolderKanban, Code, Music, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

interface SidebarProps {
  onWrappedClick?: () => void
  onNavClick?: (href: string) => void
  isWrappedOpen?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ onWrappedClick, onNavClick, isWrappedOpen }) => {
  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Experience', href: '#experience' },
    { icon: FolderKanban, label: 'Projects', href: '#projects' },
    { icon: Code, label: 'Skills', href: '#skills' },
  ]

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
    <div className="hidden md:flex w-64 bg-spotify-darker h-screen flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <Music className="w-5 h-5 text-black" />
          </div>
          <span className="text-white font-bold text-xl">Saai Arora</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-lg text-spotify-text-secondary hover:text-white transition-colors",
                  "hover:bg-spotify-light-gray text-left"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
          {onWrappedClick && (
            <button
              onClick={onWrappedClick}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-medium text-left",
                isWrappedOpen 
                  ? "text-spotify-green bg-spotify-light-gray" 
                  : "text-spotify-green hover:text-spotify-green-hover hover:bg-spotify-light-gray"
              )}
            >
              <Sparkles className="w-5 h-5" />
              <span>2025 Wrapped</span>
            </button>
          )}
        </nav>
      </div>
      <div className="mt-auto p-6 space-y-2 text-xs text-spotify-text-secondary">
        <a href="tel:416-219-7243" className="block hover:text-white transition-colors">
          📞 416-219-7243
        </a>
        <a href="mailto:saai.arora@uwaterloo.ca" className="block hover:text-white transition-colors">
          ✉️ saai.arora@uwaterloo.ca
        </a>
        <a href="https://www.linkedin.com/in/saaiarora" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
          💼 LinkedIn
        </a>
        <a href="https://github.com/saai151" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
          💻 GitHub
        </a>
      </div>
    </div>
  )
}

export default Sidebar

