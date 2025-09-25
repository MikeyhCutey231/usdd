import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { useData } from '../DataContext';

const SuggestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { legalRevisions, petitions, suggestions, setSuggestions } = useData();

  const legalRevision = legalRevisions.find(l => l.id === id);
  const petition = legalRevision ? petitions.find(p => p.id === legalRevision.petition_id) : null;

  const [editorContent, setEditorContent] = useState(null);

  const handleSubmit = () => {
    if (!editorContent) {
      toast.error('The proposed solution cannot be empty.');
      return;
    }

    const newSuggestion = {
      id: uuidv4(),
      legal_revision_id: id,
      suggested_solution: editorContent,
      created_at: new Date().toISOString(),
    };

    setSuggestions([...suggestions, newSuggestion]);

    toast.success('Suggestion submitted successfully!');
    navigate(`/legal-revision/${id}`);
  };

  if (!legalRevision || !petition) {
    return <div className="text-white text-center p-12">Legal revision not found.</div>;
  }

  return (
    <main className="flex-1 p-8 bg-secondary text-white">
      <div className=" mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Go Back
        </button>
        <h1 className="text-3xl font-bold mb-2">Suggest an Edit</h1>
        <p className="text-lg text-gray-300 mb-8">You are suggesting an edit for: <span className="font-bold">{legalRevision.title}</span></p>
        
        <div className="rounded-lg p-1">
            <SimpleEditor
                initialContent={legalRevision.content}
                onUpdate={(editor) => {
                    const json = editor.getJSON();
                    setEditorContent(json);
                }}
            />
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleSubmit} className="bg-primary text-secondary font-bold py-2 px-6 rounded-lg">Submit Suggestion</button>
        </div>
      </div>
    </main>
  );
};

export default SuggestEdit;
