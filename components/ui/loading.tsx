import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center w-full items-center h-full">
    <div className="bg-neutral-700 text-white p-6 w-full space-y-6 full">
      <div className="flex items-center justify-between animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="text-sm">
            <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
            <p className="h-4 bg-gray-200 rounded w-16 mt-2"></p>
          </div>
        </div>
        <div className="h-px bg-gray-600 flex-1 mx-4"></div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="text-sm">
            <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
            <p className="h-4 bg-gray-200 rounded w-16 mt-2"></p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
        <div className="grid grid-cols-4 text-center text-gray-300 text-sm font-medium border-b border-gray-700 pb-2">
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
        </div>
        <div className="grid grid-cols-4 text-center py-2">
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
          <p className="h-4 bg-gray-300 rounded w-24 mt-2"></p>
        </div>
      </div>

      <div className="animate-pulse">
        <h3 className="text-gray-300 text-lg mb-4 bg-gray-300 rounded w-24 h-6"></h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-4 h-4 bg-neutral-500 rounded-full"></div>
            <div className="text-sm">
              <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
              <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-4 h-4 bg-neutral-500 rounded-full"></div>
            <div className="text-sm">
              <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
              <p className="h-4 bg-gray-200 rounded w-24 mt-2"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Loading;

