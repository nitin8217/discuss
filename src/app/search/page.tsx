import PostListWrapper from '@/components/posts/post-list-wrapper'
import { fetchPostBySearch } from '@/lib/query/post'
import { Search, Sparkles } from 'lucide-react'
import React from 'react'
type SearchPageProps = { 
    searchParams : Promise<{
        term: string
    }>
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const  term  = (await searchParams).term;
  const posts = await fetchPostBySearch(term);
  return (
    <div className="space-y-8">
      {}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl animate-pulse"></div>
        <div className="relative bg-white/90 backdrop-blur-sm border border-indigo-200/50 rounded-3xl p-8 shadow-xl shadow-indigo-500/5">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Search className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Search Results
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Showing results for <span className="font-bold text-slate-800 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full border border-indigo-200">{term}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-full w-fit">
            <div className="p-1.5 bg-yellow-500 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-yellow-700 font-semibold text-sm">Powered by intelligent search algorithms</span>
          </div>
        </div>
      </div>
      {}
      <PostListWrapper posts={posts} />
    </div>
  )
}
export default SearchPage

