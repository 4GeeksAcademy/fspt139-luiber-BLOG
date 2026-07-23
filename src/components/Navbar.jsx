import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-black ">
			<div className="container">
				<p>
					<span className="fw-bold text-white">Rick and Morty</span>
				</p>

				<div className="ml-auto">
					<div className="dropdown">
						<button
							className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
							type="button"
							id="dropdownMenuButton"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Favorites <span className="badge bg-black">{store.favorites.length}</span>
						</button>

						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
							{store.favorites && store.favorites.length > 0 ? (
								store.favorites.map((fav, index) => (
									<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
										<Link to={`/details/${fav.type}/${fav.id}`} className="text-decoration-none text-dark me-3">
											{fav.name}
										</Link>
										<button
											className="btn btn-sm text-danger border-0 p-0"
											onClick={() => dispatch({ type: "delete_favorite", payload: fav })}
										>
											🗑️
										</button>
									</li>
								))
							) : (
								<li className="dropdown-item text-center text-muted">(empty)</li>
							)}
						</ul>
					</div>
				</div>
			</div>

		</nav>
	);
};