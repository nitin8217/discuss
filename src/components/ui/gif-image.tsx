"use client"

import { useState } from 'react'

interface GifImageProps {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

export function GifImage({ src, alt = "GIF", className = "", style = {} }: GifImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <a 
        href={src} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-400 hover:text-blue-300 underline break-all"
      >
        {src}
      </a>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      style={style}
      onLoad={() => console.log('✅ GIF loaded successfully:', src)}
      onError={() => {
        console.log('❌ GIF failed to load, showing link instead:', src)
        setFailed(true)
      }}
    />
  )
}
