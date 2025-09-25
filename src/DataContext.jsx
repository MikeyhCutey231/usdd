import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialPosts, initialPetitions, initialLegalRevisions, initialSuggestions } from './dummyData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [petitions, setPetitions] = useState(initialPetitions);
  const [legalRevisions, setLegalRevisions] = useState(initialLegalRevisions);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const value = {
    posts,
    setPosts,
    petitions,
    setPetitions,
    legalRevisions,
    setLegalRevisions,
    suggestions,
    setSuggestions,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
