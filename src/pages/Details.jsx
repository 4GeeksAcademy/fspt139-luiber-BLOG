import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Details = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/${type}/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.error("Error al cargar detalles:", err));
  }, [type, id]);

  if (!details) return <div className="text-center mt-5">Cargando detalles...</div>;

  const imageUrl = details.image || "https://picsum.photos/800/600";

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={imageUrl}
            alt={details.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center text-center">
          <h1>{details.name}</h1>
          <p className="lead mt-3">
            Datos detallados de cada personaje, pero la API no muestra mas detalles. 
          </p>
        </div>
      </div>

      <hr className="text-danger my-4" />

      <div className="row text-danger text-center fw-bold">
        {type === "character" && (
          <>
            <div className="col">Name<p className="text-dark fw-normal mt-1">{details.name}</p></div>
            <div className="col">Status<p className="text-dark fw-normal mt-1">{details.status}</p></div>
            <div className="col">Species<p className="text-dark fw-normal mt-1">{details.species}</p></div>
            <div className="col">Gender<p className="text-dark fw-normal mt-1">{details.gender}</p></div>
            <div className="col">Origin<p className="text-dark fw-normal mt-1">{details.origin?.name}</p></div>
          </>
        )}
        {type === "location" && (
          <>
            <div className="col">Name<p className="text-dark fw-normal mt-1">{details.name}</p></div>
            <div className="col">Type<p className="text-dark fw-normal mt-1">{details.type}</p></div>
            <div className="col">Dimension<p className="text-dark fw-normal mt-1">{details.dimension}</p></div>
          </>
        )}
        {type === "episode" && (
          <>
            <div className="col">Name<p className="text-dark fw-normal mt-1">{details.name}</p></div>
            <div className="col">Air Date<p className="text-dark fw-normal mt-1">{details.air_date}</p></div>
            <div className="col">Episode<p className="text-dark fw-normal mt-1">{details.episode}</p></div>
          </>
        )}
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-primary">Volver al inicio</Link>
      </div>
    </div>
  );
};