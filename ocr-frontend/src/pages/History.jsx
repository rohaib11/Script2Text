import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FiClock, FiImage, FiFileText } from 'react-icons/fi';
import { languages } from '../utils/languages';

const History = () => {
  const { history } = useContext(AppContext);

  // Create a language map for easy lookup
  const languageMap = languages.reduce((acc, lang) => {
    acc[lang.code] = lang.name;
    return acc;
  }, {});

  const getLanguageName = (code) => {
    return languageMap[code] || code?.toUpperCase?.() || 'Unknown';
  };

  if (history.length === 0) {
    return (
      <div className="flex h-screen">
        <div className="m-auto text-center">
          <FiClock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No history items yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">OCR History</h2>
          
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="panel">
                <div className="flex space-x-4">
                  {item.image && (
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt="OCR Preview" 
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <span className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {getLanguageName(item.language)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {new Date(item.date).toLocaleString()}
                      </h3>
                      {item.isCloudSaved && (
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                          Cloud Saved
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.text || 'No text content'}
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <button 
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                        onClick={() => navigator.clipboard.writeText(item.text)}
                      >
                        <FiFileText className="inline mr-1" /> Copy Text
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;