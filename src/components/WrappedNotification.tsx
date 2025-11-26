import { useState, useEffect } from 'react'
import { X, Sparkles, Play } from 'lucide-react'
import { cn } from '../lib/utils'

interface WrappedNotificationProps {
  onOpen: () => void
  delay?: number
}

export default function WrappedNotification({ onOpen, delay = 2000 }: WrappedNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (isDismissed) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, isDismissed])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    <div
      className={cn(
        "fixed bottom-24 right-4 z-50 transition-all duration-500 transform cursor-pointer md:bottom-28 md:right-8",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-12 opacity-0 pointer-events-none"
      )}
      onClick={onOpen}
    >
      <div className="relative group">
        {/* Glowing effect behind */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1db954] to-[#1ed760] rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        
        {/* Card Content */}
        <div className="relative flex items-center gap-4 p-4 bg-[#282828] rounded-lg shadow-xl border border-[#1db954]/20 hover:bg-[#333] transition-colors w-[300px]">
          
          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={14} />
          </button>

          {/* Icon/Image */}
          <div className="relative flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1db954] to-[#191414] rounded-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <Sparkles className="text-white drop-shadow-md" size={24} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[#1db954] text-xs font-bold uppercase tracking-wider mb-0.5">
              Ready for you
            </p>
            <h4 className="text-white font-bold text-sm truncate pr-4">
              Saai's 2025 Wrapped
            </h4>
            <p className="text-gray-400 text-xs truncate">
              Tap to replay Saai's year
            </p>
          </div>

          {/* Play Icon (shows on hover) */}
          <div className="flex-shrink-0 text-[#1db954] opacity-0 group-hover:opacity-100 transition-opacity -ml-2">
            <div className="bg-black/20 p-2 rounded-full">
              <Play size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

