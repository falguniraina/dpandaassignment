import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import People from "./components/People";
import PaginationComponent from './components/PaginationComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharacterDetail from './components/CharacterDetail';
import { BookmarkProvider } from './contexts/BookmarkContext';
import Favorites from './components/Favorites';
import { useCharacterList } from './contexts/CharacterListContext';
import { useCurrentUser } from './contexts/CurrentUserContext';
import Login from './components/Login';


function App() {
  const { characterList, createCharacterList } = useCharacterList();
  const { currentUser, addCurrentUser } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleLogin = (loggedInUser) => {
    addCurrentUser(loggedInUser);
  };

  function triggerPageChange(page) {
    fetchPeople(page);
  }

  function paginationData(jsonResults, pageNumber) {
    const totalCharacters = jsonResults.count;
    const resultsPerPage = 10;
    let totalPages = Math.floor(totalCharacters / resultsPerPage);
    if (totalCharacters % resultsPerPage !== 0) {
      totalPages += 1;
    }
    setTotalPages(totalPages);
  }

  const fetchPeople = async (pageNumber = 1) => {
    try {
      setCurrentPage(pageNumber);
      setLoading(true);
      const url = `https://swapi.dev/api/people/?page=${pageNumber}`;
      const response = await fetch(url);
      const data = await response.json();
      createCharacterList(data.results);
      if (pageNumber === 1) {
        paginationData(data, pageNumber);
      }
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (

            <BookmarkProvider>
              <Routes>
                <Route
                  path='/'
                  element={currentUser ? (
                    <People data={characterList} paginationData={totalPages} currentPage={currentPage} pageChangeCallback={triggerPageChange} />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )}
                />
                <Route path="/character/:id"
                  element={currentUser ? (
                    <CharacterDetail />
                  ) : (
                    <Navigate to="/" />
                  )}
                />
                <Route path="/favourites"
                  element={currentUser ? (
                    <Favorites />
                  ) : (
                    <Navigate to="/" />
                  )}
                />
              </Routes>
            </BookmarkProvider>

          )}
        </Container>
      </Router>
    </>
  );
}

export default App;
