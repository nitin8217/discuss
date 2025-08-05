import React from 'react'
import { MessageSquare } from 'lucide-react';
import AuthHeader from './auth-header';
import SearchInput from './search-input';
import LoadingLink from './ui/loading-link';
const HeaderPage = () => {
  return (
    <header className='sticky top-0 z-50 border-b border-slate-600/30 neo-glass shadow-2xl shadow-black/40 rounded-b-3xl mx-4 mt-4'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 h-18 items-center py-2'>
        <div className='flex justify-start'>
          <LoadingLink href="/" className='flex items-center gap-4 hover:opacity-90 transition-all duration-500 group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 glow-effect'></div>
              <div className='relative p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500'>
                <MessageSquare className='w-7 h-7 text-white drop-shadow-lg' />
              </div>
            </div>
            <h1 className='font-black text-3xl bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-2xl group-hover:from-indigo-200 group-hover:to-purple-200 transition-all duration-500' style={{textShadow: '2px 2px 8px rgba(0,0,0,0.9)'}}>
              Discuss
            </h1>
          </LoadingLink>
        </div>
        <div className='flex justify-center order-3 md:order-2'>
          <SearchInput />
        </div>
        <div className='flex justify-end gap-2 order-2 md:order-3'>
          <AuthHeader/>
        </div>
        </div>
      </div>
    </header>
  )
}
export default HeaderPage;
