import React, { useState } from 'react'
// Import the image from assets - Vite will process and optimize it
import profileImage from '../assets/images/Profile.jpeg'

const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="bg-gradient-to-b from-spotify-green/20 to-spotify-dark px-4 md:px-8 pt-8 pb-12">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-lg shadow-2xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-spotify-green to-blue-500 relative flex items-center justify-center">
          {!imageError ? (
            <img 
              src={profileImage} 
              alt="Saai Arora" 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-4xl md:text-6xl font-bold text-white">SA</span>
          )}
        </div>
        <div className="flex-1 pb-4 text-center md:text-left">
          <p className="text-sm text-spotify-text-secondary mb-2">PROFILE</p>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">Saai Arora</h1>
          <p className="text-spotify-text-secondary text-base md:text-lg">Software Engineer & Computer Science Student</p>
          <p className="text-spotify-text-secondary mt-2 text-sm md:text-base flex items-center gap-2 justify-center md:justify-start">
            <img src="/images/waterloo.jpeg" alt="University of Waterloo" className="w-6 h-6 rounded-full object-cover" />
            University of Waterloo • Expected June 2027
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
