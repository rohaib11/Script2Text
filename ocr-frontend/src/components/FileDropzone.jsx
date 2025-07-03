import React, { useState, useCallback, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { uploadImage } from '../services/api';
import { FiUpload } from 'react-icons/fi';

const FileDropzone = () => {
  const { 
    setIsProcessing, 
    setResult, 
    setPreviewImage, 
    addToHistory, 
    selectedLanguage 
  } = useContext(AppContext);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const processFile = useCallback(async (file) => {
    setIsProcessing(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);

      // Process OCR
      const text = await uploadImage(file, selectedLanguage);
      setResult(text);
      addToHistory({ 
        image: URL.createObjectURL(file), 
        text, 
        language: selectedLanguage, 
        date: new Date().toISOString() 
      });
    } catch (error) {
      console.error('Error processing file:', error);
      setResult('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedLanguage, setIsProcessing, setResult, setPreviewImage, addToHistory]);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <FiUpload className="w-12 h-12 mx-auto opacity-70 text-gray-500 dark:text-gray-400" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">or</p>
        <label className="btn-primary cursor-pointer">
          Browse Files
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">Supports: JPG, PNG, JPEG</p>
      </div>
    </div>
  );
};

export default FileDropzone;