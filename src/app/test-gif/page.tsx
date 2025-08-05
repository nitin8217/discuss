import React from 'react';

// Test the GIF detection function
function isGifUrl(text: string): boolean {
  const trimmedText = text.trim();
  
  const patterns = [
    /^https?:\/\/.*\.(gif|webp)(\?.*)?$/i,  // Standard .gif/.webp files
    /^https?:\/\/media\.giphy\.com\/.*$/i,   // GIPHY media URLs
    /^https?:\/\/i\.giphy\.com\/.*$/i,       // GIPHY i. URLs
    /^https?:\/\/.*giphy.*\.(gif|webp)$/i,  // Any GIPHY with gif/webp
    /^https?:\/\/tenor\.com\/.*$/i,          // Tenor GIFs
    /^https?:\/\/c\.tenor\.com\/.*$/i        // Tenor CDN
  ];
  
  return patterns.some(pattern => pattern.test(trimmedText));
}

function renderTestContent(content: string) {
  const lines = content.split('\n');
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    if (isGifUrl(trimmedLine)) {
      return (
        <div key={index} className="my-3">
          <p className="text-green-400 mb-2">✅ Detected as GIF: {trimmedLine}</p>
          <img 
            src={trimmedLine} 
            alt="GIF"
            className="max-w-full h-auto rounded-lg border border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ maxHeight: '300px' }}
            onLoad={() => console.log('GIF loaded successfully:', trimmedLine)}
            onError={(e) => {
              console.log('GIF failed to load:', trimmedLine);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.insertAdjacentHTML('afterbegin', `<div class="text-red-400">❌ Failed to load: <a href="${trimmedLine}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">${trimmedLine}</a></div>`);
            }}
          />
        </div>
      );
    }
    
    return <div key={index} className="text-slate-200">📝 Regular text: {line}</div>;
  });
}

export default function TestGifPage() {
  const testUrls = [
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://i.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", 
    "https://tenor.com/view/excited-yes-awesome-gif-5081322",
    "https://c.tenor.com/5xtFqaHOCpcAAAAM/excited-yes.gif",
    "https://example.com/test.gif",
    "Regular text line",
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
  ].join('\n');

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-white mb-8">GIF Detection Test</h1>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl text-white mb-4">Test URLs:</h2>
          <div className="space-y-4">
            {renderTestContent(testUrls)}
          </div>
        </div>
      </div>
    </div>
  );
}
