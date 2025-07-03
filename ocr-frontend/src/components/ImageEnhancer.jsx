import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ImageEnhancer = () => {
  const { previewImage, setPreviewImage } = useContext(AppContext);

  const applyFilter = (filter) => {
    if (!previewImage) return;
    
    const img = new Image();
    img.src = previewImage;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply different filters
      switch(filter) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
          }
          break;
        case 'contrast':
          const factor = 1.5;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = factor * (data[i] - 128) + 128; // R
            data[i + 1] = factor * (data[i + 1] - 128) + 128; // G
            data[i + 2] = factor * (data[i + 2] - 128) + 128; // B
          }
          break;
        case 'threshold':
          const threshold = 128;
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const val = avg > threshold ? 255 : 0;
            data[i] = val; // R
            data[i + 1] = val; // G
            data[i + 2] = val; // B
          }
          break;
        default:
          break;
      }
      
      ctx.putImageData(imageData, 0, 0);
      setPreviewImage(canvas.toDataURL());
    };
  };

  if (!previewImage) return null;

  return (
    <div className="panel">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Image Enhancement</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => applyFilter('grayscale')}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Grayscale
        </button>
        <button 
          onClick={() => applyFilter('contrast')}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Increase Contrast
        </button>
        <button 
          onClick={() => applyFilter('threshold')}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Black & White
        </button>
        <button 
          onClick={() => setPreviewImage(previewImage)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ImageEnhancer;