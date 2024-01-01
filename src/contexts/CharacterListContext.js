import React, { createContext, useContext, useState } from 'react';

const CharacterListContext = createContext();

const CharacterListProvider = ({ children }) => {
    const [characterList, setCharacterList] = useState([]);
    
    const createCharacterList = (list) => {
        setCharacterList(list);
    }
  
    return (
        <CharacterListContext.Provider value={{ characterList, createCharacterList }}>
            {children}
        </CharacterListContext.Provider>
    );
};
const useCharacterList = () => {
    return useContext(CharacterListContext);
};

export { CharacterListProvider, useCharacterList };