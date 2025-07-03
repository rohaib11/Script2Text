import React from 'react';
import Sidebar from '../components/Sidebar';
import FileDropzone from '../components/FileDropzone';
import LanguageSelector from '../components/LanguageSelector';
import PreviewPanel from '../components/PreviewPanel';
import ResultEditor from '../components/ResultEditor';
import TextActions from '../components/TextActions';

const UploadPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Handwritten Text Recognition</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FileDropzone />
              <LanguageSelector />
              <TextActions />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <PreviewPanel />
            </div>
          </div>
          
          <ResultEditor />
        </div>
      </main>
    </div>
  );
};

export default UploadPage;