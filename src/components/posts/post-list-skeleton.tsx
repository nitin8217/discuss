import React from 'react';
const PostListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div 
          key={index}
          className="group relative"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animation: 'slideInUp 0.6s ease-out forwards'
          }}
        >
          {}
          <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 rounded-3xl shimmer"></div>
          {}
          <div className="relative bg-gradient-to-br from-card/80 to-card backdrop-blur-sm border border-border/50 rounded-3xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {}
                <div className="mb-4">
                  <div className="h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer mb-2"></div>
                  <div className="h-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer w-3/4"></div>
                </div>
                {}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 p-4 mb-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer w-5/6"></div>
                    <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer w-4/6"></div>
                  </div>
                </div>
                {}
                <div className="flex items-center gap-6">
                  {}
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-muted/20 to-muted/10 rounded-full">
                    <div className="w-8 h-8 bg-gradient-to-r from-muted to-muted/50 rounded-full shimmer"></div>
                    <div className="h-4 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                  </div>
                  {}
                  <div className="px-4 py-2 bg-gradient-to-r from-muted/10 to-muted/5 border border-muted/20 rounded-full">
                    <div className="h-3 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                  </div>
                  {}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full">
                    <div className="w-4 h-4 bg-gradient-to-r from-muted to-muted/50 rounded shimmer"></div>
                    <div className="h-4 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                  </div>
                  {}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full">
                    <div className="w-4 h-4 bg-gradient-to-r from-muted to-muted/50 rounded shimmer"></div>
                    <div className="h-4 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                  </div>
                </div>
                {}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
                        <div className="w-4 h-4 bg-gradient-to-r from-muted to-muted/50 rounded shimmer"></div>
                        <div className="h-3 w-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full">
                        <div className="w-4 h-4 bg-gradient-to-r from-muted to-muted/50 rounded shimmer"></div>
                        <div className="h-3 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                      </div>
                    </div>
                    <div className="h-3 w-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-muted to-muted/50 rounded-full shimmer"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-muted to-muted/50 rounded-full shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostListSkeleton;

