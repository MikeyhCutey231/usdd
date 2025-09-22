import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import SuggestedRevisionModal from './SuggestedRevisionModal';
import toast from 'react-hot-toast';

const DraftingLegalRevision = () => {
  const [legalRevision, setLegalRevision] = useState(null);
  const [petition, setPetition] = useState(null);
  const [initialContent, setInitialContent] = useState('');
  const [editorContent, setEditorContent] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const storedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    setSuggestions(storedSuggestions.filter(s => s.legal_revision_id === id));
    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const currentLegalRevision = storedLegalRevisions.find(l => l.id === id);
    setLegalRevision(currentLegalRevision);

    if (currentLegalRevision) {
      const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
      const currentPetition = storedPetitions.find(p => p.id === currentLegalRevision.petition_id);
      setPetition(currentPetition);
      if (currentPetition && currentPetition.proposed_solution) {
        const htmlContent = slateToHtml(currentPetition.proposed_solution);
        setInitialContent(htmlContent);
      }
    }
  }, [id]);

  if (!legalRevision || !petition) {
    return <div>Loading...</div>;
  }

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editorContent) {
      toast.error('The proposed solution cannot be empty.');
      return;
    }

    const newSlateContent = tiptapToSlate(editorContent);

    const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
    const updatedPetitions = storedPetitions.map(p => {
      if (p.id === petition.id) {
        return { ...p, proposed_solution: newSlateContent };
      }
      return p;
    });
    localStorage.setItem('petitions', JSON.stringify(updatedPetitions));

    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const updatedLegalRevisions = storedLegalRevisions.map(rev => {
      if (rev.id === legalRevision.id) {
        return { ...rev, updated_at: new Date().toISOString() };
      }
      return rev;
    });
    localStorage.setItem('legalRevisions', JSON.stringify(updatedLegalRevisions));

    toast.success('Changes saved successfully!');
  };

  return (
    <main className="flex-1 p-8 bg-secondary text-white">
      <div className="flex">
        <div className="w-2/3 pr-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">{legalRevision.title}</h1>
            <div className="flex items-center">
              {legalRevision.updated_at && (
                <p className="text-sm text-gray-400 mr-4">Last updated on {new Date(legalRevision.updated_at).toLocaleDateString()}</p>
              )}
              <button onClick={handleSave} className="bg-primary text-black font-bold py-1 px-3 rounded-lg text-sm">Save Changes</button>
            </div>
          </div>
          <div className="rounded-lg p-1">
            {initialContent && (
              <SimpleEditor
                initialContent={initialContent}
                onUpdate={(editor) => {
                  const json = editor.getJSON();
                  setEditorContent(json);
                }}
              />
            )}
          </div>
        </div>
        <div className="w-1/3 pl-4">
          <h2 className="text-2xl font-bold mb-4">Suggested Revisions</h2>
          <ul className="space-y-2">
            {suggestions.map(suggestion => (
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)} className="bg-[#222222] p-4 rounded-lg cursor-pointer">
                <p className="font-bold">Anonymous</p>
                <p className="text-sm text-gray-400">Suggested a change on {new Date(suggestion.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <SuggestedRevisionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} suggestion={selectedSuggestion} />
    </main>
  );
};

const tiptapToSlate = (tiptapJson) => {
    if (!tiptapJson || !tiptapJson.content) return [];
    return tiptapJson.content.map(node => {
        if (node.type === 'paragraph') {
            return {
                type: 'paragraph',
                children: node.content ? node.content.map(child => ({ text: child.text })) : [{ text: '' }]
            };
        }
        return { type: 'paragraph', children: [{ text: '' }] };
    });
};

const slateToHtml = (slateObject) => {
  if (!Array.isArray(slateObject)) return '';
  return slateObject.map(node => {
    const toHtml = (children) => children.map(child => {
      let text = child.text;
      if (child.bold) text = `<strong>${text}</strong>`;
      if (child.italic) text = `<em>${text}</em>`;
      if (child.underline) text = `<u>${text}</u>`;
      return text;
    }).join('');

    switch (node.type) {
      case 'paragraph':
        return `<p>${toHtml(node.children)}</p>`;
      default:
        return `<p>${toHtml(node.children)}</p>`;
    }
  }).join('');
};

export default DraftingLegalRevision;
