"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
interface SearchLoadingContextType {
  isSearching: boolean;
  setIsSearching: (loading: boolean) => void;
}
const SearchLoadingContext = createContext<SearchLoadingContextType>({
  isSearching: false,
  setIsSearching: () => {},
});
export const useSearchLoading = () => useContext(SearchLoadingContext);
export function SearchLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsSearching(false);
  }, [pathname, searchParams]);
  return (
    <SearchLoadingContext.Provider value={{ isSearching, setIsSearching }}>
      {children}
      {}
      {isSearching && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          {}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative">
              {}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="relative neo-glass rounded-3xl p-8 shadow-2xl shadow-black/50">
                <div className="flex flex-col items-center gap-6">
                  {}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                    <div className="relative p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                      <Search className="w-8 h-8 text-white animate-bounce" />
                    </div>
                  </div>
                  {}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-2">
                      Searching...
                    </h3>
                    <p className="text-slate-300 font-medium">
                      Finding the best results for you
                    </p>
                  </div>
                  {}
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SearchLoadingContext.Provider>
  );
}

