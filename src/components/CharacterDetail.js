// src/CharacterDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoviesList from './MoviesList';

const CharacterDetail = () => {
  const { url } = useParams();
  const [character, setCharacter] = useState();

  const fetchCharacter = async (characterUrl) => {
    try {
      const decodedUrl = decodeURIComponent(characterUrl);
      console.log(decodedUrl);
      const response = await fetch(decodedUrl);
      const data = await response.json();
      console.log(data);
      setCharacter(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  useEffect(() => {
    // Decode the URL parameter and fetch character details
    fetchCharacter(url);

  }, []);

  return (

    <Container>
      <Row>
        <Col>

          <div>
            <h2>Character Details</h2>
            {character && (
              <div>
                <p>Character Name: {character.name}</p>
                <p>Height: {character.height}</p>
                <p>Gender: {character.gender}</p>
                <p>Eye Color: {character.eye_color}</p>
                <p>Birth Year: {character.birth_year}</p>
                <p>Skin Color: {character.skin_color}</p>
              </div>
            )}
          </div>

        </Col>

        <Col>
        <div>
            <h2>Movie Details</h2>
            {character && (
            <MoviesList moviesUrl={character.films}/>
            )}
          </div>
        </Col>
      </Row>

    </Container>



  );
};

export default CharacterDetail;
