"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2, Image } from 'lucide-react'
import { Input } from './input'

interface GifData {
  id: string
  title: string
  images: {
    fixed_height: {
      url: string
      width: string
      height: string
    }
    preview_gif: {
      url: string
    }
  }
}

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void
  isOpen: boolean
  onClose: () => void
}

const GifPicker: React.FC<GifPickerProps> = ({ onGifSelect, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState<GifData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use the official GIPHY public beta key for development
  const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'dc6zaTOxFJmzC'

  // Debug log to check if API key is loaded
  console.log('GIPHY API Key loaded:', GIPHY_API_KEY ? `${GIPHY_API_KEY.substring(0, 8)}...` : 'None')
  console.log('Full environment check:', {
    hasKey: !!GIPHY_API_KEY,
    keyLength: GIPHY_API_KEY?.length,
    isPlaceholder: GIPHY_API_KEY === 'your-giphy-api-key-here' || GIPHY_API_KEY === 'your-actual-giphy-api-key-here'
  })

  const searchGifs = async (query: string) => {
    if (!query.trim()) {
      setGifs([])
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=20&rating=pg-13`
      )
      
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`API Error ${response.status}: ${errorData}`)
      }
      
      const data = await response.json()
      setGifs(data.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to search GIFs: ${errorMessage}`)
      console.error('GIF search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingGifs = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&rating=pg-13`
      )
      
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`API Error ${response.status}: ${errorData}`)
      }
      
      const data = await response.json()
      setGifs(data.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(`Failed to load trending GIFs: ${errorMessage}`)
      console.error('Trending GIFs error:', err)
      setGifs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && gifs.length === 0) {
      loadTrendingGifs()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchGifs(searchTerm)
    }, 500)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  const handleGifSelect = (gif: GifData) => {
    onGifSelect(gif.images.fixed_height.url)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl max-h-[80vh] m-4 neo-glass rounded-2xl border border-slate-600/30 shadow-2xl shadow-black/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-slate-600/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose a GIF
              </h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for GIFs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 neo-glass border-slate-600/30 focus:border-purple-400/50 focus:ring-purple-400/20"
              />
            </div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                <span className="ml-2 text-slate-300">Loading GIFs...</span>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center max-w-md">
                  <Image className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-red-400 mb-3 text-sm font-medium">{error}</p>
                  <p className="text-slate-400 text-xs mb-4">
                    Please try again or check your internet connection.
                  </p>
                  <button
                    onClick={() => searchTerm ? searchGifs(searchTerm) : loadTrendingGifs()}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && gifs.length === 0 && searchTerm && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Image className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400">No GIFs found for "{searchTerm}"</p>
                  <p className="text-slate-500 text-sm mt-1">Try a different search term</p>
                </div>
              </div>
            )}

            {!loading && !error && gifs.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gifs.map((gif, index) => (
                  <motion.div
                    key={gif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-slate-800/50"
                    onClick={() => handleGifSelect(gif)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={gif.images.preview_gif.url}
                      alt={gif.title}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 rounded-lg transition-colors duration-200" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default GifPicker

export const GifTrigger: React.FC<{ onGifSelect: (gifUrl: string) => void }> = ({ onGifSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg neo-glass border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        <Image className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
      </motion.button>
      
      <GifPicker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGifSelect={onGifSelect}
      />
    </>
  )
}
