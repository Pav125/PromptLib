import React from 'react';
import Promptcard from './Promptcard';

const Prompts = ({ prompts = [] }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.length > 0 ? (
          prompts.map((prompt) => (
            <Promptcard key={prompt._id} prompt={prompt} />
          ))
        ) : (
          <p className="text-gray-500 text-xl col-span-full text-center">No prompts available</p>
        )}
      </div>
    </div>
  );
};

export default Prompts;