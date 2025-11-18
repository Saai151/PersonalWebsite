import React, { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react'
import { Button } from './ui/button'
// Import the same profile image
import profileImage from '../assets/images/Profile.jpeg'

const PlayerBar: React.FC = () => {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-spotify-light-gray border-t border-spotify-gray z-50 px-2 md:px-4">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-spotify-green to-blue-500 rounded flex-shrink-0 overflow-hidden relative flex items-center justify-center">
            {!imageError ? (
              <img 
                src={profileImage} 
                alt="Saai Arora" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-lg font-bold text-white">SA</span>
            )}
          </div>
          <div className="min-w-0 hidden sm:block">
            <p className="text-white font-medium text-sm truncate">Saai Arora</p>
            <p className="text-spotify-text-secondary text-xs truncate">Software Engineer</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button variant="spotify" size="icon" className="w-10 h-10 rounded-full">
              <Play className="w-5 h-5 ml-0.5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full hidden md:flex">
            <span className="text-xs text-spotify-text-secondary">0:00</span>
            <div className="flex-1 h-1 bg-spotify-gray rounded-full cursor-pointer group">
              <div className="h-full bg-white rounded-full w-0 group-hover:bg-spotify-green transition-colors"></div>
            </div>
            <span className="text-xs text-spotify-text-secondary">0:00</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-1 justify-end hidden md:flex">
          <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
            <Volume2 className="w-4 h-4" />
          </Button>
          <div className="w-24 h-1 bg-spotify-gray rounded-full cursor-pointer group">
            <div className="h-full bg-white rounded-full w-2/3 group-hover:bg-spotify-green transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBar

