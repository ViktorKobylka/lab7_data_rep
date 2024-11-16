import MovieItem from "./movieitem";

const Movies = (props)=>{
    return props.myMovies.map(
        (movie)=>{
            return <MovieItem mymovie={movie} key={movie._id} /> //pass each movie as property and set unique key
        }
    );
}

export default Movies;