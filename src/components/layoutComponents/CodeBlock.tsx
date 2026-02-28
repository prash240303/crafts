"use client"
import  { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon } from 'lucide-react';

const CodeSnippet = ({
  language,
  code,
}: {
  language: string;
  code: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative my-4 rounded-md bg-gray-100 p-4 font-mono text-sm shadow-xs text-gray-800">
      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
        <code>{code}</code>
      </pre>
      <motion.button
        onClick={copyToClipboard}
        disabled={isCopied}
        whileHover={!isCopied ? { scale: 1.1 } : {}}
        whileTap={!isCopied ? { scale: 0.95 } : {}}
        animate={{
          backgroundColor: '#16a34a',
          color: '#ffffffff',
        }}
        transition={{ duration: 0.1 }}
        className={`absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium ${isCopied ? 'cursor-default' : ''
          }`}
      >
        {isCopied ? <span>Copied!</span> : <span className='flex items-center gap-1'><ClipboardIcon className='w-4 h-4' /> Copy</span>}
      </motion.button>
    </div>
  );
};

export default CodeSnippet;