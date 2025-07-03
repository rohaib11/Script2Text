import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { 
  FiCopy, 
  FiDownload, 
  FiFileText, 
  FiFile, 
  FiPrinter,
  FiUsers,
  FiShare2,
  FiSave
} from 'react-icons/fi';
import { initSocket, sendTextUpdate, saveToCloud } from '../services/api';

const ResultEditor = () => {
  const { result, isProcessing, addToHistory } = useContext(AppContext);
  const [editedText, setEditedText] = useState(result);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setEditedText(result);
    setIsSaved(false);
  }, [result, editedText]);  // Add 'editedText' here to ensure proper dependency tracking

  useEffect(() => {
    initSocket((data) => {
      if (data.text !== editedText && document.activeElement !== textareaRef.current) {
        setEditedText(data.text);
      }
    });

    return () => {
      // Cleanup socket listeners if needed
    };
  }, [editedText]);  // Add 'editedText' here as the socket data should update it when needed

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEditedText(newText);
    if (isCollaborating) {
      sendTextUpdate(newText, roomId);
    }
  };

  const exportDocument = (format) => {
    if (!editedText) return;
    
    const blob = new Blob([editedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    switch(format) {
      case 'txt':
        a.download = 'document.txt';
        break;
      case 'md':
        a.download = 'document.md';
        break;
      case 'pdf':
        // In a real app, you would use a PDF generation library
        a.download = 'document.pdf';
        break;
      case 'print':
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<pre>${editedText}</pre>`);
        printWindow.document.close();
        printWindow.print();
        return;
      default:
        a.download = 'document.txt';
    }
    
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToCloud = async () => {
    try {
      await saveToCloud(editedText);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      addToHistory({
        text: editedText,
        date: new Date().toISOString(),
        isCloudSaved: true
      });
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const toggleCollaboration = () => {
    if (isCollaborating) {
      setIsCollaborating(false);
      setRoomId('');
    } else {
      const newRoomId = prompt('Enter room ID for collaboration (or leave empty for default room)') || 'default';
      setRoomId(newRoomId);
      setIsCollaborating(true);
    }
  };

  if (!result) return null;

  return (
    <div className="panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recognized Text</h3>
        <div className="flex space-x-2">
          <button 
            className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
            onClick={() => navigator.clipboard.writeText(editedText)}
            title="Copy to clipboard"
          >
            <FiCopy className="mr-1" /> Copy
          </button>
          
          <button
            className={`flex items-center px-3 py-1 rounded-md text-sm ${isCollaborating ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={toggleCollaboration}
            title={isCollaborating ? 'Stop collaborating' : 'Start collaborating'}
          >
            <FiUsers className="mr-1" /> {isCollaborating ? 'Collaborating' : 'Collaborate'}
          </button>
          
          <button 
            className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
            onClick={handleSaveToCloud}
            title="Save to cloud"
            disabled={isSaved}
          >
            <FiSave className="mr-1" /> {isSaved ? 'Saved!' : 'Save'}
          </button>
          
          <div className="relative group">
            <button 
              className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              title="Export options"
            >
              <FiDownload className="mr-1" /> Export
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => exportDocument('txt')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiFileText className="mr-2" /> As TXT
              </button>
              <button 
                onClick={() => exportDocument('md')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiFile className="mr-2" /> As Markdown
              </button>
              <button 
                onClick={() => exportDocument('pdf')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiFile className="mr-2" /> As PDF
              </button>
              <button 
                onClick={() => exportDocument('print')}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiPrinter className="mr-2" /> Print
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isCollaborating && (
        <div className="mb-3 p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-md text-sm">
          <p>Collaborating in room: <strong>{roomId}</strong></p>
          <p className="text-xs mt-1">Changes will be visible to all participants in real-time</p>
        </div>
      )}
      
      <textarea
        ref={textareaRef}
        className="w-full h-64 input-field font-mono"
        value={editedText}
        onChange={handleTextChange}
        disabled={isProcessing}
      />
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Character count: {editedText.length} | Word count: {editedText.trim() ? editedText.trim().split(/\s+/).length : 0}
        </div>
        {isCollaborating && (
          <button 
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href + `?room=${roomId}`);
              alert('Collaboration link copied to clipboard!');
            }}
          >
            <FiShare2 className="mr-1" /> Share Room
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultEditor;
