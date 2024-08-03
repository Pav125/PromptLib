// SkeletonPromptcard.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPromptcard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={30} />
      </div>
      <Skeleton count={3} />
      <div className="flex flex-wrap gap-2 mt-4">
        <Skeleton height={20} width={50} count={3} />
      </div>
    </div>
  );
};

export default SkeletonPromptcard;
