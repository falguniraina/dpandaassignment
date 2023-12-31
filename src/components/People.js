import React, { useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import PaginationComponent from './PaginationComponent';
import { Link } from 'react-router-dom';
import { useBookmark } from '../contexts/BookmarkContext';
import Bookmark from './Bookmark';


export default function People({ data, paginationData, currentPage, pageChangeCallback }) {

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

    return (
        <>
            <h1>People</h1>

            <Grid columns={2}>
                {data.map((people, i) => {
                    return (
                        <Grid.Column key={i}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <div className='title-container'>
                                            <div className='character-title'>
                                                <Link to={`/character/${encodeURIComponent(people.url)}`}>
                                                    {people.name}
                                                </Link>
                                            </div>
                                            <div className='character-favourite' onClick={() => handleBookmarkClick(people)}>
                                                <Bookmark characterData={people}/>
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
