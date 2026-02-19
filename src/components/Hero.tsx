import React, { useState } from 'react'
import { BadgeCheck, Play, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import profileImage from '../assets/images/profile.png'

const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="flex flex-col pb-6">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 px-4 md:px-8 pt-12 md:pt-20 pb-8">
        {/* Profile Image / Album Art Style */}
        <div className="w-48 h-48 md:w-60 md:h-60 rounded-full md:rounded shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex-shrink-0 overflow-hidden bg-[#282828] relative group">
           {!imageError ? (
            <img 
              src={profileImage} 
              alt="Saai Arora" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1ED760] to-[#00D4FF]">
               <span className="text-6xl font-bold text-white">SA</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <div className="flex items-center gap-2 mb-2">
             <BadgeCheck className="w-6 h-6 text-[#3d91f4] fill-white" />
             <span className="text-sm font-medium text-white tracking-wide">Verified Artist</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
            Saai Arora
          </h1>
          
          <p className="text-white/90 text-base font-medium mb-2">
             1,234,567 monthly lines of code
          </p>
          <p className="text-white/70 text-sm flex items-center gap-2 justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-spotify-green inline-block"></span>
            Software Engineer & CS Student @ UWaterloo
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 md:px-8 flex items-center gap-4 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <Button 
           className="w-14 h-14 rounded-full bg-spotify-green hover:bg-spotify-green-hover text-black p-0 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
           onClick={() => window.open('/resume/Saai_Arora_Resume.pdf', '_blank')}
        >
           <Play className="w-7 h-7 fill-black ml-1" />
        </Button>

        <Button 
          variant="outline" 
          className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white px-6 py-2 h-auto text-sm font-bold uppercase tracking-wider"
          onClick={() => window.open('https://linkedin.com/in/saaiarora', '_blank')}
        >
          Follow
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className="text-white/70 hover:text-white"
        >
          <MoreHorizontal className="w-8 h-8" />
        </Button>
      </div>
    </div>
  )
}

export default Hero
