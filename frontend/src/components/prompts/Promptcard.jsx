// Promptcard.js
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Promptcard = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{prompt.user}</h2>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-800 focus:outline-none transition-colors"
          aria-label="Copy prompt"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      <p className="text-gray-800 text-md mb-4">{prompt.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {prompt.tags && prompt.tags.length > 0 ? (
          prompt.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-gray-400">No tags</span>
        )}
      </div>
    </div>
  );
};

export default Promptcard;
