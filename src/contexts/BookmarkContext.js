// BookmarkContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();


const BookmarkProvider = ({ children }) => {
    const [bookmarkedCharacters, setBookmarkedCharacters] = useState(
        () => JSON.parse(localStorage.getItem('bookmarkedCharacters')) || []
      );

  useEffect(() => {
    localStorage.setItem('bookmarkedCharacters', JSON.stringify(bookmarkedCharacters));
  }, [bookmarkedCharacters]);

  const addBookmark = (character) => {
    setBookmarkedCharacters((prevBookmarks) => [...prevBookmarks, character]);
  };

  const removeBookmark = (character) => {
    setBookmarkedCharacters((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.url !== character.url)
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedCharacters, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmark = () => {
  return useContext(BookmarkContext);
};

export { BookmarkProvider, useBookmark };
