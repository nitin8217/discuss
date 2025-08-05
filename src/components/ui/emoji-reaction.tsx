"use client"

import React, { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Laugh, ThumbsUp, Flame, Zap, Star } from 'lucide-react'
import { toggleReaction } from '@/actions/toggle-reaction'

interface EmojiReactionButtonProps {
  targetId: string
  targetType: 'post' | 'comment'
  reactions?: Record<string, { count: number; users: Array<{ name: string | null; image: string | null }> }>
  userReactions?: string[]
  className?: string
}

const reactionConfig = [
  { emoji: '👍', icon: ThumbsUp, name: 'like' as const, color: 'text-blue-400' },
  { emoji: '❤️', icon: Heart, name: 'love' as const, color: 'text-red-400' },
  { emoji: '😂', icon: Laugh, name: 'laugh' as const, color: 'text-yellow-400' },
  { emoji: '🔥', icon: Flame, name: 'fire' as const, color: 'text-orange-400' },
  { emoji: '⚡', icon: Zap, name: 'wow' as const, color: 'text-purple-400' },
  { emoji: '⭐', icon: Star, name: 'star' as const, color: 'text-yellow-300' },
]

export function EmojiReactionButton({
  targetId,
  targetType,
  reactions = {},
  userReactions = [],
  className = ""
}: EmojiReactionButtonProps) {
  const [showReactions, setShowReactions] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleReactionClick = (reactionType: 'like' | 'love' | 'laugh' | 'fire' | 'wow' | 'star') => {
    startTransition(async () => {
      await toggleReaction({
        type: reactionType,
        ...(targetType === 'post' ? { postId: targetId } : { commentId: targetId })
      })
    })
    setShowReactions(false)
  }

  const totalReactions = Object.values(reactions).reduce((sum, reaction) => sum + reaction.count, 0)

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setShowReactions(!showReactions)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPending}
      >
        <motion.div
          animate={{ rotate: showReactions ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
        </motion.div>
        
        {totalReactions > 0 && (
          <motion.span 
            className="text-sm text-slate-300 font-medium"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            key={totalReactions}
          >
            {totalReactions}
          </motion.span>
        )}
        
        <div className="flex -space-x-1">
          {Object.entries(reactions)
            .filter(([_, reactionData]) => reactionData.count > 0)
            .slice(0, 3)
            .map(([name, reactionData]) => {
              const reaction = reactionConfig.find(r => r.name === name)
              return reaction ? (
                <motion.span
                  key={name}
                  className="text-xs"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  title={`${reactionData.count} ${name} reactions`}
                >
                  {reaction.emoji}
                </motion.span>
              ) : null
            })}
        </div>
      </motion.button>

      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 z-50 p-2 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-600/30 shadow-xl shadow-black/20"
          >
            <div className="flex items-center gap-1">
              {reactionConfig.map((reaction, index) => {
                const reactionData = reactions[reaction.name]
                const isUserReacted = userReactions.includes(reaction.name)
                
                return (
                  <motion.button
                    key={reaction.name}
                    onClick={() => handleReactionClick(reaction.name)}
                    className={`relative p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-200 group ${
                      isUserReacted ? 'bg-slate-700/50 scale-110' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isPending}
                    title={reactionData ? `${reactionData.count} ${reaction.name} reactions` : `React with ${reaction.name}`}
                  >
                    <span className="text-lg block">{reaction.emoji}</span>
                    
                    {reactionData && reactionData.count > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={reactionData.count}
                      >
                        {reactionData.count}
                      </motion.span>
                    )}
                    
                    {isUserReacted && (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-blue-400/20" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showReactions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowReactions(false)}
        />
      )}
    </div>
  )
}

// Keep the old export for backwards compatibility
export default EmojiReactionButton
