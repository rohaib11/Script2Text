import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FiBold, FiItalic, FiUnderline, FiList, FiAlignLeft, FiAlignCenter, FiAlignRight } from 'react-icons/fi';

const TextActions = () => {
  const { result, setResult } = useContext(AppContext);

  const applyFormat = (format) => {
    if (!result) return;
    
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = result.substring(start, end);
    
    let formattedText = '';
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `_${selectedText}_`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'list':
        formattedText = `- ${selectedText.replace(/\n/g, '\n- ')}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newText = result.substring(0, start) + formattedText + result.substring(end);
    setResult(newText);
  };

  return (
    <div className="panel">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => applyFormat('bold')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Bold"
        >
          <FiBold />
        </button>
        <button 
          onClick={() => applyFormat('italic')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Italic"
        >
          <FiItalic />
        </button>
        <button 
          onClick={() => applyFormat('underline')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Underline"
        >
          <FiUnderline />
        </button>
        <button 
          onClick={() => applyFormat('list')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="List"
        >
          <FiList />
        </button>
        <div className="border-l border-gray-300 dark:border-gray-600 h-8 mx-2"></div>
        <button 
          onClick={() => applyFormat('alignLeft')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Align Left"
        >
          <FiAlignLeft />
        </button>
        <button 
          onClick={() => applyFormat('alignCenter')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Align Center"
        >
          <FiAlignCenter />
        </button>
        <button 
          onClick={() => applyFormat('alignRight')}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Align Right"
        >
          <FiAlignRight />
        </button>
      </div>
    </div>
  );
};

export default TextActions;