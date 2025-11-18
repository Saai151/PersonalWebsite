import React, { useState, useEffect } from 'react'

interface CountUpNumberProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ 
  value, 
  duration = 1.5, 
  prefix = '', 
  suffix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOutCubic))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default CountUpNumber

