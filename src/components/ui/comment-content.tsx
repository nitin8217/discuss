"use client"

import { GifImage } from './gif-image'

interface CommentContentProps {
  content: string
}

// GIF URL detection function
function isGifUrl(text: string): boolean {
  const trimmedText = text.trim();
  
  // Multiple patterns to match different GIF URL formats
  const patterns = [
    /^https?:\/\/.*\.(gif|webp)(\?.*)?$/i,  // Standard .gif/.webp files
    /^https?:\/\/media\.giphy\.com\/.*$/i,   // GIPHY media URLs
    /^https?:\/\/i\.giphy\.com\/.*$/i,       // GIPHY i. URLs
    /^https?:\/\/.*giphy.*\.(gif|webp)$/i,  // Any GIPHY with gif/webp
    /^https?:\/\/tenor\.com\/.*$/i,          // Tenor GIFs
    /^https?:\/\/c\.tenor\.com\/.*$/i        // Tenor CDN
  ];
  
  const result = patterns.some(pattern => pattern.test(trimmedText));
  console.log('Checking URL:', trimmedText, 'Is GIF:', result);
  return result;
}

export function CommentContent({ content }: CommentContentProps) {
  console.log('Rendering comment content:', content);
  
  // Clean up any markdown GIF syntax that might exist in the content
  const cleanedContent = content.replace(/!\[GIF\]\((.*?)\)/g, '$1');
  
  // Split the content by URLs to get text parts and URL parts separately
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = cleanedContent.split(urlRegex);
  
  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        const trimmedPart = part.trim();
        
        // Check if this part is a URL
        if (/^https?:\/\//.test(trimmedPart)) {
          if (isGifUrl(trimmedPart)) {
            console.log('Rendering URL as GIF:', trimmedPart);
            return (
              <div key={`gif-${index}`} className="my-4">
                <GifImage 
                  src={trimmedPart}
                  alt="GIF"
                  className="max-w-full h-auto rounded-lg border border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300 block"
                  style={{ maxHeight: '300px', width: 'auto' }}
                />
              </div>
            );
          } else {
            console.log('Rendering URL as link:', trimmedPart);
            return (
              <a 
                key={`link-${index}`}
                href={trimmedPart} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 underline break-all"
              >
                {trimmedPart}
              </a>
            );
          }
        }
        
        // Regular text content
        if (part.trim()) {
          console.log('Rendering as text:', part);
          return <span key={`text-${index}`} className="whitespace-pre-wrap">{part}</span>;
        }
        
        return null;
      }).filter(Boolean)}
    </div>
  );
}
