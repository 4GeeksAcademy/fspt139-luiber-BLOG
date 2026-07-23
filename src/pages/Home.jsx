import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {


	const { store, dispatch } = useGlobalReducer()
	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: "set_characters",
					payload: data.results
				});
			})
			.catch((error) => console.error("Error en personajes:", error));

		fetch("https://rickandmortyapi.com/api/location")
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: "set_locations",
					payload: data.results
				});
			})
			.catch((error) => console.error("Error en ubicaciones:", error));

		fetch("https://rickandmortyapi.com/api/episode")
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: "set_episodes",
					payload: data.results
				});
			})
			.catch((error) => console.error("Error en episodios:", error));
	}, []);

	return (
		<div className="container mt-4">
			<h2 className="text-primary mb-3">Characters</h2>
			<div className="d-flex flex-row flex-nowrap overflow-auto mb-5 pb-2">
				{store.characters && store.characters.length > 0 ? (
					store.characters.map((character) => (
						<Card key={character.id} item={character} type="character" />
					))
				) : (
					<p>Cargando personajes...</p>
				)}
			</div>

			<h2 className="text-primary mb-3">Locations</h2>
			<div className="d-flex flex-row flex-nowrap overflow-auto mb-5 pb-2">
				{store.locations && store.locations.length > 0 ? (
					store.locations.map((location) => (
						<Card key={location.id} item={location} type="location" />
					))
				) : (
					<p>Cargando ubicaciones...</p>
				)}
			</div>

			<h2 className="text-primary mb-3">Episodes</h2>
			<div className="d-flex flex-row flex-nowrap overflow-auto mb-5 pb-2">
				{store.episodes && store.episodes.length > 0 ? (
					store.episodes.map((episode) => (
						<Card key={episode.id} item={episode} type="episode" />
					))
				) : (
					<p>Cargando episodios...</p>
				)}
			</div>
		</div>
	);
}; 