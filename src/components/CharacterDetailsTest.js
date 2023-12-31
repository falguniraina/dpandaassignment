// src/CharacterDetail.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoviesList from './MoviesList';

const CharacterDetailTest = () => {

    const location = useLocation();
    const { myCharacter } = [];

    useEffect(() => {
        console.log(location);
        // Send request to your server to increment page view count
      }, [location]);


    return (

        <Container>
            <Row>
                <Col>

                    <div>
                        <h2>Character Details</h2>
                        {myCharacter && (
                            <div>
                                <p>Character Name: {myCharacter.name}</p>
                                <p>Height: {myCharacter.height}</p>
                                <p>Gender: {myCharacter.gender}</p>
                                <p>Eye Color: {myCharacter.eye_color}</p>
                                <p>Birth Year: {myCharacter.birth_year}</p>
                                <p>Skin Color: {myCharacter.skin_color}</p>
                            </div>
                        )}
                    </div>

                </Col>

                <Col>
                    <div>
                        <h2>Movie Details</h2>
                        {myCharacter && (
                            <MoviesList moviesUrl={myCharacter.films} />
                        )}
                    </div>
                </Col>
            </Row>

        </Container>



    );
};

export default CharacterDetailTest;
