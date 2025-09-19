import React from 'react';
import { X } from 'lucide-react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { useMemo } from 'react';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ProposedSolutionModal = ({ isOpen, onClose, solution }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full relative transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Proposed Solution</h2>
        <div className="text-white">
          <Slate editor={editor} initialValue={solution}>
            <Editable
              renderElement={props => <Element {...props} />}
              renderLeaf={props => <Leaf {...props} />}
              readOnly
            />
          </Slate>
        </div>
      </div>
    </div>
  );
};

export default ProposedSolutionModal;
