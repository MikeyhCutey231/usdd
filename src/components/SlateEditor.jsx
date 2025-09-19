import React, { useMemo, useCallback, useState } from 'react';
import { createEditor, Editor, Transforms, Text, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { Bold, Italic, Underline, Code, List, ListOrdered } from 'lucide-react';

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

const SlateEditor = ({ initialValue, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="bg-primary-text text-white rounded-lg">
      <div className="flex items-center p-2 rounded-t-lg">
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleUnderlineMark(editor);
          }}
        >
          <Underline size={16} />
        </button>
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          <Code size={16} />
        </button>
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, 'bulleted-list');
          }}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          className="pr-4"
          onMouseDown={event => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, 'numbered-list');
          }}
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Editable
          className="p-4"
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          style={{ border: 'none', outline: 'none' }}
        />
      </Slate>
    </div>
  );
};

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    });
    return !!match;
  },

  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.underline === true,
      universal: true,
    });
    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    });
    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    );
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = ['bulleted-list', 'numbered-list'].includes(format);

    Transforms.unwrapNodes(editor, {
      match: n =>
        ['bulleted-list', 'numbered-list'].includes(
          !Editor.unhangRange(editor, editor.selection) && n.type
        ),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
  },
};

export default SlateEditor;
