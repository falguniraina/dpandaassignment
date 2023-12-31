import React, { useState ,useEffect } from 'react';


export default function MoviesList({ moviesUrl }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responses = await Promise.all(moviesUrl.map(movieUrl => fetch(movieUrl)));
                const dataFromResponses = await Promise.all(responses.map(response => response.json()));
                setMovies(dataFromResponses);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <>
        {loading ? (
            <h3>Loading Movie Details.....</h3>
          ) :
            (
                <>
                {movies && (
                    <div><p>Movies</p>
                    <ul>
                        {movies.map((movie, i) => (
                            <li key={i}>{movie.title}</li>
                        ))}
                    </ul></div>
                )}
                </>
            )}
           
        </>
    );
}
