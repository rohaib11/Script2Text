import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const PreviewPanel = () => {
  const { previewImage, isProcessing } = useContext(AppContext);

  if (!previewImage) return null;

  return (
    <div className="panel">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Image Preview</h3>
      <div className="relative">
        <img 
          src={previewImage} 
          alt="Preview" 
          className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
        />
        {isProcessing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;