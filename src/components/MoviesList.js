import React, { useState ,useEffect } from 'react';


export default function MoviesList({ moviesUrl }) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(moviesUrl.map(movieUrl => fetch(movieUrl)));
                const dataFromResponses = await Promise.all(responses.map(response => response.json()));
                setMovies(dataFromResponses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div>Movies</div>
            {movies && (
                <ul>
                    {movies.map((movie, i) => (
                        <li key={i}>{movie.title}</li>
                    ))}
                </ul>
            )}
           
        </>
    );
}
