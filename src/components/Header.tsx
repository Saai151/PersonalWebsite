import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import Sidebar from './Sidebar'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-40 bg-spotify-dark/80 backdrop-blur-lg border-b border-spotify-light-gray">
        <div className="flex items-center gap-4 px-4 md:px-8 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-spotify-darker">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  )
}

export default Header

