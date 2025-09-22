import React from 'react';
import { X } from 'lucide-react';

const SuggestedRevisionModal = ({ isOpen, onClose, suggestion }) => {
  if (!isOpen) return null;

  const renderSlateContent = (content) => {
    if (!Array.isArray(content)) {
      return <p className="text-[#DDDDDD]">{content}</p>;
    }
    return content.map((node, index) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} className="text-[#DDDDDD]">
            {node.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Suggested Revision</h2>
        <div className="space-y-4 text-gray-300 mb-8">
          {renderSlateContent(suggestion.suggested_solution)}
        </div>
      </div>
    </div>
  );
};

export default SuggestedRevisionModal;
