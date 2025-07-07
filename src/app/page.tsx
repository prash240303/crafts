import CustomCards from '@/components/cards';
import React from 'react';

export default function ComponentLinks() {
  const componentLinks = [
    { name: 'Arrow Button', path: '/arrow-button' },
    { name: 'Magic Text', path: '/magic-text' },
    { name: 'Tab Switcher', path: '/tab-switcher' },
    { name: 'Tags Component', path: '/tags-component' },
    { name: 'Zip Code Checker', path: '/zip-code-checker' },
    { name: 'Custom Cards', path: '/custom-cards' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <div className="border-t-2 border-gray-900 pt-6">
        <h1 className="text-sm font-mono uppercase tracking-wider text-gray-900 mb-8">
          TABLE OF CONTENTS <span className="text-gray-500">[v1.0]</span>
          <span className="float-right text-gray-500">[ COMPONENTS: {componentLinks.length} ]</span>
        </h1>
        
        <div className="space-y-6">
          {componentLinks.map((link, index) => (
            <div key={link.path} className="flex items-start">
              <span className="text-gray-900 font-mono text-sm mr-4 mt-1">
                {(index + 1).toString().padStart(2, '0')}.
              </span>
              <div className="flex-1">
                <a 
                  href={link.path}
                  className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
                <div className="border-b border-dotted border-gray-300 mt-2"></div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}