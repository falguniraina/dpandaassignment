import React, { createContext, useContext, useState } from 'react';

const CharacterListContext = createContext();

const CharacterListProvider = ({ children }) => {
    const [characterList, setCharacterList] = useState([]);
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState();

    const createCharacterList = (list) => {
        setCharacterList(list);
    }
    const createIndex = (index) => {
        setSelectedCharacterIndex(index);
    };
    return (
        <CharacterListContext.Provider value={{ characterList, createCharacterList, createIndex, selectedCharacterIndex }}>
            {children}
        </CharacterListContext.Provider>
    );
};
const useCharacterList = () => {
    return useContext(CharacterListContext);
};

export { CharacterListProvider, useCharacterList };