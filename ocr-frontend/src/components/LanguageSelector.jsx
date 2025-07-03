import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { languages } from '../utils/languages';
import { FiGlobe } from 'react-icons/fi';

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = useContext(AppContext);

  return (
    <div className="space-y-2">
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Language
      </label>
      <div className="relative">
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="input-field appearance-none pr-8"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <FiGlobe className="w-5 h-5 opacity-70 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;