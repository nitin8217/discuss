import PostListWrapper from "@/components/posts/post-list-wrapper";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
import { TrendingUp, Plus } from "lucide-react";
import React from "react";
export default async function Home() {
  const posts = await fetchTopPosts();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <div className="relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 blur-2xl rounded-2xl animate-pulse"></div>
          <div className="relative neo-glass rounded-2xl p-6 shadow-xl shadow-black/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-xl mb-1">
                  Top Posts
                </h1>
                <p className="text-slate-300 text-base font-medium drop-shadow-lg">
                  Discover the most engaging discussions
                </p>
              </div>
            </div>
          </div>
        </div>
        <PostListWrapper posts={posts} />
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-28">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-teal-900/30 to-cyan-900/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-cyan-500/15 blur-3xl rounded-3xl"></div>
            <div className="relative neo-glass rounded-2xl p-6 shadow-xl shadow-black/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                    <Plus className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">Create Topic</h2>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Start a new discussion topic and engage with the community.
              </p>
              <TopicCreateForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
