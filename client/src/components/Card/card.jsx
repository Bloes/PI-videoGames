import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGame } from "../../redux/actions/actions.js";

function Card({ games }) {
  const dispatch = useDispatch();
  const genres = games.genres || [];

  const genreNames = genres.map((genre) => genre.name || genre).join(", ");

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteGame(games.id || games.gameId));
  };

  return (
    <div className="card-container">
      {games.createdAt && <button onClick={handleDelete}>Delete</button>}
      <Link to={`/home/${games.id || games.gameId}`}>
        <h2>{games.name}</h2>
        <img
          src={games.image}
          alt={games.name}
        />
        {genreNames && <p>Genres: {genreNames}</p>}
        <p>Rating: {games.rating}</p>
      </Link>
    </div>
  );
}

export default Card;