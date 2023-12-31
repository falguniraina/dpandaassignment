import React, { useState } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import PaginationComponent from './PaginationComponent';
import { Link } from 'react-router-dom';


export default function People({ data, paginationData, currentPage, pageChangeCallback }) {

    function handleChangeInPeopleComponent(page) {
        pageChangeCallback(page);
    }


    return (
        <>
            <h1>People</h1>

            <Grid columns={2}>
                {data.map((people, i) => {
                    return (
                        <Grid.Column key={i}>
                            {/* <Link to={`/character/${encodeURIComponent(people.url)}`}> */}
                            <Link to={{ pathname: `/characterd`, state: { people } }}>

                                <Card>
                                    <Card.Content>
                                        <Card.Header>{people.name}</Card.Header>
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
                            </Link>
                        </Grid.Column>
                    )
                })}
            </Grid>

            <PaginationComponent totalPages={paginationData} currentPage={currentPage} onPageChange={handleChangeInPeopleComponent} />

        </>
    )
}
