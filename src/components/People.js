import React, { useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import PaginationComponent from './PaginationComponent';
import { Link } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext';
import BookmarkIcon from './BookmarkIcon';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCharacterList } from '../contexts/CharacterListContext';

export default function People({ data, paginationData, currentPage, pageChangeCallback }) {
    const { createCharacterList } = useCharacterList();
    const { bookmarkedCharacters, addBookmark, removeBookmark } = useBookmark();

    function handleChangeInPeopleComponent(page) {
        pageChangeCallback(page);
    }

    function handleBookmarkClick(people) {
        const isBookmarked = bookmarkedCharacters.some((bookmark) => bookmark.url === people.url);

        if (isBookmarked) {
            removeBookmark(people);
        } else {
            addBookmark(people);
        }
    }

    function sortCharacters(id) {
       let sortedList = [];
        switch (id) {
            case 1:
                sortedList = [...data].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 2:
                sortedList = [...data].sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 3:
                sortedList = [...data].sort((a, b) => a.height.localeCompare(b.height));
                break;
            default:
                sortedList = [...data].sort((a, b) => b.height.localeCompare(a.height));
                break;
        }
        createCharacterList(sortedList);
    }

    return (
        <>
            <div className='pagename'>
                <div>
                    <h1>People</h1>
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort By
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => sortCharacters(1)}>Name (A-Z)</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortCharacters(2)}>Name (Z-A)</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortCharacters(3)}>Height Asc</Dropdown.Item>
                            <Dropdown.Item onClick={() => sortCharacters(4)}>Height Desc</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Grid columns={2}>
                {data.map((people, i) => {
                    return (
                        <Grid.Column key={i}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <div className='title-container'>
                                            <div className='character-title'>
                                                <Link to={`/character/${i}`}>
                                                    {people.name}
                                                </Link>
                                            </div>
                                            <div className='character-favourite' onClick={() => handleBookmarkClick(people)}>
                                                <BookmarkIcon characterData={people} />
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <Card.Description>
                                        <strong>Height</strong>
                                        <p>{people.height}</p>
                                        <strong>Mass</strong>
                                        <p>{people.mass}</p>
                                        <strong>Hair Color</strong>
                                        <p>{people.hair_color}</p>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    )
                })}
            </Grid>

            <PaginationComponent totalPages={paginationData} currentPage={currentPage} onPageChange={handleChangeInPeopleComponent} />
        </>
    )
}
