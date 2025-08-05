"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'circle' | 'rectangular'
  animation?: 'pulse' | 'wave' | 'shimmer'
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  variant = "default",
  animation = "shimmer"
}) => {
  const baseClasses = "bg-gradient-to-r from-slate-700/50 via-slate-600/50 to-slate-700/50 rounded"
  
  const variantClasses = {
    default: "h-4 w-full",
    circle: "rounded-full",
    rectangular: "rounded-lg"
  }

  const animationProps = {
    pulse: {
      animate: {
        opacity: [0.5, 1, 0.5],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    wave: {
      animate: {
        x: [-200, 200],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    shimmer: {
      animate: {
        backgroundPosition: ["200% 0", "-200% 0"],
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      animate={animationProps[animation].animate}
      transition={animationProps[animation].transition}
      style={{
        backgroundSize: animation === 'shimmer' ? '400% 100%' : undefined,
        backgroundImage: animation === 'shimmer' 
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
          : undefined
      }}
    />
  )
}

export const TopicSkeleton = () => (
  <motion.div 
    className="p-6 neo-glass rounded-2xl border border-slate-600/30 space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton variant="circle" className="h-10 w-10" />
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="flex gap-4 pt-2">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-18" />
    </div>
  </motion.div>
)

export const PostSkeleton = () => (
  <motion.div 
    className="p-6 neo-glass rounded-2xl border border-slate-600/30 space-y-4"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-4">
      <Skeleton variant="circle" className="h-12 w-12" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="flex items-center gap-6 pt-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-24" />
    </div>
  </motion.div>
)

export const CommentSkeleton = () => (
  <motion.div 
    className="p-4 neo-glass rounded-xl border border-slate-600/30 space-y-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start gap-3">
      <Skeleton variant="circle" className="h-8 w-8" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <div className="space-y-2 pl-11">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </motion.div>
)

export const HeaderSkeleton = () => (
  <motion.div 
    className="flex items-center justify-between p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Skeleton className="h-8 w-32" />
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton variant="circle" className="h-10 w-10" />
    </div>
  </motion.div>
)

export default Skeleton
