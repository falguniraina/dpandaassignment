// src/CharacterDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoviesList from './MoviesList';
import { useCharacterList } from '../contexts/CharacterListContext';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(true);
  const { characterList, createCharacterList } = useCharacterList();

  const fetchCharacter = async (id) => {
    try {
      setLoading(true);
      const receivedIndex = id;
      const data = characterList[receivedIndex];
      setCharacter(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    fetchCharacter(id);

  }, []);

  return (

    <Container>
      <Row>
        <Col>
          {loading ? (
            <h2>Loading Character Details.....</h2>
          ) :
            (
              <>
                {character && (
                  <div>
                    <h2>{character.name}</h2>
                    <p>Height: {character.height}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Eye Color: {character.eye_color}</p>
                    <p>Birth Year: {character.birth_year}</p>
                    <p>Skin Color: {character.skin_color}</p>
                  </div>
                )}
              </>
            )}
        </Col>

        <Col>
          <div>
            {character && (
              <MoviesList moviesUrl={character.films} />
            )}
          </div>
        </Col>
      </Row>

    </Container>



  );
};

export default CharacterDetail;
