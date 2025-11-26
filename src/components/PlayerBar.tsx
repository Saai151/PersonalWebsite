import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart, Maximize2 } from 'lucide-react'
import { Button } from './ui/button'
import profileImage from '../assets/images/Profile.jpeg'
import { cn } from '../lib/utils'

const PlayerBar: React.FC = () => {
  const [imageError, setImageError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Welcome',
    artist: 'Saai Arora',
    duration: 180 // 3 minutes
  })
  const progressInterval = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          let title = 'Welcome'
          let artist = 'Saai Arora'
          
          switch(id) {
            case 'home': title = 'Home'; artist = 'Saai Arora'; break;
            case 'about': title = 'About Me'; artist = 'Bio'; break;
            case 'education': title = 'Education'; artist = 'University of Waterloo'; break;
            case 'experience': title = 'Experience'; artist = 'Career History'; break;
            case 'skills': title = 'Tech Stack'; artist = 'Skills'; break;
          }
          
          setCurrentTrack(prev => ({ ...prev, title, artist }))
          setIsPlaying(true)
          setProgress(0)
        }
      })
    }, { threshold: 0.3 })

    document.querySelectorAll('div[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) return 0
          return p + 0.5 // Advancing slowly
        })
      }, 1000)
    } else {
      clearInterval(progressInterval.current)
    }
    return () => clearInterval(progressInterval.current)
  }, [isPlaying])

  const formatTime = (percent: number) => {
    const totalSeconds = currentTrack.duration
    const currentSeconds = Math.floor((percent / 100) * totalSeconds)
    const mins = Math.floor(currentSeconds / 60)
    const secs = currentSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalTime = () => {
    const mins = Math.floor(currentTrack.duration / 60)
    const secs = currentTrack.duration % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#181818] border-t border-[#282828] z-50 px-4 flex items-center justify-between">
      {/* Left: Now Playing */}
      <div className="flex items-center gap-4 w-[30%] min-w-0">
        <div className="w-14 h-14 relative group cursor-pointer flex-shrink-0">
           <div className="w-full h-full bg-gradient-to-br from-spotify-green to-blue-500 rounded overflow-hidden">
            {!imageError ? (
              <img 
                src={profileImage} 
                alt="Cover" 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#282828]">
                 <span className="text-white font-bold text-xs">SA</span>
              </div>
            )}
           </div>
           <div className={cn("absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", isPlaying ? "" : "opacity-100")}>
              <Button variant="ghost" size="icon" className="text-white rounded-full hover:scale-110 transition-transform" onClick={() => setIsPlaying(!isPlaying)}>
                 <div className="w-full h-full flex items-center justify-center">
                   <span className="sr-only">Expand</span>
                   <Maximize2 className="w-5 h-5" />
                 </div>
              </Button>
           </div>
        </div>
        <div className="flex flex-col justify-center min-w-0">
           <a href="#" className="font-bold text-white text-sm hover:underline truncate block">{currentTrack.title}</a>
           <a href="#" className="text-xs text-spotify-text-secondary hover:underline hover:text-white truncate block">{currentTrack.artist}</a>
        </div>
        <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white hidden md:flex">
           <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Center: Player Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
               <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
               <SkipBack className="w-5 h-5 fill-current" />
            </Button>
            <Button 
              className="w-8 h-8 bg-white hover:bg-gray-200 rounded-full text-black flex items-center justify-center transition-transform hover:scale-105"
              onClick={() => setIsPlaying(!isPlaying)}
            >
               {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
               <SkipForward className="w-5 h-5 fill-current" />
            </Button>
            <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
               <Repeat className="w-4 h-4" />
            </Button>
         </div>
         
         <div className="w-full flex items-center gap-2 text-xs text-spotify-text-secondary font-medium">
            <span>{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer">
               <div className="absolute inset-0 bg-[#4d4d4d] rounded-full"></div>
               <div 
                 className="absolute top-0 left-0 h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
                 style={{ width: `${progress}%` }}
               ></div>
               <div 
                 className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100"
                 style={{ left: `${progress}%` }}
               ></div>
            </div>
            <span>{totalTime()}</span>
         </div>
      </div>

      {/* Right: Volume / Options */}
      <div className="flex items-center justify-end gap-2 w-[30%] min-w-0">
         <Button variant="ghost" size="icon" className="text-spotify-text-secondary hover:text-white">
            <Volume2 className="w-5 h-5" />
         </Button>
         <div className="w-24 h-1 bg-[#4d4d4d] rounded-full relative group cursor-pointer hidden md:block">
            <div className="h-full bg-white rounded-full w-2/3 group-hover:bg-spotify-green transition-colors"></div>
         </div>
      </div>
    </div>
  )
}

export default PlayerBar
