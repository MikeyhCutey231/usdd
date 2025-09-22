import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

// Function to convert SlateJS object to HTML
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
      // Add other cases for headings, lists etc. if needed
      default:
        return `<p>${toHtml(node.children)}</p>`;
    }
  }).join('');
};

// Function to convert Tiptap JSON back to SlateJS format (simplified)
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


const SuggestEdit = () => {
  const [legalRevision, setLegalRevision] = useState(null);
  const [petition, setPetition] = useState(null);
  const [initialContent, setInitialContent] = useState('');
  const [editorContent, setEditorContent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSubmit = () => {
    if (!editorContent) {
      toast.error('The proposed solution cannot be empty.');
      return;
    }

    const newSlateContent = tiptapToSlate(editorContent);

    const newSuggestion = {
      id: uuidv4(),
      legal_revision_id: id,
      suggested_solution: newSlateContent,
      created_at: new Date().toISOString(),
    };

    const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    localStorage.setItem('suggestions', JSON.stringify([...suggestions, newSuggestion]));

    toast.success('Suggestion submitted successfully!');
    navigate(`/legal-revision/${id}`);
  };

  if (!legalRevision || !petition) {
    return <div>Loading...</div>;
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

        <div className="flex justify-end mt-8">
          <button onClick={handleSubmit} className="bg-primary text-secondary font-bold py-2 px-6 rounded-lg">Submit Suggestion</button>
        </div>
      </div>
    </main>
  );
};

export default SuggestEdit;
