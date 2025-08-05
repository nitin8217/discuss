"use client"
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { search } from "@/actions/search";
import { useSearchLoading } from "./providers/search-loading-provider";
const SearchInput = () => {
    const searchParams = useSearchParams();
    const { isSearching, setIsSearching } = useSearchLoading();
    const handleSearch = async (formData: FormData) => {
        const term = formData.get("term") as string;
        if (!term?.trim()) return;
        setIsSearching(true);
        try {
            await search(formData);
        } catch {
            setIsSearching(false);
        }
    };
  return (
    <form action={handleSearch} className="w-full max-w-md">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            {isSearching ? (
              <div className="p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
            ) : (
              <div className="p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                <Search className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <Input 
            defaultValue={searchParams.get("term") || ""} 
            type="text" 
            name="term" 
            disabled={isSearching}
            placeholder={isSearching ? "Searching..." : "Search discussions..."}
            className="pl-16 pr-24 py-4 neo-glass rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 font-medium shadow-xl disabled:opacity-70 disabled:cursor-not-allowed border-slate-600/30"
          />
          {}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-slate-500 disabled:to-slate-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3 h-3" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>
          {}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
      </div>
    </form>
  );
};
export default SearchInput;

