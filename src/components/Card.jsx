import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  // Comprobar si este elemento ya está guardado en Favoritos
  const isFavorite = store.favorites.some((fav) => fav.id === item.id && fav.type === type);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "delete_favorite",
        payload: { id: item.id, type }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { ...item, type }
      });
    }
  };

  // La API de Rick and Morty nos da imagen para 'character', 
  // pero para 'location' y 'episode' podemos usar un placeholder
  const imageUrl = item.image || "https://picsum.photos/400/200";

  return (
    <div className="card my-2 mx-2" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{item.name}</h5>
        
        {/* Renderizado condicional según el tipo de datos */}
        <div className="card-text mb-3">
          {type === "character" && (
            <>
              <p className="mb-1"><strong>Status:</strong> {item.status}</p>
              <p className="mb-1"><strong>Species:</strong> {item.species}</p>
              <p className="mb-1"><strong>Gender:</strong> {item.gender}</p>
            </>
          )}
          {type === "location" && (
            <>
              <p className="mb-1"><strong>Type:</strong> {item.type}</p>
              <p className="mb-1"><strong>Dimension:</strong> {item.dimension}</p>
            </>
          )}
          {type === "episode" && (
            <>
              <p className="mb-1"><strong>Air Date:</strong> {item.air_date}</p>
              <p className="mb-1"><strong>Episode:</strong> {item.episode}</p>
            </>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <Link to={`/details/${type}/${item.id}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button 
            className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
            onClick={handleFavorite}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};