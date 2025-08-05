'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur animate-pulse"></div>
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Loading...</p>
                <p className="text-sm text-muted-foreground">Please wait a moment</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
