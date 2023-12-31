import React from 'react';
import { useBookmark } from '../contexts/BookmarkContext';

export default function Favorites() {
    const { bookmarkedCharacters} = useBookmark();
  return (
    <>
    {bookmarkedCharacters && (
        <div><p>Favorites</p>
        <ul>
            {bookmarkedCharacters.map((fav, i) => (
                <li key={i}>{fav.name}</li>
            ))}
        </ul></div>
    )}
    </>
  )
}
