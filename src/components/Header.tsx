import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import Sidebar from './Sidebar'

interface HeaderProps {
  onWrappedClick?: () => void
  onNavClick?: (href: string) => void
  isWrappedOpen?: boolean
}

const Header: React.FC<HeaderProps> = ({ onWrappedClick, onNavClick, isWrappedOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    onNavClick?.(href)
  }

  const handleWrappedClick = () => {
    setMobileMenuOpen(false)
    onWrappedClick?.()
  }

  return (
    <>
      <div className="sticky top-0 z-40 bg-spotify-dark/80 backdrop-blur-lg border-b border-spotify-light-gray md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
          <span className="text-white font-bold text-lg">Saai Arora</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-spotify-darker transform transition-transform duration-300 overflow-y-auto">
            <Sidebar 
              onWrappedClick={handleWrappedClick}
              onNavClick={handleNavClick}
              isWrappedOpen={isWrappedOpen}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Header

